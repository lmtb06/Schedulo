import { RequestDTO } from "../../../shared/request.dto.js";
import { Validator } from "../../../utils/validator.js";
import { createRendezVousRequestSchema } from "./create-rendez-vous.request.schema.js";

/**
 * @typedef {import('../../../repetition/index').CreateRepetitionRequestDTO} CreateRepetitionRequestDTO
 * @typedef {object} Data
 * @property {string} idCreateur L'identifiant du créateur du rendez-vous.
 * @property {string} idAgenda L'identifiant de l'agenda du rendez-vous.
 * @property {Date} debut La date de début du rendez-vous.
 * @property {Date} fin La date de fin du rendez-vous.
 * @property {string} titre Le titre du rendez-vous.
 * @property {string|undefined} description La description du rendez-vous.
 * @property {CreateRepetitionRequestDTO|undefined} repetition La demande de création de répétition pour le rendez-vous.
 */

/**
 * Classe DTO pour la création d'un rendez-vous.
 * @implements {RequestDTO}
 */
class CreateRendezVousRequestDTO extends RequestDTO {
    constructor(data) {
        super(data);

        /**
         * @type {Data|undefined}
         */
        this.data;
    }

    /**
     * @override
     * @inheritdoc
     */
    _validate(data) {
        return Validator.validate(data, createRendezVousRequestSchema, {
            allowUnknown: true,
            stripUnknown: true,
        });
    }
}

export { CreateRendezVousRequestDTO };
