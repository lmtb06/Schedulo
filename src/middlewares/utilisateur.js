import createError from "http-errors";
import { utilisateurSchema } from "../validators/schemas/utilisateur-schema.js";

// Middlewares qui vérifie que l'utilisateur est déjà connecté.
/**
 *
 * @param request
 * @param res
 * @param next
 */
export function estConnecte(request, res, next) {
    if (res.locals.user) {
        next();
    } else {
        res.redirect("/");
    }
}

// Middlewares qui vérifie que l'utilisateur ne soit pas connecté.
/**
 *
 * @param request
 * @param res
 * @param next
 */
export function estPasConnecte(request, res, next) {
    if (res.locals.user) {
        res.redirect("/");
    } else {
        next();
    }
}

// Middlewares pour valider les données d'un utilisateur.
const validateUtilisateur =
    ({ validator = utilisateurSchema, generateError = createError } = {}) =>
    (request, res, next) => {
        const { error } = validator.validate(request.body, {
            abortEarly: false,
        });
        if (error) {
            return next(
                generateError(400, {
                    message: "Validation des données échouée",
                    errors: error.details,
                })
            );
        }

        next();
    };

export { validateUtilisateur };
