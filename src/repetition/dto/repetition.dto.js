import { DTO } from "../../shared/dto.js";

/**
 * Classe DTO représentant une répétition.
 * @implements {DTO}
 */
class RepetitionDTO extends DTO {
    constructor({ id, intervalle, unite, fin }) {
        super();
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

    validate() {}
}

export { RepetitionDTO };
