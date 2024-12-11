import { ResponseDTO } from "../../../shared/response.dto.js";

/**
 * @typedef {import('../../agenda.model.js').Agenda} Agenda
 * @typedef {import('../../../shared/response.dto.js').ResponseDTO} ResponseDTO
 * @typedef {import("../../../shared/response.dto.js").Errors} Errors
 */
/**
 * Classe DTO de reponse pour la récupération des détails d'un agenda.
 * @implements {ResponseDTO}
 */
class GetAgendaResponseDTO extends ResponseDTO {
    /**
     * @param {Errors} errors
     * @param {Agenda} data
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
                      titre: data.titre,
                      description: data.description,
                      couleur: data.couleur,
                  }
                : undefined,
            message: message || (data ? "Agenda" : "L'agenda n'existe pas"),
            status: status || (data ? 200 : 404),
        });
    }
}

export { GetAgendaResponseDTO };
