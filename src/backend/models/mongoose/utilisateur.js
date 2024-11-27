import mongoose from "mongoose";

const utilisateurSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
        },
        motDePasse: {
            type: String,
            required: true,
        },
        nom: {
            type: String,
            required: true,
        },
        prenom: {
            type: String,
            required: true,
        },
        dateCreation: {
            type: Date,
            required: true,
        },
    },
    {
        timestamps: true, // Ajoute automatiquement createdAt et updatedAt
    }
);

const Utilisateur = mongoose.model("Utilisateur", utilisateurSchema);

export default Utilisateur;
