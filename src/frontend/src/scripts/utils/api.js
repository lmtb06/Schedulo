import axios from "axios";
/**
 * @typedef {object} RendezVous
 * @property {string} id - Identifiant du rendez-vous
 * @property {string} idCreateur - Identifiant du créateur du rendez-vous
 * @property {string} idAgenda - Identifiant de l'agenda du rendez-vous
 * @property {string} titre - Titre du rendez-vous
 * @property {string} description - Description du rendez-vous
 * @property {Date} debut - Date de début du rendez-vous
 * @property {Date} fin - Date de fin du rendez-vous
 * @property {string|undefined} idRepetition - Identifiant de la répétition du rendez-vous
 */

/**
 * Classe pour les appels API
 */
class API {
    /**
     * URL de base de l'API
     * @type {string}
     */
    #url;
    #axios;
    /**
     * Crée une instance de la classe API
     * @param {string} url - URL de base de l'API
     */
    constructor(url) {
        this.#axios = axios.create({
            baseURL: url,
            timeout: 1000,
            headers: {
                "Content-Type": "application/json",
            },
        });
        this.#url = url;
    }
    /**
     * Crée un rendez-vous
     * @param {object} rendezVous - Les informations du rendez-vous
     * @returns {Promise<RendezVous>} Le rendez-vous créé
     * @throws {Object[]} - Liste des erreurs
     */
    async createRendezVous(rendezVous) {
        const url = "/rendez-vous/create";
        return this.#axios
            .post(url, rendezVous)
            .then(({ data: { errors, message, data } }) => {
                if (errors && errors.length > 0) {
                    console.error(
                        "Erreurs lors de la création du rendez-vous :",
                        errors
                    );
                    throw errors;
                }
                console.log(message);
                return data;
            })
            .catch((error) => {
                console.error(
                    "Erreur lors de la création du rendez-vous :",
                    error.message
                );
                throw error;
            });
    }

    /**
     * Met à jour un rendez-vous
     * @param {string} id - Identifiant du rendez-vous
     * @param {object} rendezVous - Les informations du rendez-vous
     * @returns {Promise<RendezVous>} Le rendez-vous mis à jour
     * @throws {Object[]} - Liste des erreurs
     */
    async updateRendezVous(id, rendezVous) {
        const url = `/rendez-vous/${id}`;
        return this.#axios
            .put(url, rendezVous)
            .then(({ data: { errors, message, data } }) => {
                if (errors && errors.length > 0) {
                    console.error(
                        "Erreurs lors de la mise à jour du rendez-vous :",
                        errors
                    );
                    throw errors;
                }
                console.log(message);
                return data;
            })
            .catch((error) => {
                console.error(
                    "Erreur lors de la mise à jour du rendez-vous :",
                    error.message
                );
                throw error;
            });
    }

    /**
     * Récupère tous les rendez-vous dans un intervalle de temps donné
     * @param {Date} debut - Date de début de l'intervalle
     * @param {Date} fin - Date de fin de l'intervalle
     * @returns {Promise<RendezVous[]>} Les rendez-vous dans l'intervalle
     * @throws {Object[]} - Liste des erreurs
     */
    async fetchRendezVousIntervalle(debut, fin) {
        const url = "/rendez-vous";
        return this.#axios
            .get(url, {
                params: { debut: debut.toISOString(), fin: fin.toISOString() },
            })
            .then(({ data: { errors, message, data: liste } }) => {
                if (errors && errors.length > 0) {
                    console.error(
                        "Erreurs lors de la récupération des rendez-vous :",
                        errors
                    );
                    throw errors;
                }
                console.log(message);
                return liste;
            })
            .catch((error) => {
                console.error(
                    "Erreurs lors de la récupération des rendez-vous :",
                    error.message
                );
                throw error;
            });
    }

    async getRendezVous(id) {
        const url = `/rendez-vous/${id}`;
        return this.#axios
            .get(url)
            .then(({ data: { errors, message, data } }) => {
                if (errors && errors.length > 0) {
                    console.error(
                        "Erreurs lors de la mise à jour du rendez-vous :",
                        errors
                    );
                    throw errors;
                }
                console.log(message);
                return data;
            })
            .catch((error) => {
                console.error(
                    "Erreur lors de la récupération du rendez-vous :",
                    error.message
                );
                throw error;
            });
    }
}

// Instance de la classe API
export { API };
export default new API("http://localhost:3000/api");
