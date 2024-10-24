import RendezVousService from '../services/rendezvousService.js';
import { renderApiSuccessResponse } from '../utils/renderUtils.js';
import createError from 'http-errors';
export class RendezVousController {
  constructor({
    rendezVousService = RendezVousService,
    httpErrorCreate = createError,
    renderApiResponse = renderApiSuccessResponse,
    renderWebPage,
  } = {}) {
    this.rendezVousService = rendezVousService;
    this.renderApiResponse = renderApiResponse;
    this.httpErrorCreate = httpErrorCreate;
  }

  getAllRendezVous = async (req, res, next) => {
    try {
      const filtres = req.query || {};
      const rendezVous = await this.rendezVousService.getAllRendezVous(filtres);
      this.renderApiResponse(res, {
        status: 200,
        message: 'Liste des rendez-vous',
        data: rendezVous,
      });
    } catch (error) {
      next(
        this.httpErrorCreate(
          500,
          'Erreur lors de la récupération des rendez-vous',
        ),
      );
    }
  };

  createRendezVous = async (req, res, next) => {
    const donneesRendezVous = req.body;
    try {
      const nouveauRendezVous = await this.rendezVousService.createRendezVous(
        donneesRendezVous,
      );
      this.renderApiResponse(res, {
        status: 201,
        message: 'Rendez-vous créé',
        data: nouveauRendezVous,
      });
    } catch (error) {
      next(
        this.httpErrorCreate(400, 'Erreur lors de la création du rendez-vous'),
      );
    }
  };

  getRendezVous = async (req, res, next) => {
    const id = req.params.id;
    try {
      const rendezVous = await this.rendezVousService.getRendezVousById(id);
      if (!rendezVous) {
        next(this.httpErrorCreate(404, 'Rendez-vous non trouvé'));
      }
      this.renderApiResponse(res, {
        status: 200,
        message: 'Rendez-vous trouvé',
        data: rendezVous,
      });
    } catch (error) {
      next(
        this.httpErrorCreate(
          500,
          'Erreur lors de la récupération du rendez-vous',
        ),
      );
    }
  };

  updateRendezVous = async (req, res, next) => {
    const id = req.params.id;
    const nouvellesDonneesRendezVous = req.body;
    try {
      const rendezVous = await this.rendezVousService.updateRendezVous(
        id,
        nouvellesDonneesRendezVous,
      );
      if (!rendezVous) {
        next(this.httpErrorCreate(404, 'Rendez-vous non trouvé'));
      }
      this.renderApiResponse(res, {
        status: 200,
        message: 'Rendez-vous modifié',
        data: rendezVous,
      });
    } catch (error) {
      next(
        this.httpErrorCreate(
          400,
          'Erreur lors de la mise à jour du rendez-vous',
        ),
      );
    }
  };

  deleteRendezVous = async (req, res, next) => {
    const id = req.params.id;
    try {
      const rendezVousSupprime = await this.rendezVousService.deleteRendezVous(
        id,
      );
      if (!rendezVousSupprime) {
        next(this.httpErrorCreate(404, 'Rendez-vous non trouvé'));
      }
      this.renderApiResponse(res, {
        status: 200,
        message: 'Rendez-vous supprimé',
        data: rendezVousSupprime,
      });
    } catch (error) {
      next(
        this.httpErrorCreate(
          500,
          'Erreur lors de la suppression du rendez-vous',
        ),
      );
    }
  };

  getPageCreationRendezVous = (req, res) => {
    // TODO : Renvoyer la page de création ( à modifier )
    res.redirect('/'); // Redirection vers la page d'accueil
  };

  getPageRendezVous = async (req, res) => {
    // TODO : Renvoyer la page de détails ( à modifier )
    res.redirect('/'); // Redirection vers la page d'accueil
  };
}

export default new RendezVousController();
