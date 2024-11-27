import { RequestDTO } from "../../shared/request.dto.js";

/**
 * Classe DTO pour la suppression d'une répétition.
 * @augments {RequestDTO}
 */
class DeleteRepetitionRequestDTO extends RequestDTO {
    constructor(data) {
        super(data);
        /**
         * L'identifiant de la répétition.
         * @type {string}
         */
        this.id;
    }

    /**
     * @override
     * @inheritdoc
     */
    _validate(data) {
        throw new Error("Fonction non implémentée");
    }
}

export { DeleteRepetitionRequestDTO };
