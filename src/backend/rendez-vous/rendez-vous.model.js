/**
 * Classe métier représentant un rendez-vous.
 */
class RendezVous {
    /**
     * Crée un rendez-vous.
     * @param {object} options Les options du rendez-vous.
     * @param {string} options.id L'identifiant du rendez-vous.
     * @param {number} options.idCreateur L'identifiant du créateur du rendez-vous.
     * @param {number} options.idAgenda L'identifiant de l'agenda du rendez-vous.
     * @param {Date} options.debut La date de début du rendez-vous.
     * @param {Date} options.fin La date de fin du rendez-vous.
     * @param {string} options.titre Le titre du rendez-vous.
     * @param {string} options.description La description du rendez-vous.
     * @param {number} [options.idRepetition] L'identifiant de la répétition du rendez-vous.
     * @param {Date} options.dateCreation La date de création du rendez-vous.
     * @param {Date} options.dateModification La date de modification du rendez-vous.
     */
    constructor({
        id = undefined,
        idCreateur,
        idAgenda,
        debut,
        fin,
        titre,
        description,
        idRepetition = undefined,
        dateCreation = undefined,
        dateModification = undefined,
    }) {
        /**
         * L'identifiant du rendez-vous.
         * @type {string}
         */
        if (id) this.id = id;
        /**
         * L'identifiant du créateur du rendez-vous.
         * @type {number}
         */
        this.idCreateur = idCreateur;
        /**
         * L'identifiant de l'agenda du rendez-vous.
         * @type {number}
         */
        this.idAgenda = idAgenda;
        /**
         * La date de début du rendez-vous.
         * @type {Date}
         */
        this.debut = debut;
        /**
         * La date de fin du rendez-vous.
         * @type {Date}
         */
        this.fin = fin;
        /**
         * Le titre du rendez-vous.
         * @type {string}
         */
        this.titre = titre;
        /**
         * La description du rendez-vous.
         * @type {string}
         */
        this.description = description;
        /**
         * L'identifiant de la répétition du rendez-vous.
         * @type {number}
         */
        if (idRepetition) this.idRepetition = idRepetition;
        /**
         * La date de création du rendez-vous.
         * @type {Date}
         */
        if (dateCreation) this.dateCreation = dateCreation;
        /**
         * La date de modification du rendez-vous.
         * @type {Date}
         */
        if (dateModification) this.dateModification = dateModification;
    }
}

export { RendezVous };
