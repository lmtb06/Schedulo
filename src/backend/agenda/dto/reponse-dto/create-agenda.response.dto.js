import { ResponseDTO } from "../../../shared/response.dto.js";

/**
 * @typedef {import('../../agenda.model.js').Agenda} Agenda
 */

/**
 * Classe DTO de reponse pour la création d'un agenda.
 * @implements {ResponseDTO}
 */
class CreateAgendaResponseDTO extends ResponseDTO {
    /**
     * @param {object} errors
     * @param {Agenda} data
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
                      titre: data.titre,
                      description: data.description,
                      couleur: data.couleur,
                  }
                : undefined,
            message:
                message ||
                (data ? "Agenda créé" : "Impossible de créer l'agenda"),
            status: status || (data ? 201 : 500),
        });
    }
}

export { CreateAgendaResponseDTO };
