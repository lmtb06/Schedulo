/**
 * @typedef {import('./agenda.model.js').Agenda} Agenda
 * @typedef {import('../shared/service.factory.js').ServiceFactory} ServiceFactory
 * @typedef {import('../shared/renderer.factory.js').RendererFactory} RendererFactory
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 * @typedef {import('express').NextFunction} NextFunction
 */

import { ServiceError } from "../errors/index.js";
import { DeleteRendezVousRequestDTO } from "../rendez-vous/index.js";
import { AgendaService } from "./agenda.service.js";
import {
    CreateAgendaRequestDTO,
    DeleteAgendaRequestDTO,
    GetAgendaRequestDTO,
    GetAllAgendaRequestDTO,
    UpdateAgendaRequestDTO,
} from "./dto/request-dto/index.js";

/**
 * Contrôleur pour les agenda.
 */
class AgendaController {
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
     * Crée une instance de AgendaController.
     * @param {ServiceFactory} serviceFactory - Factory pour les services
     * @param {RendererFactory} rendererFactory - Factory pour les renderers
     */
    constructor(serviceFactory, rendererFactory) {
        this.#serviceFactory = serviceFactory;
        this.#rendererFactory = rendererFactory;
    }

    /**
     * Récupère le service des agenda.
     * @returns {Promise<AgendaService>} Le service des agenda
     * @throws {ServiceError} Si le service des agenda est introuvable
     */
    async #getAgendaService() {
        const rdvService = await this.#serviceFactory.getAgendaService();
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
    getAllAgenda = async (request, res, next) => {
        try {
            const agendaService = await this.#getAgendaService();

            const requestDTO = new GetAllAgendaRequestDTO(request.query);

            const responseDTO = await agendaService.getAllAgenda(requestDTO);

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
    createAgenda = async (request, res, next) => {
        try {
            const agendaService = await this.#getAgendaService();

            const requestDTO = new CreateAgendaRequestDTO(request.body);

            const responseDTO = await agendaService.createAgenda(requestDTO);

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
    getAgenda = async (request, res, next) => {
        try {
            const agendaService = await this.#getAgendaService();

            const requestDTO = new GetAgendaRequestDTO(request.params);

            const responseDTO = await agendaService.getAgenda(requestDTO);
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
    updateAgenda = async (request, res, next) => {
        try {
            const agendaService = await this.#getAgendaService();
            const requestDTO = new UpdateAgendaRequestDTO({
                ...request.body,
                ...request.params,
            });

            const responseDTO = await agendaService.updateAgenda(requestDTO);

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
    deleteAgenda = async (request, res, next) => {
        try {
            const agendaService = await this.#getAgendaService();

            const requestDTO = new DeleteAgendaRequestDTO(request.params);

            const responseDTO = await agendaService.deleteAgenda(requestDTO);

            if (!responseDTO.errors) {
                const rendezVousService =
                    await this.#serviceFactory.getRendezVousService();

                const allRDV = await rendezVousService.getAllRendezVous(
                    new GetAllAgendaRequestDTO({
                        idAgenda: responseDTO.data.id,
                    })
                );

                for (const rdv of allRDV.data) {
                    const suppression =
                        await rendezVousService.deleteRendezVous(
                            new DeleteRendezVousRequestDTO({
                                id: rdv.id,
                            })
                        );

                    if (suppression.errors) {
                        throw new Error(
                            "Erreur lors de la suppression des RDV"
                        );
                    }
                }

                if (allRDV.errors) {
                    throw new Error(
                        "Erreur lors de la récupération des RDV en vue de leur suppression"
                    );
                }
            }

            res.status(responseDTO.status).send(responseDTO);
        } catch (error) {
            next(error);
        }
    };
}

export { AgendaController };
