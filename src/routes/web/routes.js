import express from 'express';
import * as pageController from '../../controllers/pageController.js';
import rendezvousRouter from './rendezvous.js';
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
    .use((req, res, next) => next(createError(404)));

router.use((err, req, res, next) => {
    console.error(err);

    res.render('templates/errorPage', {
        titrePage: 'Erreur ' + err.status,
        messageErreur: err.message,
        codeErreur: err.status
    });
});

export default router;