import mongoose from "mongoose";
import { UniteRepetition } from "../enums.js";

const repetitionMongooseSchema = new mongoose.Schema({
    intervalle: {
        type: Number,
        required: true,
    },
    unite: {
        type: String,
        enum: Object.values(UniteRepetition),
        required: true,
    },
    fin: {
        type: Date,
    },
    rendezVous: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "RendezVous",
        required: true,
    },
});
/**
 * @param {mongoose.Connection} connection
 * @returns {mongoose.Model}
 */
const getModel = (connection) => {
    return connection.model("Repetition", repetitionMongooseSchema);
};

export { getModel, repetitionMongooseSchema };
