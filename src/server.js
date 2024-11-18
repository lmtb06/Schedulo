import env from "dotenv";
import { createServer } from "http";
import { Application } from "./app/application.js";
/**
 * Démarre le serveur avec l'ApplicationFactory.
 * @async
 * @returns {Promise<void>}
 */
async function startServer() {
    // Chargement des variables d'environnement
    env.config();
    try {
        // Configuration globale de l'application
        const config = {
            database: {
                uri: process.env.DB_URI,
                name: process.env.DB_NAME,
                host: process.env.DB_HOST,
                port: process.env.DB_PORT,
                user: process.env.DB_USER,
                password: process.env.DB_PASS,
            },
            server: {
                port: process.env.SERVER_PORT,
                url: process.env.SERVER_URL,
                env: process.env.SERVER_ENV,
            },
        };

        // Initialisation de l'Application
        const application = Application.getInstance();
        await application.setup(config);
        await application.start();

        // // Récupération des composants nécessaires
        const logger = application.getLogger();
        const app = application.getExpressApp();

        // // Création et démarrage du serveur HTTP
        const server = createServer(app).listen(config.server.port, () => {
            logger.info(
                `Serveur lancé sur ${config.server.url}:${config.server.port}`
            );
        });

        let enCoursDeFermeture = false;
        /**
         * Gestion de l'arrêt du serveur.
         * @async
         */
        const shutdown = async () => {
            if (enCoursDeFermeture) {
                return;
            }
            try {
                logger.info("Arrêt du serveur...");
                enCoursDeFermeture = true;
                await server.close(() => {
                    logger.info(
                        "Toutes les connexions au serveur ont été fermées"
                    );
                });
                await application.stop();
                logger.info("Serveur arrêté");
                process.exit(0);
            } catch (error) {
                logger.error("Erreur lors de l'arrêt du serveur:", error);
                process.exit(1);
            }
        };

        // Gestion des signaux d'arrêt
        ["SIGINT", "SIGTERM"].forEach((signal) => {
            process.on(signal, shutdown);
        });
    } catch (error) {
        console.error("Erreur au démarrage du serveur:", error);
        process.exit(1);
    }
}

await startServer();
