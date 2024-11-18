import { DTO } from "../../shared/dto.js";
import { InterfaceValidator } from "../../utils/interface.js";

/**
 * Classe DTO représentant la récupération d'un rendez-vous.
 * @implements {DTO}
 */
class GetRendezVousDTO {
    constructor({ id }) {
        InterfaceValidator.ensureImplementsInterface(GetRendezVousDTO, DTO);
        /**
         * L'identifiant du rendez-vous.
         * @type {string}
         * @public
         * @readonly
         */
        this.id = id;
    }

    /**
     * @override
     * @inheritdoc
     */
    toJSON() {
        return JSON.stringify({
            id: this.id,
        });
    }

    /**
     * @override
     * @inheritdoc
     */
    validate() {
        throw new Error("Fonction non implémentée");
    }
}

export { GetRendezVousDTO };
