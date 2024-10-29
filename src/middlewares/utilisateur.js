import utilisateurValidator from "../validators/utilisateur.js";
import createError from "http-errors";

// Middlewares qui vérifie que l'utilisateur est déjà connecté.
export function estConnecte(req, res, next){

    if(res.locals.user){

        next();
    }
    else{

        res.redirect('/');
    }
}

// Middlewares qui vérifie que l'utilisateur ne soit pas connecté.
export function estPasConnecte(req, res, next){

    if(!res.locals.user){

        next();
    }
    else{

        res.redirect('/');
    }
}

// Middlewares pour valider les données d'un utilisateur.
const validateUtilisateur = ({
    validator = utilisateurValidator,
    generateError = createError
} ={}) => {
    return (req, res, next) => {
        const { error } = validator.validate(req.body, { abortEarly: false });
        if (error) {
            return next(generateError(400, {
                message: "Validation des données échouée",
                errors: error.details
            }));
        }
        next();
    }
}

export {validateUtilisateur};
