import { DTO } from "../../shared/dto.js";
import { InterfaceValidator } from "../../utils/interface.js";

/**
 * @typedef {import("../../dtos/index").UpdateRepetitionDTO} UpdateRepetitionDTO
 */

/**
 * Classe DTO représentant la mise à jour d'un rendez-vous.
 * @implements {DTO}
 */
class UpdateRendezVousDTO {
    constructor({ id, idAgenda, debut, fin, titre, description, repetition }) {
        InterfaceValidator.ensureImplementsInterface(UpdateRendezVousDTO, DTO);
        /**
         * L'identifiant du rendez-vous.
         * @type {string}
         * @public
         * @readonly
         */
        this.id = id;
        /**
         * L'identifiant de l'agenda du rendez-vous.
         * @type {string}
         * @public
         * @readonly
         */
        this.idAgenda = idAgenda;
        /**
         * La date de début du rendez-vous.
         * @type {Date}
         * @public
         * @readonly
         */
        this.debut = debut;
        /**
         * La date de fin du rendez-vous.
         * @type {Date}
         * @public
         * @readonly
         */
        this.fin = fin;
        /**
         * Le titre du rendez-vous.
         * @type {string}
         * @public
         * @readonly
         */
        this.titre = titre;
        /**
         * La description du rendez-vous.
         * @type {string}
         * @public
         * @readonly
         */
        this.description = description;
        /**
         * La répétition du rendez-vous.
         * @type {UpdateRepetitionDTO}
         * @public
         * @readonly
         */
        this.repetition = repetition;
    }

    /**
     * @override
     * @inheritdoc
     */
    toJSON() {
        return JSON.stringify({
            id: this.id,
            idAgenda: this.idAgenda,
            debut: this.debut,
            fin: this.fin,
            titre: this.titre,
            description: this.description,
            repetition: this.repetition ? this.repetition.toJSON() : null,
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

export { UpdateRendezVousDTO };
