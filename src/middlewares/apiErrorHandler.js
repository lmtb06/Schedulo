import { Environnement } from '../utils/enums.js';
import { renderApiErrorResponse } from '../utils/renderUtils.js';

// Middleware pour gérer les erreurs des API
const apiErrorHandler = ({
  env = process.env.SERVER_ENV,
  defaultStatusCode = 500,
  defaultMessage = 'Erreur interne du serveur',
  render = renderApiErrorResponse,
} = {}) => {
  return async (error, req, res, next) => {
    if (req.accepts('json')) {
      const errorDetails = {
        status: error.status || defaultStatusCode,
        message: error.message || defaultMessage,
        errors: error.errors || [], // Tableau des erreurs spécifiques, comme les erreurs de validation
        stack: env === Environnement.PRODUCTION ? undefined : error.stack, // On masque la stack en production
      };

      // Gére le rendu de l'erreur, qu'il soit synchrone ou asynchrone
      await Promise.resolve(render(res, errorDetails));
    } else {
      next(error);
    }
  };
};

export default apiErrorHandler;
