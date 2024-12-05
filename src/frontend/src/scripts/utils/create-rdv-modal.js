import { RendezVousModal } from "./rdv-modal.js";

class CreateRendezVousModal extends RendezVousModal {
    #creationSuccessHandler;
    #creationFailureHandler;
    constructor(element, api) {
        super(element, api);
        this.#creationSuccessHandler = () => {};
        this.#creationFailureHandler = () => {};
    }

    addEventListeners() {
        super.addEventListeners();
    }

    prefill(rdv) {
        super.prefill(rdv);
    }

    submit() {
        const form = this._element.querySelector("form");
        this._api
            .createRendezVous({
                debut: form.elements["rdv-debut"].value,
                fin: form.elements["rdv-fin"].value,
                titre: form.elements["rdv-titre"].value,
                description: form.elements["rdv-description"].value,
                idAgenda: form.elements["rdv-agenda"].value,
            })
            .then((rdv) => {
                this.close();
                this.#creationSuccessHandler(rdv);
                return;
            })
            .catch((errors) => {
                this.close();
                this.#creationFailureHandler(errors);
            });
    }

    onCreationSuccess(callback) {
        this.#creationSuccessHandler = callback;
    }

    onCreationFailure(callback) {
        this.#creationFailureHandler = callback;
    }
}

export { CreateRendezVousModal };
