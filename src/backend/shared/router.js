import express from "express";

/**
 * @typedef {import('./service.factory.js').ServiceFactory} ServiceFactory Factory pour les services
 * @typedef {import('./renderer.factory.js').RendererFactory} RendererFactory Factory pour les renderers
 */

/**
 * Classe de Router pour l'api
 * @abstract
 */
class Router {
    /**
     * @type {express.Router} Router pour l'api
     * @protected
     */
    _router;
    /**
     * Crée une nouvelle instance de Router pour l'api.
     * @param {ServiceFactory} serviceFactory - Factory pour les services
     * @param {RendererFactory} rendererFactory - Factory pour les render
     * @abstract
     */
    constructor(serviceFactory, rendererFactory) {
        this._router = express.Router();
        this._setupRouter(serviceFactory, rendererFactory);
    }

    /**
     * Initialise le router
     * @abstract
     * @protected
     * @param {ServiceFactory} serviceFactory - Factory pour les services
     * @param {RendererFactory} rendererFactory - Factory pour les renderers
     */
    _setupRouter(serviceFactory, rendererFactory) {
        throw new Error("Méthode non implémentée");
    }

    getRouter() {
        return this._router;
    }
}

export { Router };
