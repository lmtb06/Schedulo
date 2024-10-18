import RendezVous from "../models/rendezvous";
import createError from "http-errors";

class RendezVousService {

    async getAllRendezVous(filtres = {}) {
        return await RendezVous.find(filtres);
    }

    async createRendezVous(donneesRendezVous) {
        const nouveauRendezVous = new RendezVous(donneesRendezVous);
        return await nouveauRendezVous.save();
    }

    async getRendezVousById(id) {
        const rendezVous = await RendezVous.findById(id).populate('repetitions');
        if (!rendezVous) {
            throw createError(404, "Rendez-vous non trouvé");
        }
        return rendezVous;
    }

    async updateRendezVous(id, nouvellesDonneesRendezVous) {
        const rendezVous = await RendezVous.findByIdAndUpdate(id, nouvellesDonneesRendezVous, { new: true });
        if (!rendezVous) {
            throw createError(404, "Rendez-vous non trouvé");
        }
        return rendezVous;
    }

    async deleteRendezVous(id) {
        const rendezVousSupprime = await RendezVous.findByIdAndDelete(id);
        if (!rendezVousSupprime) {
            throw createError(404, "Rendez-vous non trouvé");
        }
        return rendezVousSupprime;
    }
}