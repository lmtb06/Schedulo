import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import path from 'path';
import { fileURLToPath } from 'url';
import routerAPI from './routes/api/routes.js';
import routerWeb from './routes/web/routes.js';
import createError from "http-errors";
import dotenv from "dotenv";
import morgan from "morgan";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const app = express();

// Configuration du moteur de vue EJS
app
    // Configuration du moteur de vue EJS
    .set('view engine', 'ejs')
    .set('views', path.join(__dirname, 'views'))
    .set('layout', 'templates/siteLayout')
    .use(expressLayouts)

    // Servir les fichiers statiques
    .use(express.static(path.join(__dirname, 'public')))
    // servir les fichiers de FullCalendar
    .use('/fullcalendar', express.static('node_modules/@fullcalendar'))

    // Middleware pour les logs
    .use(morgan("dev"))

    // Middleware pour parser le corps des requêtes
    .use(express.urlencoded({ extended: false }))
    .use(express.json())

    // Routes
    .use('/api', routerAPI)
    .use('/', routerWeb);