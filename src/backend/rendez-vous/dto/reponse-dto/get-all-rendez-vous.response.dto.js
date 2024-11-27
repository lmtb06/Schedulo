import { ResponseDTO } from "../../../shared/response.dto.js";

/**
 * @typedef {import('../../rendez-vous.model.js').RendezVous} RendezVous
 * @typedef {import('../../../shared/response.dto.js').ResponseDTO} ResponseDTO
 * @typedef {import("../../../shared/response.dto.js").Errors} Errors
 */
/**
 * Classe DTO de reponse pour la récupération de tous les rendez-vous satisfaisant des critères.
 * @implements {ResponseDTO}
 */
class GetAllRendezVousResponseDTO extends ResponseDTO {
    /**
     * @param {Errors|undefined} errors
     * @param {RendezVous[]} data
     * @param {number|undefined} status
     * @param {string|undefined} message
     */
    constructor({ errors, data, message, status }) {
        super({
            errors,
            data: data?.map((rdv) => ({
                id: rdv.id,
                debut: rdv.debut,
                fin: rdv.fin,
                titre: rdv.titre,
            })),
            message:
                message ??
                (data?.length > 0
                    ? `${data?.length} rendez-vous trouvés`
                    : "Aucun rendez-vous ne satisfait les critères"),
            status: status ?? 200,
        });
    }
}

export { GetAllRendezVousResponseDTO };
