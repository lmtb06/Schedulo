import { DTO } from "../../shared/dto.js";
import { InterfaceValidator } from "../../utils/interface.js";
import { Validator } from "../../utils/validator.js";
import { createRendezVousSchema } from "../joi/create-rendez-vous.schema.js";

/**
 * @typedef {import('../../server.js').CreateRepetitionDTO} CreateRepetitionDTO
 */
/**
 * Classe DTO représentant la création d'un rendez-vous.
 * @implements {DTO}
 */
class CreateRendezVousDTO {
    constructor({
        idCreateur,
        idAgenda,
        debut,
        fin,
        titre,
        description,
        repetition,
    }) {
        InterfaceValidator.ensureImplementsInterface(CreateRendezVousDTO, DTO);
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
         * @type {CreateRepetitionDTO} La répétition du rendez-vous.
         */
        this.repetition = repetition;
    }

    /**
     * @override
     * @inheritdoc
     */
    toJSON() {
        return JSON.stringify({
            idCreateur: this.idCreateur,
            idAgenda: this.idAgenda,
            debut: this.debut,
            fin: this.fin,
            titre: this.titre,
            description: this.description,
            repetition: this.repetition ? this.repetition.toJSON() : null,
        });
    }

    /**
     * @override
     * @inheritdoc
     */
    validate() {
        Validator.validate(this, createRendezVousSchema);
    }
}

export { CreateRendezVousDTO };
