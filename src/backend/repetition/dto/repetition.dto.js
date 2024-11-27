import { ResponseDTO } from "../../shared/response.dto.js";
import { InterfaceValidator } from "../../utils/interface.js";

/**
 * Classe DTO de réponse d'une répétition.
 * @implements {ResponseDTO}
 */
class RepetitionDTO {
    constructor({ id, intervalle, unite, fin }) {
        InterfaceValidator.ensureImplementsInterface(
            RepetitionDTO,
            ResponseDTO
        );
        this.id = id;
        this.intervalle = intervalle;
        this.unite = unite;
        this.fin = fin;
    }

    toJSON() {
        return JSON.stringify({
            id: this.id,
            intervalle: this.intervalle,
            unite: this.unite,
            fin: this.fin,
        });
    }
}

export { RepetitionDTO };
