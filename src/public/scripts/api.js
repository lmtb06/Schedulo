class API {
    constructor(url) {
        this.url = url;
    }

    async creerRendezVous(rendezVous) {
        try {
            const url = `${this.url}/rendezvous/create`;
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(rendezVous),
            });
            if (!response.ok) {
                throw new Error(`Erreur HTTP : ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error("Erreur lors de la création du rendez-vous :", error);
            throw error;
        }
    }
}

// Instance de la classe API
export default new API(window.URL_API);
