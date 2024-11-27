import createError from "http-errors";
import { renderApiSuccessResponse } from "../utils/render-utils.js";

class UtilisateurController {
    constructor({
        utilisateurService = UtilisateurService,
        httpErrorCreate = createError,
        renderApiResponse = renderApiSuccessResponse,
    } = {}) {
        this.utilisateurService = utilisateurService;
        this.renderApiResponse = renderApiResponse;
        this.httpErrorCreate = httpErrorCreate;
    }

    getPageInscription = (request, res) => {
        res.render("compte/inscription", {
            titrePage: "Inscription",
        });
    };
}

export { UtilisateurController };
