import { createServer } from 'http';
import { app } from './app.js';
import mongoose from 'mongoose';

startServer();

// Fonction principale pour démarrer le serveur
async function startServer() {
    try {
        console.log('Démarrage du serveur...');
        // Validation des variables d'environnement
        validateEnvVariables();

        const SERVER_PORT = process.env.SERVER_PORT || 3000;
        const SERVER_URL = process.env.SERVER_URL || 'http://localhost';

        // Rendre URL_API disponible globalement
        app.set('URL_API', `${SERVER_URL}:${SERVER_PORT}/api`);

        // Connexion à MongoDB
        await connectToDatabase();

        // Création du serveur HTTP
        const server = createServer(app);

        // Gestion de la fermeture du serveur proprement
        handleServerShutdown(server);

        // Démarrage du serveur
        server.listen(SERVER_PORT, () => {
            console.log(`Serveur lancé sur ${SERVER_URL}:${SERVER_PORT}`);
        });
    } catch (err) {
        console.error('Erreur au démarrage du serveur:', err);
        process.exit(1);
    }
}

// Connexion à MongoDB
async function connectToDatabase() {
    try {
        console.log('Connexion à MongoDB...');
        await mongoose.connect(getMongoURI());
        console.log('Connecté à MongoDB');
    } catch (err) {
        throw new Error(`Erreur de connexion à MongoDB: ${err.message}`);
    }
}

// Gestion de la fermeture du serveur et de la connexion MongoDB
function handleServerShutdown(server) {
    process.on('SIGINT', async () => {
        console.log('Fermeture du serveur...');
        try {
            await mongoose.connection.close();
            console.log('Connexion MongoDB fermée');
            server.close(() => {
                console.log('Serveur fermé');
                process.exit(0);
            });
        } catch (err) {
            console.error('Erreur lors de la fermeture du serveur:', err);
            process.exit(1);
        }
    });
}

// TODO Kill toutes les connexions en attente lors de la fermeture du serveur

// Obtenir l'URI MongoDB
function getMongoURI() {
    const { DB_URL, DB_NAME, DB_USER, DB_PASS } = process.env;
    if (DB_USER && DB_PASS) {
        return `mongodb://${DB_USER}:${DB_PASS}@${DB_URL}/${DB_NAME}`;
    }
    return `mongodb://${DB_URL}/${DB_NAME}`;
}

// Validation des variables d'environnement requises
function validateEnvVariables() {
    const requiredVars = ['DB_URL', 'DB_NAME'];
    requiredVars.forEach(v => {
        if (!process.env[v]) {
            throw new Error(`La variable d'environnement ${v} est manquante`);
        }
    });
}
