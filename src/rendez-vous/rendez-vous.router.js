import { Router } from "../shared/router.js";
import { RendezVousController } from "./rendez-vous.controller.js";

/**
 * Classe de Router pour les rendez-vous.
 * @augments {Router}
 */
class RendezVousAPIRouter extends Router {
    constructor(serviceFactory, rendererFactory) {
        super(serviceFactory, rendererFactory);
    }

    /**
     * @inheritdoc
     * @override
     */
    _setupRouter(serviceFactory, rendererFactory) {
        const rendezVousController = new RendezVousController(
            serviceFactory,
            rendererFactory
        );
        this._router
            .get("/", rendezVousController.getAllRendezVous)
            .post("/create", rendezVousController.createRendezVous)
            .get("/:id", rendezVousController.getRendezVous)
            .put("/:id", rendezVousController.updateRendezVous)
            .delete("/:id", rendezVousController.deleteRendezVous);
    }
}

/**
 * Classe de Router pour les rendez-vous.
 * @augments {Router}
 */
class RendezVousWebRouter extends Router {
    constructor(serviceFactory, rendererFactory) {
        super(serviceFactory, rendererFactory);
    }

    /**
     * @inheritdoc
     * @override
     */
    _setupRouter(serviceFactory, rendererFactory) {
        this._router.get("/", (req, res) => {
            res.render("pages/calendrier", { titrePage: "Rendez vous" });
        });
    }
}

export { RendezVousAPIRouter, RendezVousWebRouter };
