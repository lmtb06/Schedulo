import UtilisateurService from '../services/utilisateurService.js';
import { renderApiSuccessResponse } from '../utils/renderUtils.js';
import createError from 'http-errors';

export class UtilisateurController{

    constructor({
        utilisateurService = UtilisateurService,
        httpErrorCreate = createError,
        renderApiResponse = renderApiSuccessResponse,
    } = {}){
        this.utilisateurService = utilisateurService;
        this.renderApiResponse = renderApiResponse;
        this.httpErrorCreate = httpErrorCreate;
    }

    getPageInscription = (req, res) => {

        res.render('compte/inscription', {
            titrePage: 'Inscription'
        });
    }
}

export default new UtilisateurController();