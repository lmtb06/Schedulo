import { InterfaceValidator } from "../../utils/interface.js";
import { RendezVousDAO } from "../rendez-vous.dao.js";
import { RendezVous } from "../rendez-vous.model.js";

/**
 * @typedef {import('mongoose').Model} MongooseModel
 * @typedef {import('../rendez-vous.model.js').RendezVous} RendezVous
 */

/**
 * DAO pour les rendez-vous avec Mongoose
 * @implements {RendezVousDAO}
 */
class RendezVousMongooseDAO {
    /**
     * Modèle mongoose des rendez-vous.
     * @type {MongooseModel}
     * @private
     */
    #RendezVousModel;
    /**
     * Crée une instance de RendezVousMongooseDAO.
     * @param {MongooseModel} RendezVousModel - Le modèle mongoose des rendez-vous
     */
    constructor(RendezVousModel) {
        InterfaceValidator.ensureImplementsInterface(
            RendezVousMongooseDAO,
            RendezVousDAO
        );
        this.#RendezVousModel = RendezVousModel;
    }

    /**
     * @inheritdoc
     */
    async get(id) {
        return this.#RendezVousModel.findById(id).then((rdv) => {
            if (!rdv) {
                return null;
            } else {
                return this.#getRendezVousFromModel(rdv);
            }
        });
    }

    /**
     * @inheritdoc
     */
    async getAll(filters) {
        const query = this.#RendezVousModel.find();

        if (filters.debut) {
            query.gte("debut", filters.debut);
            query.gte("fin", filters.debut);
        }

        if (filters.fin) {
            query.lte("debut", filters.fin);
            query.lte("fin", filters.fin);
        }

        if (filters.idAgenda) {
            query.where("idAgenda").equals(filters.idAgenda);
        }

        if (filters.idCreateur) {
            query.where("idCreateur").equals(filters.idCreateur);
        }

        return query.then((listeRendezVous) => {
            return listeRendezVous.map((rdv) => {
                return this.#getRendezVousFromModel(rdv);
            });
        });
    }

    /**
     * @inheritdoc
     */
    async create(rendezVous) {
        const donneesRendezVous = {
            ...rendezVous,
        };

        delete donneesRendezVous.id;
        delete donneesRendezVous.dateCreation;
        delete donneesRendezVous.dateModification;

        return this.#RendezVousModel.create(donneesRendezVous).then((rdv) => {
            return this.#getRendezVousFromModel(rdv);
        });
    }
    /**
     * @inheritdoc
     */
    async update(id, rendezVous) {
        return this.#RendezVousModel
            .findByIdAndUpdate(id, rendezVous, { new: true })
            .then((rdv) => {
                if (!rdv) {
                    return null;
                } else {
                    return this.#getRendezVousFromModel(rdv);
                }
            });
    }
    /**
     * @inheritdoc
     */
    async delete(id) {
        return this.#RendezVousModel.findByIdAndDelete(id).then((rdv) => {
            if (!rdv) {
                return null;
            } else {
                return this.#getRendezVousFromModel(rdv);
            }
        });
    }

    /**
     * Rafraîchit un rendez-vous à partir de son modèle mongoose.
     * @param {RendezVous} rendezVous - Le rendez-vous à rafraîchir
     * @param {MongooseModel} rdvModel - Le modèle mongoose
     * @private
     */
    #refreshRendezVousFromModel(rendezVous, rdvModel) {
        rendezVous.id = rdvModel._id;
        rendezVous.idCreateur = rdvModel.idCreateur;
        rendezVous.idAgenda = rdvModel.idAgenda;
        rendezVous.debut = rdvModel.debut;
        rendezVous.fin = rdvModel.fin;
        rendezVous.titre = rdvModel.titre;
        rendezVous.description = rdvModel.description;
        rendezVous.idRepetition = rdvModel.idRepetition;
        rendezVous.dateCreation = rdvModel.createdAt;
        rendezVous.dateModification = rdvModel.updatedAt;
    }

    /**
     * Get rendez-vous à partir du modèle mongoose.
     * @param {MongooseModel} rdvModel - Le modèle mongoose
     * @private
     */
    #getRendezVousFromModel(rdvModel) {
        return new RendezVous({
            id: rdvModel._id,
            idCreateur: rdvModel.idCreateur,
            idAgenda: rdvModel.idAgenda,
            debut: rdvModel.debut,
            fin: rdvModel.fin,
            titre: rdvModel.titre,
            description: rdvModel.description,
            idRepetition: rdvModel.idRepetition,
            dateCreation: rdvModel.createdAt,
            dateModification: rdvModel.updatedAt,
        });
    }
}

export { RendezVousMongooseDAO };
