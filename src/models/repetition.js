import mongoose from "mongoose";
import { UniteRepetition } from "../utils/enums.js";

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
