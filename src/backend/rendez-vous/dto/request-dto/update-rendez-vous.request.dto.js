import { RequestDTO } from "../../../shared/request.dto.js";
import { Validator } from "../../../utils/validator.js";
import { updateRendezVousRequestSchema } from "./update-rendez-vous.request.schema.js";

/**
 * @typedef {import("../../../repetition/index").UpdateRepetitionRequestDTO} UpdateRepetitionRequestDTO
 * @typedef {object} Data
 * @property {string} id L'identifiant du rendez-vous.
 * @property {string} idAgenda L'identifiant de l'agenda du rendez-vous.
 * @property {Date} debut La date de début du rendez-vous.
 * @property {Date} fin La date de fin du rendez-vous.
 * @property {string} titre Le titre du rendez-vous.
 * @property {string|undefined} description La description du rendez-vous.
 * @property {UpdateRepetitionRequestDTO|undefined} repetition La demande de mise à jour de répétition pour le rendez-vous.
 */

/**
 * Classe DTO pour la mise à jour d'un rendez-vous.
 * @augments {RequestDTO}
 */
class UpdateRendezVousRequestDTO extends RequestDTO {
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
        return Validator.validate(data, updateRendezVousRequestSchema, {
            allowUnknown: true,
            stripUnknown: true,
        });
    }
}

export { UpdateRendezVousRequestDTO };
