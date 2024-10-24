import { createLogger, format, transports, addColors } from 'winston';
import { Environnement } from './utils/enums.js';

const { combine, timestamp, printf, colorize, errors, splat, json, align } = format;

const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'blue',
};

// Format personnalisé pour la console
const consoleFormat = combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    colorize(),
    errors({ stack: true }),
    splat(),
    printf(({ timestamp, level, message, stack }) => {
        return stack
        ? `[${timestamp}] ${level}: ${message} - ${stack}`
        : `[${timestamp}] ${level}: ${message}`;
    }),
    align(),
);

// Format personnalisé pour les fichiers (JSON)
const fileFormat = combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    errors({ stack: true }),
    splat(),
    json()
);

// Création de l'instance du logger
const logger = createLogger({
    level: process.env.SERVER_ENV === Environnement.DEVELOPMENT ? 'debug' : 'info',
    format: combine(
        timestamp(),
        errors({ stack: true }),
        splat(),
    ),
    transports: [
        // Transport pour la console
        new transports.Console({
            format: consoleFormat,
            handleExceptions: true,
        }),
        // Transport pour les erreurs
        new transports.File({
            filename: 'logs/error.log',
            level: 'error',
            format: fileFormat,
            handleExceptions: true,
        }),
        // Transport pour tous les logs
        new transports.File({
            filename: 'logs/combined.log',
            format: fileFormat,
        }),
    ],
    exitOnError: false,
});

addColors(colors);

export default logger;
