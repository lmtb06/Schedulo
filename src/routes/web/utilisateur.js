import express from 'express';
import utilisateurController from '../../controllers/utilisateurController.js';
import { estPasConnecte, estConnecte } from '../../middlewares/utilisateur.js';

const router = express.Router();

router
    .get('/create', estPasConnecte, utilisateurController.getPageInscription);

export default router;