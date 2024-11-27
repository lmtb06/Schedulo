import mongoose from "mongoose";

const rendezVousMongooseSchema = new mongoose.Schema(
    {
        idCreateur: {
            type: String,
            required: true,
        },
        idAgenda: {
            type: String,
            required: true,
        },
        debut: {
            type: Date,
            required: true,
        },
        fin: {
            type: Date,
            required: true,
        },
        titre: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        idRepetition: {
            type: String,
        },
    },
    {
        timestamps: true, // Ajoute automatiquement createdAt et updatedAt
    }
);

/**
 * @param {mongoose.Connection} connection
 * @returns {mongoose.Model}
 */
const getModel = (connection) => {
    return connection.model("RendezVous", rendezVousMongooseSchema);
};

export { getModel, rendezVousMongooseSchema };
