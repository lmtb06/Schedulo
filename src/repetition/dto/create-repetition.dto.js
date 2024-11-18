import { DTO } from "../../shared/dto.js";
import { InterfaceValidator } from "../../utils/interface.js";

/**
 * Classe DTO représentant la création d'une répétition.
 * @implements {DTO}
 */
class CreateRepetitionDTO {
    constructor({ intervalle, unite, fin }) {
        InterfaceValidator.ensureImplementsInterface(CreateRepetitionDTO, DTO);
        this.intervalle = intervalle;
        this.unite = unite;
        this.fin = fin;
    }

    /**
     * @override
     * @inheritdoc
     */
    toJSON() {
        return JSON.stringify({
            intervalle: this.intervalle,
            unite: this.unite,
            fin: this.fin,
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

export { CreateRepetitionDTO };
