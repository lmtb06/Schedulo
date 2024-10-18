import mongoose from "mongoose";

// Enumération des unités de répétition
export const UniteRepetition = {
    JOUR: "jour",
    SEMAINE: "semaine",
    MOIS: "mois",
    ANNEE: "année"
};

const repetitionSchema = new mongoose.Schema({
    intervalle: {
        type: Number,
        required: true
    },
    unite: {
        type: String,
        enum: Object.values(UniteRepetition),
        required: true
    },
    fin: {
        type: Date
    },
    rendezVous: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "RendezVous",
        required: true
    }
});

const Repetition = mongoose.model("Repetition", repetitionSchema);

export default Repetition;
