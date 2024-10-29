import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';
import morgan from 'morgan';
import logger from './logger.js';
import envVariablesValidator from './validators/envVariables.js';
import routerAPI from './routes/api/routes.js';
import routerWeb from './routes/web/routes.js';
import errorLogger from './middlewares/errorLogger.js';
import apiErrorHandler from './middlewares/apiErrorHandler.js';
import webErrorHandler from './middlewares/webErrorHandler.js';
import cookieParser from "cookie-parser";
import { authenticate } from "./utils/authentication.js";

export const app = express();

// Validation des variables d'environnement requises et optionnelles
validateEnvVariables();

// Détermination du répertoire courant
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration de l'application Express
app
  // Configuration du moteur de vue EJS
  .set('view engine', 'ejs')
  .set('views', path.join(__dirname, 'views'))
  .set('layout', 'template')
  .use(expressLayouts)

  // Servir les fichiers statiques
  .use(express.static(path.join(__dirname, 'public')))
  .use('/fullcalendar', express.static(path.join(__dirname, 'node_modules/@fullcalendar')))

  // Middleware pour les logs des requêtes HTTP
  .use(morgan('dev', {
    stream: {
      write: (message) => logger.http(message.trim()),
    },
  }))

  // Middleware pour parser le corps des requêtes
  .use(express.json())
  .use(express.urlencoded({ extended: false }))

  // Middlewares pour la connexion.
    .use(authenticate)
  .use(cookieParser())

  // Routes
  .use('/api', routerAPI)
  .use('/', routerWeb)

  // Middleware pour gérer les erreurs
  .use(errorLogger({ logger }))
  .use('/api', apiErrorHandler())
  .use('/',webErrorHandler());

// Fonction de validation des variables d'environnement
function validateEnvVariables() {
  const { error, value } = envVariablesValidator.validate(process.env, { abortEarly: false });

  if (error) {
    const errorMessages = error.details.map(err => `- ${err.message}`).join('\n');
    throw new Error(`Erreur de validation des variables d'environnement :\n${errorMessages}`);
  }

  // Mise à jour de process.env avec les valeurs validées si nécessaire
  Object.assign(process.env, value);
}
