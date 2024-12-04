import { ResponseDTO } from "../../../shared/response.dto.js";

/**
 * @typedef {import('../../rendez-vous.model.js').RendezVous} RendezVous
 * @typedef {import('../../../shared/response.dto.js').ResponseDTO} ResponseDTO
 * @typedef {import("../../../shared/response.dto.js").Errors} Errors
 */
/**
 * Classe DTO de reponse pour la récupération des détails d'un rendez-vous.
 * @implements {ResponseDTO}
 */
class GetRendezVousResponseDTO extends ResponseDTO {
    /**
     * @param {Errors} errors
     * @param {RendezVous} data
     * @param {number} status
     * @param {string} message
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
                message ||
                (data ? "Rendez-vous" : "Le rendez-vous n'existe pas"),
            status: status || (data ? 200 : 404),
        });
    }
}

export { GetRendezVousResponseDTO };
