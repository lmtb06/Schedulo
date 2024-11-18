import { RendezVousAPIRouter } from "../rendez-vous/rendez-vous.router.js";
import { Router } from "../shared/router.js";

/**
 * Classe de Router pour l'api principale.
 * @augments {Router}
 */
class MainAPIRouter extends Router {
    /**
     * Crée une nouvelle instance de MainAPIRouter.
     * @param {ServiceFactory} serviceFactory - Factory pour les services
     * @param {RendererFactory} rendererFactory - Factory pour les renderers
     */
    constructor(serviceFactory, rendererFactory) {
        super(serviceFactory, rendererFactory);
    }

    /**
     * @inheritdoc
     * @override
     */
    _setupRouter(serviceFactory, rendererFactory) {
        this._router.use(
            "/rendez-vous",
            new RendezVousAPIRouter(serviceFactory, rendererFactory).getRouter()
        );
    }
}

export { MainAPIRouter };
