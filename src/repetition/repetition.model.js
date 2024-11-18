/**
 * @typedef {import('./enums').UniteRepetition} UniteRepetition
 */

/**
 * Classe métier représentant une répétition.
 */
class Repetition {
    /**
     * Crée une répétition.
     * @param {object} options Les options de répétition.
     * @param {number} options.id L'identifiant de la répétition.
     * @param {number} options.intervalle L'intervalle de répétition.
     * @param {UniteRepetition} options.unite L'unité de l'intervalle de répétition.
     * @param {Date} options.fin La date de fin de la répétition.
     */
    constructor({ id, intervalle, unite, fin }) {
        /**
         * L'identifiant de la répétition.
         * @type {string}
         */
        this.id = id;
        /**
         * L'intervalle de répétition.
         * @type {number}
         */
        this.intervalle = intervalle;
        /**
         * L'unité de l'intervalle de répétition.
         *	@type {UniteRepetition}
         */
        this.unite = unite;
        /**
         * La date de fin de la répétition.
         * @type {Date}
         */
        this.fin = fin;
    }
}

export { Repetition };
