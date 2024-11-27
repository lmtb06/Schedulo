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

    // async create(rendezVous) {
    // 	const donneesRendezVous = removeValues(
    // 		removeProperties(rendezVous, ['id', 'dateCreation', 'dateModification']),
    // 		[undefined, null]
    // 	);

    // 	const rdvModel = new this.#RendezVousModel(donneesRendezVous);
    // 	await rdvModel.save();
    // 	return this.transformerEnRendezVous(rdvModel);
    // }

    // async findById({ id }) {
    // 	const rdvModel = await this.#RendezVousModel.findById(id);
    // 	return this.transformerEnRendezVous(rdvModel);
    // }

    // async update({ id, ...resteDesDonnees }) {
    // 	const donneesRendezVous = removeValues(
    // 		removeProperties(resteDesDonnees, ['dateCreation', 'dateModification']),
    // 		[undefined, null]
    // 	);
    // 	const rdvModel = await this.#RendezVousModel.findByIdAndUpdate(id, donneesRendezVous, {
    // 		new: false,
    // 	});
    // 	return this.transformerEnRendezVous(rdvModel);
    // }

    // async delete({ id }) {
    // 	await this.#RendezVousModel.findByIdAndDelete(id);
    // }

    // /**
    //  * Transforme un modèle mongoose en instance de RendezVous.
    //  * @private
    //  * @param {RendezVousMongooseModel} rendezVousModel Le modèle mongoose
    //  * @returns {RendezVous} L'instance de RendezVous
    //  */
    // transformerEnRendezVous(rendezVousModel) {
    // 	return new RendezVous({
    // 		id: rendezVousModel._id,
    // 		idCreateur: rendezVousModel.idCreateur,
    // 		idAgenda: rendezVousModel.idAgenda,
    // 		debut: rendezVousModel.debut,
    // 		fin: rendezVousModel.fin,
    // 		titre: rendezVousModel.titre,
    // 		description: rendezVousModel.description,
    // 		idRepetition: rendezVousModel.idRepetition,
    // 		dateCreation: rendezVousModel.createdAt,
    // 		dateModification: rendezVousModel.updatedAt,
    // 	});
    // }

    /**
     * @inheritdoc
     */
    async get(id) {
        const rendezVous = await this.#RendezVousModel.findById(id);
        if (!rendezVous) {
            return;
        }
        return new RendezVous({
            id: rendezVous._id,
            idCreateur: rendezVous.idCreateur,
            idAgenda: rendezVous.idAgenda,
            debut: rendezVous.debut,
            fin: rendezVous.fin,
            titre: rendezVous.titre,
            description: rendezVous.description,
            idRepetition: rendezVous.idRepetition,
            dateCreation: rendezVous.createdAt,
            dateModification: rendezVous.updatedAt,
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

        const listeRendezVous = await query;

        if (!listeRendezVous) {
            throw new Error("Erreur lors de la récupération des rendez-vous");
        }

        return listeRendezVous.map((rdv) => {
            return this.#getRendezVousFromModel(rdv);
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

        const rdvModel = await this.#RendezVousModel.create(donneesRendezVous);

        return this.#getRendezVousFromModel(rdvModel);
    }
    /**
     * @inheritdoc
     */
    async update(id, rendezVous) {
        console.log("TODO Update :", id, rendezVous);
        const rdvModel = await this.#RendezVousModel.findByIdAndUpdate(
            id,
            rendezVous
        );

        if (!rdvModel) {
            return;
        }

        return this.#getRendezVousFromModel(rdvModel);
    }
    /**
     * @inheritdoc
     */
    async delete(id) {
        // TODO
        const rdvModel = await this.#RendezVousModel.findByIdAndDelete(id);

        if (!rdvModel) {
            return;
        }

        return this.#getRendezVousFromModel(rdvModel);
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
