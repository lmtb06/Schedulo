import { CreateRendezVousModal } from "./create-rdv-modal.js";
import { EditRendezVousModal } from "./edit-rdv-modal.js";

class ModalFactory {
    #api;

    constructor(api) {
        this.#api = api;
    }

    getCreateRendezvousModal(element) {
        return new CreateRendezVousModal(element, this.#api);
    }

    getEditRendezvousModal(element) {
        return new EditRendezVousModal(element, this.#api);
    }
}

export { ModalFactory };
