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
            .post("/create", rendezVousController.createRendezVous)
            .get("/:id", rendezVousController.getRendezVous)
            .put("/:id", rendezVousController.updateRendezVous)
            .delete("/:id", rendezVousController.deleteRendezVous)
            .get("/", rendezVousController.getAllRendezVous);
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
        this._router.get("/", (req, res, next) => {
            try {
                res.render("pages/calendrier", {
                    agendas: [
                        {
                            id: "67504f8990fe2836b7f7de2f",
                            nom: "Agenda 1",
                        },
                        {
                            id: "6746bd30184dc7e1a8242fc7",
                            nom: "Agenda 2",
                        },
                    ],
                });
            } catch (error) {
                next(error);
            }
        });
    }
}

export { RendezVousAPIRouter, RendezVousWebRouter };
