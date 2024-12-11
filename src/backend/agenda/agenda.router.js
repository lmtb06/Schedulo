import { Router } from "../shared/router.js";
import { AgendaController } from "./agenda.controller.js";

/**
 * Classe de Router pour les agenda.
 * @augments {Router}
 */
class AgendaAPIRouter extends Router {
    constructor(serviceFactory, rendererFactory) {
        super(serviceFactory, rendererFactory);
    }

    /**
     * @inheritdoc
     * @override
     */
    _setupRouter(serviceFactory, rendererFactory) {
        const agendaController = new AgendaController(
            serviceFactory,
            rendererFactory
        );
        this._router
            .post("/create", agendaController.createAgenda)
            .get("/:id", agendaController.getAgenda)
            .put("/:id", agendaController.updateAgenda)
            .delete("/:id", agendaController.deleteAgenda)
            .get("/", agendaController.getAllAgenda);
    }
}

export { AgendaAPIRouter };
