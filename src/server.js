import { createServer } from 'http';
import { app } from './app.js';
import logger from './logger.js';
import mongoose from 'mongoose';

async function startServer() {
    try {
        logger.info('Démarrage du serveur...');

        const { SERVER_URL, SERVER_PORT } = process.env;
        app.set('URL_API', `${SERVER_URL}:${SERVER_PORT}/api`);

        // Connexion à MongoDB
        await mongoose.connect(getMongoURI());
        logger.info('Connecté à MongoDB');

        // Création et démarrage du serveur HTTP
        const server = createServer(app).listen(SERVER_PORT, () => {
            logger.info(`Serveur lancé sur ${SERVER_URL}:${SERVER_PORT}`);
        });

        // Gestion de la fermeture du serveur
        process.on('SIGINT', () => shutdown(server));
        process.on('SIGTERM', () => shutdown(server));

    } catch (err) {
        logger.error('Erreur au démarrage du serveur:', err);
        process.exit(1);
    }
}

function getMongoURI() {
    const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS } = process.env;
    const credentials = DB_USER && DB_PASS ? `${DB_USER}:${DB_PASS}@` : '';
    return `mongodb://${credentials}${DB_HOST}:${DB_PORT}/${DB_NAME}`;
}

async function shutdown(server) {
    logger.info('Fermeture du serveur...');
    try {
        await mongoose.connection.close();
        logger.info('Connexion MongoDB fermée');

        server.close(() => {
            logger.info('Serveur fermé');
            process.exit(0);
        });
    } catch (err) {
        logger.error('Erreur lors de la fermeture du serveur:', err);
        process.exit(1);
    }
}

startServer();