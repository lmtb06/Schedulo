import createError from "http-errors";
import { rendezVousSchema } from "../validators/schemas/index.js";

// Middleware pour valider les données d'un rendez-vous dans le corps de la requête
const validateRendezVous =
    ({ validator = rendezVousSchema, generateError = createError } = {}) =>
    (request, res, next) => {
        const { error } = validator.validate(request.body, {
            abortEarly: false,
        });
        if (error) {
            // On génère une erreur 400 Bad Request avec les détails de la validation
            return next(
                generateError(400, {
                    message: "Validation des données échouée",
                    errors: error.details,
                })
            );
        }

        next();
    };

export { validateRendezVous };
