import { API } from "./api.js";
import { Modal } from "./modal.js";

class RendezVousModal extends Modal {
    /**
     * @type {API}
     * @protected
     */
    _api;
    constructor(element, api) {
        super(element);
        this._api = api;
    }

    init() {
        super.init();
        this._api
            .getAgendasWithWritePermission()
            .then((agendas) => {
                agendas.forEach((agenda) => {
                    const option = document.createElement("option");
                    option.value = agenda.id;
                    option.textContent = agenda.nom;
                    this._element
                        .querySelector("form")
                        .elements["rdv-agenda"].appendChild(option);
                });
                return;
            })
            .catch((errors) => {
                console.error(
                    "Erreur lors de la récupération des agendas :",
                    errors
                );
            });
    }

    reset() {
        super.reset();
        const select =
            this._element.querySelector("form").elements["rdv-agenda"];
        select.querySelectorAll("option").forEach((option) => {
            if (option.value !== "") {
                option.remove();
            }
        });
        Object.keys(this._element.dataset).forEach((dataKey) => {
            delete this._element.dataset[dataKey];
        });
    }

    prefill(rdv) {
        const form = this._element.querySelector("form");

        rdv.id && (this._element.dataset.id = rdv.id);

        rdv.titre && (form.elements["rdv-titre"].value = rdv.titre);

        rdv.idAgenda && (form.elements["rdv-agenda"].value = rdv.idAgenda);

        rdv.description &&
            (form.elements["rdv-description"].value = rdv.description);

        rdv.debut &&
            (form.elements["rdv-debut"].value = rdv.debut
                .toISOString()
                .slice(0, 16));

        rdv.fin &&
            (form.elements["rdv-fin"].value = rdv.fin
                .toISOString()
                .slice(0, 16));
    }
}

export { RendezVousModal };
