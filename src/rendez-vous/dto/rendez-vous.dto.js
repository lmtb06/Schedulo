import { DTO } from "../../shared/dto.js";

/**
 * @typedef {import("../../dtos/index").RepetitionDTO} RepetitionDTO
 */
class RendezVousDTO extends DTO {
    constructor({
        id,
        idCreateur,
        idAgenda,
        debut,
        fin,
        titre,
        description,
        dateCreation,
        dateModification,
        repetition,
    }) {
        super();
        /**
         * @type {string} L'identifiant du rendez-vous.
         * @public
         * @readonly
         */
        this.id = id;
        /**
         * @type {string} L'identifiant du créateur du rendez-vous.
         * @public
         * @readonly
         */
        this.idCreateur = idCreateur;
        /**
         * @type {string} L'identifiant de l'agenda du rendez-vous.
         * @public
         * @readonly
         */
        this.idAgenda = idAgenda;
        /**
         * @type {Date} La date de début du rendez-vous.
         * @public
         * @readonly
         */
        this.debut = debut;
        /**
         * @type {Date} La date de fin du rendez-vous.
         * @public
         * @readonly
         */
        this.fin = fin;
        /**
         * @type {string} Le titre du rendez-vous.
         * @public
         * @readonly
         */
        this.titre = titre;
        /**
         * @type {string} La description du rendez-vous.
         * @public
         * @readonly
         */
        this.description = description;
        /**
         * @type {Date} La date de création du rendez-vous.
         * @public
         * @readonly
         */
        this.dateCreation = dateCreation;
        /**
         * @type {Date} La date de modification du rendez-vous.
         * @public
         * @readonly
         */
        this.dateModification = dateModification;
        /**
         * @type {RepetitionDTO} La répétition du rendez-vous.
         */
        this.repetition = repetition;
    }

    toJSON() {
        return JSON.stringify({
            id: this.id,
            idCreateur: this.idCreateur,
            idAgenda: this.idAgenda,
            debut: this.debut,
            fin: this.fin,
            titre: this.titre,
            description: this.description,
            dateCreation: this.dateCreation,
            dateModification: this.dateModification,
            repetition: this.repetition ? this.repetition.toJSON() : null,
        });
    }

    validate() {}
}

export { RendezVousDTO };
