import RendezVous from "../models/rendezvous.js";
import Repetition from "../models/repetition.js";

export class RendezVousService {

    constructor({
        rendezVousModel = RendezVous,
        repetitionModel = Repetition,
    } = {}) {
        this.rendezVousModel = rendezVousModel;
        this.repetitionModel = repetitionModel;
    }

    async getAllRendezVous(filtres = {}) {
        return await this.rendezVousModel.find(filtres).populate('repetitions'); 
    }

    async createRendezVous(donneesRendezVous) {
        const nouveauRendezVous = new this.rendezVousModel(donneesRendezVous);
        return await nouveauRendezVous.save();
    }

    async getRendezVousById(id) {
        return  await this.rendezVousModel.findById(id).populate('repetitions');
    }

    async updateRendezVous(id, nouvellesDonneesRendezVous) {
        return await this.rendezVousModel.findByIdAndUpdate(id, nouvellesDonneesRendezVous, { new: true });
    }

    async deleteRendezVous(id) {
        return await this.rendezVousModel.findByIdAndDelete(id);
    }
}

export default new RendezVousService();
