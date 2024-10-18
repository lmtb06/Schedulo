import { rendezVousSchema } from "../validators/rendezvousValidator.js";
import createError from "http-errors";

// Middleware pour valider les données d'un rendez-vous dans le corps de la requête
export default function validateRendezVous(req, res, next) {
    const { error } = rendezVousSchema.validate(req.body);
    if (error) {
        return next(createError(400, error.details[0].message));
    }
    next();
}