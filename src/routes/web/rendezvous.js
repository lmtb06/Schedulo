import express from 'express';
import * as rendezvousController from '../../controllers/rendezvousController.js';

const router = express.Router();

router
    .get('/create', rendezvousController.getPageCreationRendezVous)
    .get('/:id', rendezvousController.getPageRendezVous);

export default router;