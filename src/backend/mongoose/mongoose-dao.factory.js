import mongoose from "mongoose";
import {
    DAOFactoryError,
    DAOFactoryStopError,
} from "../errors/daos-factory/index.js";
import { RendezVousMongooseDAO } from "../rendez-vous/mongoose/rendez-vous-mongoose.dao.js";
import { getModel as getModelRendezVous } from "../rendez-vous/mongoose/rendez-vous.schema.js";
import { getModel as getModelAgenda } from "../agenda/mongoose/agenda.schema.js";
import { RepetitionMongooseDAO } from "../repetition/mongoose/repetition-mongoose.dao.js";
import { getModel as getModelRepetition } from "../repetition/mongoose/repetition.schema.js";
import { DAOFactory } from "../shared/dao.factory.js";
import { InterfaceValidator } from "../utils/interface.js";
import { AgendaMongooseDAO } from "../agenda/mongoose/agenda-mongoose.dao.js";

/**
 * @typedef {import("../rendez-vous/index.js").RendezVousDAO} RendezVousDAO
 * @typedef {import("../repetition/index.js").RepetitionDAO} RepetitionDAO
 * @typedef {import("./mongoose.config.js").MongooseConfig} MongooseConfig
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
     * @param {MongooseConfig} config - La configuration Mongoose.
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

        this.#connectionMongoose = await mongoose
            .createConnection(this.#config.uri, this.#config.options)
            .asPromise();

        if (!this.#connectionMongoose) {
            throw new DAOFactoryError(
                "Impossible de se connecter à la base de données."
            );
        }

        this.#initializeConnectionListeners(this.#eventCallbacks);
        // Création des modèles
        const schemas = new Map([
            ["RendezVous", getModelRendezVous],
            ["Agenda", getModelAgenda],
            ["Repetition", getModelRepetition],
        ]);
        schemas.forEach((getModel, modelName) => {
            this.#models.set(modelName, getModel(this.#connectionMongoose));
        });
    }

    /**
     * @inheritdoc
     * @throws {DAOFactoryError} Si MongoDB n'est pas connecté.
     */
    getRendezVousDAO() {
        this.#ensureConnected();
        const RendezVousMongooseModel = this.#models.get("RendezVous");
        return new RendezVousMongooseDAO(RendezVousMongooseModel);
    }

    /**
     * @inheritdoc
     * @throws {DAOFactoryError} Si MongoDB n'est pas connecté.
     */
    getRepetitionDAO() {
        this.#ensureConnected();
        const RepetitionMongooseModel = this.#models.get("Repetition");
        return new RepetitionMongooseDAO(RepetitionMongooseModel);
    }

    /**
     * @inheritdoc
     * @throws {DAOFactoryError} Si MongoDB n'est pas connecté.
     */
    getCompteDAO() {
        throw new DAOFactoryError("DAO non implémenté.");
    }

    /**
     * @inheritdoc
     * @throws {DAOFactoryError} Si MongoDB n'est pas connecté.
     */
    getAgendaDAO() {
        this.#ensureConnected();
        const AgendaMongooseModel = this.#models.get("Agenda");
        return new AgendaMongooseDAO(AgendaMongooseModel);
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
            throw new DAOFactoryStopError(
                "Impossible d'arrêter la factory MongooseDAOFactory.",
                {
                    cause: error,
                }
            );
        }
    }

    /**
     * Vérifie si MongoDB est connecté.
     * @throws {DAOFactoryError} Si MongoDB n'est pas connecté.
     */
    #ensureConnected() {
        if (
            !this.#connectionMongoose ||
            this.#connectionMongoose.readyState !== 1
        ) {
            throw new DAOFactoryError(
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
