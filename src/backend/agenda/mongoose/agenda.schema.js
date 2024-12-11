import mongoose from "mongoose";

const agendaMongooseSchema = new mongoose.Schema(
    {
        idCreateur: {
            type: String,
            required: true,
        },
        titre: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        couleur: {
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
    return connection.model("Agenda", agendaMongooseSchema);
};

export { getModel, agendaMongooseSchema };
