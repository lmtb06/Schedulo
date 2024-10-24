import rendezVousValidator from "../validators/rendezVous.js";
import createError from "http-errors";

// Middleware pour valider les données d'un rendez-vous dans le corps de la requête
const validateRendezVous = ({
    validator = rendezVousValidator,
    generateError = createError
} = {}) => {
    return (req, res, next) => {
        const { error } = validator.validate(req.body, { abortEarly: false });
        if (error) {
            // On génère une erreur 400 Bad Request avec les détails de la validation
            return next(generateError(400, {
                message: "Validation des données échouée",
                errors: error.details
            }));
        }
        next();
    }
};

export { validateRendezVous };