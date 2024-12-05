import { RendezVousModal } from "./rdv-modal.js";

class EditRendezVousModal extends RendezVousModal {
    _updateSuccessHandler;
    _updateFailureHandler;
    _deleteSuccessHandler;
    _deleteFailureHandler;
    constructor(element, api) {
        super(element, api);
        this._updateSuccessHandler = () => {};
        this._updateFailureHandler = () => {};
        this._deleteSuccessHandler = () => {};
        this._deleteFailureHandler = () => {};
    }

    addEventListeners() {
        super.addEventListeners();

        this._element.querySelectorAll("[delete]").forEach((element) => {
            element.addEventListener("click", () => {
                this._element.dispatchEvent(new Event("delete"));
            });
        });

        this._element.addEventListener("delete", (event) => {
            this._api
                .deleteRendezVous(this._element.dataset.id)
                .then((rdv) => {
                    this.close();
                    this._deleteSuccessHandler(rdv);
                    return;
                })
                .catch((errors) => {
                    this.close();
                    this._deleteFailureHandler(errors);
                });
        });
    }

    prefill(rdv) {
        this._api
            .getRendezVous(rdv.id)
            .then((upToDateRDV) => {
                upToDateRDV.debut = new Date(upToDateRDV.debut);
                upToDateRDV.fin = new Date(upToDateRDV.fin);
                super.prefill(upToDateRDV);
                return;
            })
            .catch((error) => {
                console.error(
                    "Erreur lors de la récupération du rendez-vous :",
                    error
                );
            });
    }

    submit() {
        const form = this._element.querySelector("form");
        this._api
            .updateRendezVous(this._element.dataset.id, {
                debut: form.elements["rdv-debut"].value,
                fin: form.elements["rdv-fin"].value,
                titre: form.elements["rdv-titre"].value,
                description: form.elements["rdv-description"].value,
                idAgenda: form.elements["rdv-agenda"].value,
            })
            .then((rdv) => {
                this.close();
                this._updateSuccessHandler(rdv);
                return;
            })
            .catch((errors) => {
                this._updateFailureHandler(errors);
            });
    }

    onUpdateSuccess(callback) {
        this._updateSuccessHandler = callback;
    }

    onUpdateFailure(callback) {
        this._updateFailureHandler = callback;
    }

    onDeleteSuccess(callback) {
        this._deleteSuccessHandler = callback;
    }

    onDeleteFailure(callback) {
        this._deleteFailureHandler = callback;
    }
}

export { EditRendezVousModal };
