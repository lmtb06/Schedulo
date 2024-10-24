import express from 'express';
import rendezvousController from '../../controllers/rendezvousController.js';
import { validateRendezVous } from '../../middlewares/rendezVous.js';

const router = express.Router();

router
    .get('/', rendezvousController.getAllRendezVous)
    .post('/create', validateRendezVous(), rendezvousController.createRendezVous)
    .get('/:id', rendezvousController.getRendezVous)
    .put('/:id', validateRendezVous(), rendezvousController.updateRendezVous)
    .delete('/:id', rendezvousController.deleteRendezVous);

export default router;