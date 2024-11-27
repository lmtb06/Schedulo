import { ResponseDTO } from "../../../shared/response.dto.js";

/**
 * @typedef {import('../../rendez-vous.model.js').RendezVous} RendezVous
 */

/**
 * Classe DTO de reponse pour la création d'un rendez-vous.
 * @implements {ResponseDTO}
 */
class CreateRendezVousResponseDTO extends ResponseDTO {
    /**
     * @param {object} errors
     * @param {RendezVous} data
     * @param {string} message
     * @param {number} status
     */
    constructor({ errors, data, message, status }) {
        super({
            errors,
            data: data
                ? {
                      id: data.id,
                      idCreateur: data.idCreateur,
                      idAgenda: data.idAgenda,
                      debut: data.debut,
                      fin: data.fin,
                      titre: data.titre,
                      description: data.description,
                      idRepetition: data.idRepetition,
                  }
                : undefined,
            message:
                message || data
                    ? "Rendez-vous créé"
                    : "Impossible de créer le rendez-vous",
            status: status || data ? 201 : 500,
        });
    }
}

export { CreateRendezVousResponseDTO };
