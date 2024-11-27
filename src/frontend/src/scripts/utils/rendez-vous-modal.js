import defaultAPI, { API } from "./api.js";
/**
 * @typedef {object} RendezVous
 * @property {string} titre
 * @property {string} description
 * @property {Date} debut
 * @property {Date} fin
 * @callback EventHandlerCallback
 * @param {Event} event
 * @returns {void}
 * @typedef {object} SubmitError
 * @property {string} message
 * @property {string} key
 * @property {string} value valeur problématique
 */

class RendezVousModal {
    /**
     * @type {HTMLDialogElement}
     * @private
     */
    _modal;

    /**
     * @type {Function(RendezVous):Promise<RendezVous>}
     * @private
     */
    _createCallback;

    /**
     * @type {Function(RendezVous):Promise<RendezVous>}
     * @private
     */
    _editCallback;
    _successCallback;
    /**
     * @param {HTMLDialogElement} element
     * @param successCallback
     */
    constructor(element) {
        this._modal = element;
        this._createCallback = (rendezVous) => {
            console.log("Création du rendez-vous :", rendezVous);
            return new Promise((resolve, reject) => {
                resolve(rendezVous);
            });
        };
        this._editCallback = (rendezVous) => {
            console.log("Edition du rendez-vous :", rendezVous);
            return new Promise((resolve, reject) => {
                resolve(rendezVous);
            });
        };
        this._successCallback = (rendezVous) => {};
    }

    init() {
        this._addEventListeners();
    }

    /**
     * @param {Function(RendezVous):Promise<RendezVous>} callback - Fonction de création du rendez-vous
     * @returns {void}
     */
    setCreateCallback(callback) {
        this._createCallback = callback;
    }

    /**
     * @param {Function(RendezVous):Promise<RendezVous>} callback - Fonction de modification du rendez-vous
     * @returns {void}
     */
    setEditCallback(callback) {
        this._editCallback = callback;
    }

    setSuccessCallback(callback) {
        this._successCallback = callback;
    }

    /**
     *
     * @param {RendezVous} rendezVous
     * @param {string} mode
     */
    show(rendezVous, mode = "create") {
        switch (mode) {
            case "update":
                this._setEditMode();
                break;
            case "create":
                this._setCreateMode();
                break;
            default:
                throw new Error("Mode inconnu");
        }

        this._prefillInputs(rendezVous);
        this._modal.showModal();
    }

    close() {
        this._modal.close();
    }

    /**
     *
     * @param {RendezVous} rendezVous
     */
    _prefillInputs({
        id,
        idAgenda,
        idCreateur,
        titre,
        description,
        debut,
        fin,
    } = {}) {
        Object.assign(this._modal.dataset, {
            id,
            idAgenda,
            idCreateur,
        });

        const form = this._modal.querySelector("form");

        titre && (form.elements["rendez-vous-titre"].value = titre);

        description &&
            (form.elements["rendez-vous-description"].value = description);

        debut &&
            (form.elements["rendez-vous-debut"].value = debut
                .toISOString()
                .slice(0, 16));

        fin &&
            (form.elements["rendez-vous-fin"].value = fin
                .toISOString()
                .slice(0, 16));
    }

    _reset() {
        const form = this._modal.querySelector("form");
        form.reset();
        Object.keys(this._modal.dataset).forEach((dataKey) => {
            delete this._modal.dataset[dataKey];
        });
    }

    _addEventListeners() {
        this._modal.addEventListener("close", () => {
            this._reset();
        });

        // Ajout des événements de fermeture du dialog
        this._modal.querySelectorAll("[close]").forEach((element) => {
            element.addEventListener("click", (event) => {
                event.preventDefault();
                this._modal.close();
            });
        });

        // Ajout de l'événement de soumission du formulaire
        this._modal.addEventListener("submit", (event) => {
            event.preventDefault();
            const button = event.submitter;
            const rendezVous = this._getRendezVousFromData();
            let callback;
            switch (button.value) {
                case "create":
                    callback = this._createCallback(rendezVous)
                        .then((rendezVous) => {
                            this._modal.close();
                            const submitEvent = new SubmitEvent("create");
                            this._modal.dispatchEvent(submitEvent);
                            return rendezVous;
                        })
                        .catch((errors) => {
                            console.error(
                                "Erreur lors de la création du rendez-vous"
                            );
                            this._showErrors(errors);
                        });
                    break;
                case "update":
                    callback = this._editCallback(rendezVous)
                        .then((rendezVous) => {
                            this._modal.close();
                            const submitEvent = new SubmitEvent("update");
                            this._modal.dispatchEvent(submitEvent);
                            return rendezVous;
                        })
                        .catch((errors) => {
                            console.error(
                                "Erreur lors de la mise à jour du rendez-vous"
                            );
                            this._showErrors(errors);
                        });
                    break;
                default:
                    throw new Error("Action inconnue");
            }

            callback.then(this._successCallback).catch((error) => {
                console.error("Erreur lors de l'exécution du callback", error);
            });
        });
    }

