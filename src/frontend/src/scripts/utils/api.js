import axios from "axios";
/**
 * @typedef {object} RendezVous
 * @property {string} id - Identifiant du rendez-vous
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
    #idUtilisateur;
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
        this.#idUtilisateur = "6746bd30184dc7e1a8242fc7";
    }
    /**
     * Crée un rendez-vous
     * @param {object} rendezVous - Les informations du rendez-vous
     * @returns {Promise<RendezVous>} Le rendez-vous créé
     * @throws {object[]} - Liste des erreurs
     */
    async createRendezVous(rendezVous) {
        const url = "/rendez-vous/create";
        return this.#axios
            .post(url, { ...rendezVous, idCreateur: this.#idUtilisateur })
            .then(({ data: { message, data } }) => {
                console.log(message);
                return data;
            })
            .catch((error) => {
                if (error.response) {
                    throw error.response.data.errors;
                } else {
                    console.error(error);
                }
            });
    }

    /**
     * Met à jour un rendez-vous
     * @param {string} id - Identifiant du rendez-vous
     * @param {object} rendezVous - Les informations du rendez-vous
     * @returns {Promise<RendezVous>} Le rendez-vous mis à jour
     * @throws {object[]} - Liste des erreurs
     */
    async updateRendezVous(id, rendezVous) {
        const url = `/rendez-vous/${id}`;
        return this.#axios
            .put(url, rendezVous)
            .then(({ data: { message, data } }) => {
                console.log(message);
                return data;
            })
            .catch((error) => {
                if (error.response) {
                    throw error.response.data.errors;
                } else {
                    console.error(error);
                }
            });
    }

    /**
     * Récupère tous les rendez-vous dans un intervalle de temps donné
     * @param {Date} debut - Date de début de l'intervalle
     * @param {Date} fin - Date de fin de l'intervalle
     * @param idAgenda
     * @returns {Promise<RendezVous[]>} Les rendez-vous dans l'intervalle
     * @throws {object[]} - Liste des erreurs
     */
    async fetchRendezVousIntervalle(debut, fin, idAgenda = null) {
        const url = "/rendez-vous";
        return this.#axios
            .get(url, {
                params: {
                    debut: debut.toISOString(),
                    fin: fin.toISOString(),
                    idAgenda,
                },
            })
            .then(({ data: { message, data: liste } }) => {
                console.log(message);
                return liste;
            })
            .catch((error) => {
                if (error.response) {
                    throw error.response.data.errors;
                } else {
                    console.error(error);
                }
            });
    }

    async getRendezVous(id) {
        const url = `/rendez-vous/${id}`;
        return this.#axios
            .get(url)
            .then(({ data: { message, data } }) => {
                console.log(message);
                return data;
            })
            .catch((error) => {
                if (error.response) {
                    throw error.response.data.errors;
                } else {
                    console.error(error);
                }
            });
    }

    async deleteRendezVous(id) {
        const url = `/rendez-vous/${id}`;
        return this.#axios
            .delete(url)
            .then(({ data: { message, data } }) => {
                console.log(message);
                return data;
            })
            .catch((error) => {
                if (error.response) {
                    throw error.response.data.errors;
                } else {
                    console.error(error);
                }
            });
    }

    async getAgendasWithWritePermission() {
        const url = "/agenda";
        return this.#axios
            .get(url, {})
            .then(({ data: { message, data: liste } }) => {
                console.log(message);
                return liste;
            })
            .catch((error) => {
                if (error.response) {
                    throw error.response.data.errors;
                } else {
                    console.error(error);
                }
            });
    }

    async getAgendasWithReadPermission() {
        return this.getAgendasWithWritePermission();
    }
}

// Instance de la classe API
export { API };
export default new API("http://localhost:3000/api");
