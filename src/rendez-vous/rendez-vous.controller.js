/**
 * @typedef {import('./rendez-vous.model.js').RendezVous} RendezVous
 * @typedef {import('../shared/service.factory.js').ServiceFactory} ServiceFactory
 * @typedef {import('../shared/renderer.factory.js').RendererFactory} RendererFactory
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 * @typedef {import('express').NextFunction} NextFunction
 */

import { CreateRendezVousDTO } from "./dto/create-rendez-vous.dto.js";
import { DeleteRendezVousDTO } from "./dto/delete-rendez-vous.dto.js";

/**
 * Contrôleur pour les rendez-vous.
 */
class RendezVousController {
    /**
     * @type {ServiceFactory} Factory pour les services
     * @private
     */
    #serviceFactory;
    /**
     * @type {RendererFactory} Factory pour les renderers
     * @private
     */
    #rendererFactory;
    /**
     * Crée une instance de RendezVousController.
     * @param {ServiceFactory} serviceFactory - Factory pour les services
     * @param {RendererFactory} rendererFactory - Factory pour les renderers
     */
    constructor(serviceFactory, rendererFactory) {
        this.#serviceFactory = serviceFactory;
        this.#rendererFactory = rendererFactory;
    }

    /**
     *
     * @param {Request} request
     * @param {Response} res
     * @param {NextFunction} next
     */
    async getAllRendezVous(request, res, next) {
        return res.render("rendez-vous/index-page", {
            titrePage: "Liste des rendez-vous",
        });
        // try {
        // 	const filtres = request.query || {};
        // 	const rendezVous = await this.rendezVousService.getAllRendezVous(filtres);
        // 	this.renderApiResponse(res, {
        // 		status: 200,
        // 		message: 'Liste des rendez-vous',
        // 		data: rendezVous,
        // 	});
        // } catch (e) {
        // 	next(this.httpErrorCreate(500, 'Erreur lors de la récupération des rendez-vous'));
        // }
    }

    /**
     *
     * @param {Request} request
     * @param {Response} res
     * @param {NextFunction} next
     */
    createRendezVous = async (request, res, next) => {
        console.log("createRendezVous");
        try {
            // Récupération du service
            const rendezVousService =
                await this.#serviceFactory.getRendezVousService();
            if (!rendezVousService) {
                throw new Error("Service indisponible");
            }

            // Création et validation du DTO
            const createRendezVousDTO = new CreateRendezVousDTO(request.body);

            // Création du rendez-vous
            const rendezVous =
                await rendezVousService.createRendezVous(createRendezVousDTO);

            console.log("Rendez-vous créé:", rendezVous);
            return rendezVous;
        } catch (error) {
            if (error instanceof ValidationError) {
                throw new Error(`Validation échouée: ${error.message}`);
            }

            console.error("Erreur lors de la création:", error);
            throw error;
        }
        // const donneesRendezVous = request.body;
        // try {
        // 	const nouveauRendezVous =
        // 		await this.rendezVousService.creerRendezVous(donneesRendezVous);
        // 	this.renderApiResponse(res, {
        // 		status: 201,
        // 		message: 'Rendez-vous créé',
        // 		data: nouveauRendezVous,
        // 	});
        // } catch (e) {
        // 	logger.error(e);
        // 	next(this.httpErrorCreate(400, 'Erreur lors de la création du rendez-vous'));
        // }
    };

    /**
     *
     * @param {Request} request
     * @param {Response} res
     * @param {NextFunction} next
     */
    async getRendezVous(request, res, next) {
        console.log("getRendezVous");
        // const id = request.params.id;
        // try {
        // 	const rendezVous = await this.rendezVousService.getRendezVousById(id);
        // 	if (!rendezVous) {
        // 		return next(this.httpErrorCreate(404, 'Rendez-vous non trouvé'));
        // 	}

        // 	this.renderApiResponse(res, {
        // 		status: 200,
        // 		message: 'Rendez-vous trouvé',
        // 		data: rendezVous,
        // 	});
        // } catch (e) {
        // 	next(this.httpErrorCreate(500, 'Erreur lors de la récupération du rendez-vous'));
        // }
    }

    /**
     *
     * @param {Request} request
     * @param {Response} res
     * @param {NextFunction} next
     */
    async updateRendezVous(request, res, next) {
        console.log("updateRendezVous");
        // const id = request.params.id;
        // const nouvellesDonneesRendezVous = request.body;
        // try {
        // 	const rendezVous = await this.rendezVousService.updateRendezVous(
        // 		id,
        // 		nouvellesDonneesRendezVous
        // 	);
        // 	if (!rendezVous) {
        // 		return next(this.httpErrorCreate(404, 'Rendez-vous non trouvé'));
        // 	}

        // 	this.renderApiResponse(res, {
        // 		status: 200,
        // 		message: 'Rendez-vous modifié',
        // 		data: rendezVous,
        // 	});
        // } catch (e) {
        // 	next(this.httpErrorCreate(400, 'Erreur lors de la mise à jour du rendez-vous'));
        // }
    }

    /**
     *
     * @param {Request} request
     * @param {Response} res
     * @param {NextFunction} next
     */
    async deleteRendezVous(request, res, next) {
        console.log("deleteRendezVous");
        try {
            // Récupération du service
            const rendezVousService =
                await this.#serviceFactory.getRendezVousService();
            if (!rendezVousService) {
                throw new Error("Service indisponible");
            }

            // Création et validation du DTO
            const deleteRendezVous = new DeleteRendezVousDTO(request.body);

            // Supression du rendez-vous
            const rendezVous =
                await rendezVousService.deleteRendezVous(deleteRendezVous);

            console.log("Rendez-vous supprimé:", rendezVous);
            return rendezVous;
        } catch (error) {
            if (error instanceof ValidationError) {
                throw new Error(`Validation échouée: ${error.message}`);
            }

            console.error("Erreur lors de la suppression:", error);
            throw error;
        }
        // const id = request.params.id;
        // try {
        // 	const rendezVousSupprime = await this.rendezVousService.deleteRendezVous(id);
        // 	if (!rendezVousSupprime) {
        // 		return next(this.httpErrorCreate(404, 'Rendez-vous non trouvé'));
        // 	}

        // 	this.renderApiResponse(res, {
        // 		status: 200,
        // 		message: 'Rendez-vous supprimé',
        // 		data: rendezVousSupprime,
        // 	});
        // } catch (e) {
        // 	next(this.httpErrorCreate(500, 'Erreur lors de la suppression du rendez-vous'));
        // }
    }

    // getPageCreationRendezVous(request, res) {
    // 	// TODO : Renvoyer la page de création (à modifier)
    // 	res.redirect('/'); // Redirection vers la page d'accueil
    // }

    // async getPageRendezVous(request, res) {
    // 	// TODO : Renvoyer la page de détails (à modifier)
    // 	res.redirect('/'); // Redirection vers la page d'accueil
    // }
}

export { RendezVousController };
