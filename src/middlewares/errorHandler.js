import { promises as fs } from 'fs';
import path from 'path';

const apiErrorHandler = (err, req, res, next) => {
    const statusCode = err.status || 500;
    const message = err.message || 'Erreur interne du serveur';
    res.status(statusCode).json({
        message: message,
        stack: process.env.NODE_ENV === 'production' ? {} : err.stack // On ne renvoie pas la stack en production
    });
}

const webErrorHandler = async (err, req, res, next) => {
    const statusCode = err.status || 500;
    const message = err.message || 'Erreur interne du serveur';
    const errorFile = `${statusCode}.ejs`; // Nom du fichier d'erreur correspondant au code d'erreur

    // Regarde s'il y a un fichier d'erreur correspondant au code d'erreur, sinon utilise la page par défaut

    const viewsPath = req.app.get('views');
    const errorFilePath = path.join(viewsPath, 'errors', errorFile); // Chemin complet du fichier d'erreur

    const donneesPage = {
        titrePage: `Erreur ${statusCode}`,
        titre: `Erreur ${statusCode}`,
        message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : {}
    };

    try {
        // Vérifier si le fichier d'erreur correspondant existe
        await fs.access(errorFilePath);

        // Si le fichier existe, rendre la vue spécifique
        res.status(statusCode).render(`errors/${statusCode}`, donneesPage);
    } catch (e) {
        // Si le fichier n'existe pas, on utilise la vue par défaut
        res.status(statusCode).render('errors/default', donneesPage);
    }

}

export { apiErrorHandler, webErrorHandler };