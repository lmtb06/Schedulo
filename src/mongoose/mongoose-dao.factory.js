import mongoose from "mongoose";
import {
    DAOFactoryException,
    DAOFactoryStartException,
    DAOFactoryStopException,
} from "../exceptions/daos-factory/index.js";
import { RendezVousMongooseDAO } from "../rendez-vous/mongoose/rendez-vous-mongoose.dao.js";
import { getModel as getModelRendezVous } from "../rendez-vous/mongoose/rendez-vous.schema.js";
import { RepetitionMongooseDAO } from "../repetition/mongoose/repetition-mongoose.dao.js";
import { getModel as getModelRepetition } from "../repetition/mongoose/repetition.schema.js";
import { DAOFactory } from "../shared/dao.factory.js";
import { InterfaceValidator } from "../utils/interface.js";

/**
 * @typedef {import("../logger.js").Logger} Logger
 * @typedef {import("../rendez-vous/index.js").RendezVousDAO} RendezVousDAO
 * @typedef {import("../repetition/index.js").RepetitionDAO} RepetitionDAO
 * @typedef {import("../mongoose/mongoose.config.js").MongooseConfig} MongooseConfig
 */

/**
 * Factory pour gérer les DAOs Mongoose.
 * @class
 * @implements {DAOFactory}
 */
class MongooseDAOFactory {
    /**
     * @type {MongooseConfig} La configuration MongoDB.
     * @private
     */
    #config;
    /**
     * @type {Map<string, object>} Les instances des DAOs.
     * @private
     */
    #daos;
    /**
     * @type {Map<string, Function>} Les callbacks pour les événements de connexion.
     * @private
     */
    #eventCallbacks;
    /**
     * @type {Map<string, mongoose.Model>} Les modèles Mongoose.
     * @private
     */
    #models;
    /**
     * @type {mongoose.Connection} La connexion Mongoose.
     * @private
     */
    #connectionMongoose;
    /**
     * Crée une instance de MongooseDAOFactory.
     * @param {MongooseConfig} config - La configuration MongoDB.
     * @param {Map<string, EventCallback>} eventCallbacks - Les callbacks pour les événements de connexion.
     */
    constructor(config, eventCallbacks = new Map()) {
        InterfaceValidator.ensureImplementsInterface(
            MongooseDAOFactory,
            DAOFactory
        );
        this.#config = config;
        this.#daos = new Map();
        this.#eventCallbacks = eventCallbacks;
        this.#models = new Map();
        this.#connectionMongoose = null;
    }

    /**
     * Initialise les écouteurs d'événements de connexion Mongoose.
     * @param {Map<string, EventCallback>} eventCallbacks - Les callbacks pour les événements de connexion.
     * @private
     * @returns {void}
     */
    #initializeConnectionListeners(eventCallbacks) {
        this.#ensureConnected();
        eventCallbacks.forEach((callback, event) => {
            this.#connectionMongoose.on(event, callback);
        });
    }

    /**
     * @inheritdoc
     */
    async start() {
        if (this.#connectionMongoose) {
            return;
        }
        try {
            this.#connectionMongoose = await mongoose.createConnection(
                this.#config.getURI(),
                this.#config.options
            );

            this.#initializeConnectionListeners(this.#eventCallbacks);
            // Création des modèles
            const schemas = new Map([
                ["RendezVous", getModelRendezVous],
                ["Repetition", getModelRepetition],
            ]);
            schemas.forEach((getModel, modelName) => {
                this.#models.set(modelName, getModel(this.#connectionMongoose));
            });
        } catch (error) {
            throw new DAOFactoryStartException(
                "Impossible de démarrer la factory MongooseDAOFactory.",
                {
                    cause: error,
                }
            );
        }
    }

    /**
     * @inheritdoc
     * @throws {DAOFactoryException} Si MongoDB n'est pas connecté.
     */
    getRendezVousDAO() {
        this.#ensureConnected();
        const RendezVousMongooseModel = this.#models.get("RendezVous");
        return new RendezVousMongooseDAO(RendezVousMongooseModel);
    }

    /**
     * @inheritdoc
     * @throws {DAOFactoryException} Si MongoDB n'est pas connecté.
     */
    getRepetitionDAO() {
        this.#ensureConnected();
        const RepetitionMongooseModel = this.#models.get("Repetition");
        return new RepetitionMongooseDAO(RepetitionMongooseModel);
    }

    /**
     * @inheritdoc
     * @throws {DAOFactoryException} Si MongoDB n'est pas connecté.
     */
    getCompteDAO() {
        throw new DAOFactoryException("DAO non implémenté.");
    }

    /**
     * @inheritdoc
     * @throws {DAOFactoryException} Si MongoDB n'est pas connecté.
     */
    getAgendaDAO() {
        throw new DAOFactoryException("DAO non implémenté.");
    }

    /**
     * @inheritdoc
     */
    async stop() {
        try {
            await this.#connectionMongoose.close();
            this.#connectionMongoose = null;
            this.#cleanupDAOs();
        } catch (error) {
            throw new DAOFactoryStopException(
                "Impossible d'arrêter la factory MongooseDAOFactory.",
                {
                    cause: error,
                }
            );
        }
    }

    /**
     * Vérifie si MongoDB est connecté.
     * @throws {DAOFactoryException} Si MongoDB n'est pas connecté.
     */
    #ensureConnected() {
        if (!this.#connectionMongoose) {
            throw new DAOFactoryException(
                "MongoDB n'est pas connecté. Appelez start() avant d'utiliser les DAOs."
            );
        }
    }

    /**
     * Nettoie les instances des DAOs.
     */
    #cleanupDAOs() {
        if (this.#daos.size > 0) {
            this.#daos.clear();
        }
    }
}

export { MongooseDAOFactory };
