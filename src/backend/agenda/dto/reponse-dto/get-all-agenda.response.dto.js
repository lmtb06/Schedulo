import { ResponseDTO } from "../../../shared/response.dto.js";

/**
 * @typedef {import('../../agenda.model.js').Agenda} Agenda
 * @typedef {import('../../../shared/response.dto.js').ResponseDTO} ResponseDTO
 * @typedef {import("../../../shared/response.dto.js").Errors} Errors
 */
/**
 * Classe DTO de reponse pour la récupération de tous les agendas satisfaisant des critères.
 * @implements {ResponseDTO}
 */
class GetAllAgendaResponseDTO extends ResponseDTO {
    /**
     * @param {Errors|undefined} errors
     * @param {Agenda[]} data
     * @param {number|undefined} status
     * @param {string|undefined} message
     */
    constructor({ errors, data, message, status }) {
        super({
            errors,
            data: data?.map((agenda) => ({
                id: agenda.id,
                idCreateur: agenda.idCreateur,
                titre: agenda.titre,
                description: agenda.description,
                couleur: agenda.couleur,
            })),
            message:
                message ??
                (data?.length > 0
                    ? `${data?.length} agendas trouvés`
                    : "Aucun agenda ne satisfait les critères"),
            status: status ?? 200,
        });
    }
}

export { GetAllAgendaResponseDTO };
