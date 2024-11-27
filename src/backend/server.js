import env from "dotenv";
import { Application } from "./application.js";

/**
 *
 */
function startServer() {
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
                port: process.env.SERVER_PORT ?? 3000,
                host: process.env.SERVER_HOST ?? "localhost",
                env: process.env.SERVER_ENV,
            },
        };

        // Initialisation de l'Application
        const application = Application.getInstance();
        application
            .setup(config)
            .then(() => {
                return application.start();
            })
            .catch((error) => {
                console.error(
                    "Erreur lors de la configuration de l'application :",
                    error
                );
                process.exit(1);
            })
            .then(() => {
                // Récupération des composants nécessaires
                const logger = application.getLogger();

                // Gestion des signaux d'arrêt
                ["SIGINT", "SIGTERM"].forEach((signal) => {
                    process.on(signal, () => {
                        logger.debug("Signal d'arrêt reçu : %s", signal);
                        application.stop();
                    });
                });
                return;
            })
            .catch((error) => {
                console.error(
                    "Erreur lors de la configuration de l'application :\n%s",
                    error
                );
                process.exit(1);
            });
    } catch (error) {
        console.error("Erreur au démarrage du serveur:", error);
        process.exit(1);
    }
}

startServer();
