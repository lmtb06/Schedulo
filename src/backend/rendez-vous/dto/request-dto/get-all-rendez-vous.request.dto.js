import { RequestDTO } from "../../../shared/request.dto.js";
import { Validator } from "../../../utils/validator.js";
import { getAllRendezVousRequestSchema } from "./get-all-rendez-vous.request.schema.js";

/**
 * @typedef {object} Data
 * @property {Date} debut La date de début de la période dans laquelle chercher les rendez-vous.
 * @property {Date} fin La date de fin de la période dans laquelle chercher les rendez-vous.
 * @property {string} idCreateur L'identifiant du créateur des rendez-vous.
 * @property {string} idAgenda L'identifiant de l'agenda des rendez-vous.
 */

/**
 * Classe DTO pour la récupération d'un ensemble de rendez-vous satisfaisant des critères.
 * @augments {RequestDTO}
 */
class GetAllRendezVousRequestDTO extends RequestDTO {
    /**
     * @inheritdoc
     */
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
        return Validator.validate(data, getAllRendezVousRequestSchema, {
            allowUnknown: true,
            stripUnknown: true,
        });
    }
}

export { GetAllRendezVousRequestDTO };
