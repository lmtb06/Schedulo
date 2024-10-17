import express from 'express';
import * as rendezvousController from '../../controllers/rendezvousController.js';

const router = express.Router();

router
    .get('/', rendezvousController.getAllRendezVous)
    .post('/create', rendezvousController.createRendezVous)
    .get('/:id', rendezvousController.getRendezVous)
    .put('/:id', rendezvousController.updateRendezVous)
    .delete('/:id', rendezvousController.deleteRendezVous);

export default router;