import express from 'express';
import * as pageController from '../../controllers/pageController.js';
import rendezvousRouter from './rendezvous.js';
import utilisateurRouter from './utilisateur.js';
import createError from "http-errors";

const router = express.Router();
router
    // On passe l'url de l'API à toutes les vues
    .use((req, res, next) => {
        res.locals.URL_API = req.app.get('URL_API');
        next();
    })
    // index
    .get('/', pageController.index)
    // rendez vous
    .use('/rendezvous', rendezvousRouter)
    // Compte.
    .use('/compte', utilisateurRouter)
    .use((req, res, next) => next(createError(404)));


export default router;