    /**
     * @param {HTMLFormElement} form
     * @returns {RendezVous}
     */
    _getRendezVousFromData() {
        const form = this._modal.querySelector("form");
        let rendezVous = {};
        Object.assign(rendezVous, this._modal.dataset, {
            titre: this._getTitre(form),
            description: this._getDesciption(form),
            debut: this._getDebutDate(form),
            fin: this._getFinDate(form),
        });
        return rendezVous;
    }

    /**
     *
     * @param {HTMLFormElement} form
     * @returns {string}
     */
    _getTitre(form) {
        const titre = form.elements["rendez-vous-titre"].value;
        return titre;
    }

    /**
     *
     * @param {HTMLFormElement} form
     * @returns {string}
     */
    _getDesciption(form) {
        const description = form.elements["rendez-vous-description"].value;
        return description;
    }

    /**
     *
     * @param {HTMLFormElement} form
     * @returns {Date}
     */
    _getDebutDate(form) {
        const date = new Date(form.elements["rendez-vous-debut"].value);
        return date;
    }

    /**
     *
     * @param {HTMLFormElement} form
     * @returns {Date}
     */
    _getFinDate(form) {
        const date = new Date(form.elements["rendez-vous-fin"].value);
        return date;
    }

    _setEditMode() {
        this._hideCreateElements();
        this._showEditElements();
    }

    _setCreateMode() {
        this._hideEditElements();
        this._showCreateElements();
    }

    _hideEditElements() {
        this._modal
            .querySelectorAll("[name*=update-rendez-vous]")
            .forEach((element) => {
                element.hidden = true;
            });
    }

    _hideCreateElements() {
        this._modal
            .querySelectorAll("[name*=create-rendez-vous]")
            .forEach((element) => {
                element.hidden = true;
            });
    }

    _showEditElements() {
        this._modal
            .querySelectorAll("[name*=update-rendez-vous]")
            .forEach((element) => {
                element.hidden = false;
            });
    }

    _showCreateElements() {
        this._modal
            .querySelectorAll("[name*=create-rendez-vous]")
            .forEach((element) => {
                element.hidden = false;
            });
    }

    /**
     *
     * @param {SubmitError[]} errors
     */
    _showErrors(errors) {
        errors.forEach((error) => {
            console.error(
                `Erreur lors de la validation du champ ${error.key} : ${error.message}`
            );
        });
    }
}

class RendezVousModalAPI extends RendezVousModal {
    /**
     * @type {API}
     * @private
     */
    #api;

    /**
     * Crée une instance de RendezVousModalAPI
     * @param {HTMLDialogElement} element
     * @param {API} api
     * @param successCallback
     */
    constructor(element, api = defaultAPI) {
        super(element);
        this.#api = api;
        const createCallback = (rendezVous) => {
            return this.#api.createRendezVous(rendezVous);
        };
        const editCallback = (rendezVous) => {
            return this.#api.updateRendezVous(rendezVous.id, rendezVous);
        };
        this.setCreateCallback(createCallback);
        this.setEditCallback(editCallback);
    }

    show(rendezVous, mode = "create") {
        if (rendezVous.id) {
            this.#api
                .getRendezVous(rendezVous.id)
                .then((rendezVous) => {
                    rendezVous.debut = new Date(rendezVous.debut);
                    rendezVous.fin = new Date(rendezVous.fin);
                    super.show(rendezVous, mode);
                    return rendezVous;
                })
                .catch((error) => {
                    console.error(
                        "Erreur lors de la récupération du rendez-vous :",
                        error
                    );
                });
        } else {
            super.show(rendezVous, mode);
        }
    }
}

export { RendezVousModal, RendezVousModalAPI };
