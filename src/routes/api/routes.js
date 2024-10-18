import express from 'express';
import agendaRouter from './agenda.js';
import rendezvousRouter from './rendezvous.js';
import createError from "http-errors";

const router = express.Router();

router
    .use('/rendezvous', rendezvousRouter)
    .use('/agendas', agendaRouter)
    .use((req, res, next) => next(createError(404)));

export default router;