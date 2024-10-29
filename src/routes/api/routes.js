import express from 'express';
import agendaRouter from './agenda.js';
import rendezvousRouter from './rendezvous.js';
import utilisateurRouter from './utilisateur.js';
import createError from "http-errors";

const router = express.Router();

router
    .use('/rendezvous', rendezvousRouter)
    .use('/agendas', agendaRouter)
    .use('/compte', utilisateurRouter)
    .use((req, res, next) => next(createError(404)));

export default router;