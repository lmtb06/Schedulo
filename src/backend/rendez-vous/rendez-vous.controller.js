/**
 * @typedef {import('./rendez-vous.model.js').RendezVous} RendezVous
 * @typedef {import('../shared/service.factory.js').ServiceFactory} ServiceFactory
 * @typedef {import('../shared/renderer.factory.js').RendererFactory} RendererFactory
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 * @typedef {import('express').NextFunction} NextFunction
 */

import { ServiceError } from "../errors/index.js";
import {
    CreateRendezVousRequestDTO,
    DeleteRendezVousRequestDTO,
    GetAllRendezVousRequestDTO,
    GetRendezVousRequestDTO,
    UpdateRendezVousRequestDTO,
} from "./dto/request-dto/index.js";
import { RendezVousService } from "./rendez-vous.service.js";

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
     * Récupère le service des rendez-vous.
     * @returns {Promise<RendezVousService>} Le service des rendez-vous
     * @throws {ServiceError} Si le service des rendez-vous est introuvable
     */
    async #getRendezVousService() {
        const rdvService = await this.#serviceFactory.getRendezVousService();
        if (!rdvService) {
            throw new ServiceError("Service indisponible", error);
        }
        return rdvService;
    }

    /**
     *
     * @param {Request} request
     * @param {Response} res
     * @param {NextFunction} next
     */
    getAllRendezVous = async (request, res, next) => {
        try {
            const rendezVousService = await this.#getRendezVousService();

            const requestDTO = new GetAllRendezVousRequestDTO(request.query);

            const responseDTO =
                await rendezVousService.getAllRendezVous(requestDTO);

            res.status(responseDTO.status).send(responseDTO);
        } catch (error) {
            next(error);
        }
    };

    /**
     *
     * @param {Request} request
     * @param {Response} res
     * @param {NextFunction} next
     */
    createRendezVous = async (request, res, next) => {
        try {
            const rendezVousService = await this.#getRendezVousService();

            const requestDTO = new CreateRendezVousRequestDTO(request.body);

            const responseDTO =
                await rendezVousService.createRendezVous(requestDTO);

            res.status(responseDTO.status).send(responseDTO);
        } catch (error) {
            next(error);
        }
    };

    /**
     *
     * @param {Request} request
     * @param {Response} res
     * @param {NextFunction} next
     */
    getRendezVous = async (request, res, next) => {
        try {
            const rendezVousService = await this.#getRendezVousService();

            const requestDTO = new GetRendezVousRequestDTO(request.params);

            const responseDTO =
                await rendezVousService.getRendezVous(requestDTO);
            res.status(responseDTO.status).send(responseDTO);
        } catch (error) {
            next(error);
        }
    };

    /**
     *
     * @param {Request} request
     * @param {Response} res
     * @param {NextFunction} next
     */
    updateRendezVous = async (request, res, next) => {
        try {
            const rendezVousService = await this.#getRendezVousService();
            const requestDTO = new UpdateRendezVousRequestDTO({
                ...request.body,
                ...request.params,
            });

            const responseDTO =
                await rendezVousService.updateRendezVous(requestDTO);

            res.status(responseDTO.status).send(responseDTO);
        } catch (error) {
            next(error);
        }
    };

    /**
     *
     * @param {Request} request
     * @param {Response} res
     * @param {NextFunction} next
     */
    deleteRendezVous = async (request, res, next) => {
        try {
            const rendezVousService = await this.#getRendezVousService();

            const requestDTO = new DeleteRendezVousRequestDTO(request.params);

            const responseDTO =
                await rendezVousService.deleteRendezVous(requestDTO);

            res.status(responseDTO.status).send(responseDTO);
        } catch (error) {
            next(error);
        }
    };
}

export { RendezVousController };
