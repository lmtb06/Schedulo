/**
 * Classe métier représentant un agenda.
 */
class Agenda {
    /**
     * Crée un agenda.
     * @param {object} options Les options de l'agenda.
     * @param {string} options.id L'identifiant de l'agenda.
     * @param {number} options.idCreateur L'identifiant du créateur de l'agenda.
     * @param {string} options.titre Le titre de l'agenda.
     * @param {string} options.description La description de l'agenda.
     * @param {string} options.couleur La couleur de l'agenda.
     * @param {Date} options.dateCreation La date de création de l'agenda.
     * @param {Date} options.dateModification La date de modification de l'agenda.
     * @param {Date} options.dateSuppression La date de suppression de l'agenda.
     * @param {enum} options.statut Le statut de l'agenda.
     */
    constructor({
        id = undefined,
        idCreateur,
        titre,
        description,
        couleur,
        dateCreation = undefined,
        dateModification = undefined,
        dateSuppression = undefined,
        statut = undefined,
    }) {
        /**
         * L'identifiant de l'agenda.
         * @type {string}
         */
        if (id) this.id = id;
        /**
         * L'identifiant du créateur de l'agenda.
         * @type {number}
         */
        this.idCreateur = idCreateur;
        /**
         * Le titre de l'agenda.
         * @type {string}
         */
        this.titre = titre;
        /**
         * La description de l'agenda.
         * @type {string}
         */
        this.description = description;
        /**
         * La couleur de l'agenda.
         * @type {string}
         */
        this.couleur = couleur;
        /**
         * La date de création de l'agenda.
         * @type {Date}
         */
        this.dateCreation = dateCreation;
        /**
         * La date de modification de l'agenda.
         * @type {Date}
         */
        this.dateModification = dateModification;
        /**
         * La date de suppression de l'agenda.
         * @type {Date}
         */
        this.dateSuppression = dateSuppression;
        /**
         * Le statut de l'agenda.
         * @type {enum}
         */
        this.statut = statut;
    }
}

export { Agenda };
