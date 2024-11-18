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
            throw new Error("Rendez-vous introuvable");
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
    async getAll(params) {
        const listeRendezVous = this.#RendezVousModel.find(params);
        return listeRendezVous.map((rdv) => {
            return new RendezVous({
                id: rdv._id,
                idCreateur: rdv.idCreateur,
                idAgenda: rdv.idAgenda,
                debut: rdv.debut,
                fin: rdv.fin,
                titre: rdv.titre,
                description: rdv.description,
                idRepetition: rdv.idRepetition,
                dateCreation: rdv.createdAt,
                dateModification: rdv.updatedAt,
            });
        });
    }

    /**
     * @inheritdoc
     */
    async save(rendezVous) {
        const donneesRendezVous = {
            idCreateur: rendezVous.idCreateur,
            idAgenda: rendezVous.idAgenda,
            debut: rendezVous.debut,
            fin: rendezVous.fin,
            titre: rendezVous.titre,
            description: rendezVous.description,
            idRepetition: rendezVous.idRepetition,
        };

        const rdvModel = new this.#RendezVousModel(donneesRendezVous);
        await rdvModel.save();
        rendezVous.id = rdvModel._id;
        rendezVous.dateCreation = rdvModel.createdAt;
        rendezVous.dateModification = rdvModel.updatedAt;
    }
    /**
     * @inheritdoc
     */
    async update(rendezVous, params) {
        const donneesRendezVous = {
            idCreateur: rendezVous.idCreateur,
            idAgenda: rendezVous.idAgenda,
            debut: rendezVous.debut,
            fin: rendezVous.fin,
            titre: rendezVous.titre,
            description: rendezVous.description,
            idRepetition: rendezVous.idRepetition,
        };

        const rdvModel = await this.#RendezVousModel.findByIdAndUpdate(
            rendezVous.id,
            donneesRendezVous,
            params.get("options")
        );

        if (!rdvModel) {
            throw new Error("Rendez-vous introuvable");
        }

        rendezVous.dateModification = rdvModel.updatedAt;
    }
    /**
     * @inheritdoc
     */
    async delete(rendezVous) {
        const rdvModel = await this.#RendezVousModel.findByIdAndDelete(
            rendezVous.id
        );
        if (!rdvModel) {
            throw new Error("Rendez-vous introuvable");
        }
    }
}

export { RendezVousMongooseDAO };
