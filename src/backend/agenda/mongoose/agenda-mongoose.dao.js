import { InterfaceValidator } from "../../utils/interface.js";
import { AgendaDAO } from "../agenda.dao.js";
import { Agenda } from "../agenda.model.js";

/**
 * @typedef {import('mongoose').Model} MongooseModel
 * @typedef {import('../agenda.model.js').Agenda} Agenda
 */

/**
 * DAO pour les agenda avec Mongoose
 * @implements {AgendaDAO}
 */
class AgendaMongooseDAO {
    /**
     * Modèle mongoose des agenda.
     * @type {MongooseModel}
     * @private
     */
    #AgendaModel;
    /**
     * Crée une instance de AgendaMongooseDAO.
     * @param {MongooseModel} AgendaModel - Le modèle mongoose des agenda
     */
    constructor(AgendaModel) {
        InterfaceValidator.ensureImplementsInterface(
            AgendaMongooseDAO,
            AgendaDAO
        );
        this.#AgendaModel = AgendaModel;
    }

    /**
     * @inheritdoc
     */
    async get(id) {
        return this.#AgendaModel.findById(id).then((agenda) => {
            if (!agenda) {
                return null;
            } else {
                return this.#getAgendaFromModel(agenda);
            }
        });
    }

    /**
     * @inheritdoc
     */
    async getAll(filters) {
        const query = this.#AgendaModel.find();

        if (filters.idCreateur) {
            query.where("idCreateur").equals(filters.idCreateur);
        }

        return query.then((listeAgenda) => {
            return listeAgenda.map((agenda) => {
                return this.#getAgendaFromModel(agenda);
            });
        });
    }

    /**
     * @inheritdoc
     */
    async create(agenda) {
        const donneesAgenda = {
            ...agenda,
        };

        delete donneesAgenda.id;
        delete donneesAgenda.dateCreation;
        delete donneesAgenda.dateModification;
        delete donneesAgenda.dateSuppression;
        delete donneesAgenda.statut;

        return this.#AgendaModel.create(donneesAgenda).then((agenda) => {
            return this.#getAgendaFromModel(agenda);
        });
    }
    /**
     * @inheritdoc
     */
    async update(id, agenda) {
        return this.#AgendaModel
            .findByIdAndUpdate(id, agenda, { new: true })
            .then((agenda) => {
                if (!agenda) {
                    return null;
                } else {
                    return this.#getAgendaFromModel(agenda);
                }
            });
    }
    /**
     * @inheritdoc
     */
    async delete(id) {
        return this.#AgendaModel.findByIdAndDelete(id).then((agenda) => {
            if (!agenda) {
                return null;
            } else {
                return this.#getAgendaFromModel(agenda);
            }
        });
    }

    /**
     * Get agenda à partir du modèle mongoose.
     * @param {MongooseModel} agenda - Le modèle mongoose
     * @private
     */
    #getAgendaFromModel(agenda) {
        return new Agenda({
            id: agenda._id,
            idCreateur: agenda.idCreateur,
            titre: agenda.titre,
            description: agenda.description,
            couleur: agenda.couleur,
            dateCreation: agenda.createdAt,
            dateModification: agenda.updatedAt,
            dateSuppression: agenda.deletedAt,
            statut: agenda.statut,
        });
    }
}

export { AgendaMongooseDAO };
