import { DTO } from "../../shared/dto.js";
import { InterfaceValidator } from "../../utils/interface.js";

/**
 * Classe DTO représentant la suppression d'une répétition.
 * @implements {DTO}
 */
class DeleteRepetitionDTO {
    constructor({ id }) {
        InterfaceValidator.ensureImplementsInterface(DeleteRepetitionDTO, DTO);
        /**
         * L'identifiant de la répétition.
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

export { DeleteRepetitionDTO };
