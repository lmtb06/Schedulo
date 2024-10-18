import RendezVousService from "../services/rendezvousService.js";
import createError from "http-errors";

export const getAllRendezVous = async (req, res, next) => {
    try {
        // Récupération des critères de recherche
        const filtres = {};
        // Récupération des rendez-vous
        const rendezVous = await RendezVousService.getAllRendezVous(filtres);
        // Renvoi des rendez-vous
        res.json(rendezVous);
    }
    catch (error) {
        next(error);
    }
};

export const createRendezVous = async (req, res, next) => {
    // Récupération des informations du rendez-vous à créer
    const donneesRendezVous = req.body;
    // Création du rendez-vous
    try {
        const nouveauRendezVous = await RendezVousService.createRendezVous(donneesRendezVous);
        // Renvoi de la réponse
        res.status(201).json(nouveauRendezVous);
    }
    catch (error) {
        next(error);
    }
};

export const getRendezVous = async (req, res, next) => {
    // Récupération de l'identifiant du rendez-vous
    const id = req.params.id;
    try {
        // Récupération des informations du rendez-vous
        const rendezVous = await RendezVousService.getRendezVousById(id);
        // Renvoi des informations du rendez-vous
        res.json(rendezVous);
    }
    catch (error) {
        next(error);
    }
};

export const updateRendezVous = async (req, res, next) => {
    // Récupération de l'identifiant du rendez-vous
    const id = req.params.id;
    // Récupération des informations du rendez-vous à mettre à jour
    const nouvellesDonneesRendezVous = req.body;
    try {

        // Mise à jour du rendez-vous
        const rendezVous = await RendezVousService.updateRendezVous(id, nouvellesDonneesRendezVous);
        // Renvoi de la réponse
        res.json(rendezVous);
    }
    catch (error) {
        next(error);
    }

};

export const deleteRendezVous = async (req, res, next) => {
    // Récupération de l'identifiant du rendez-vous
    const id = req.params.id;
    try {
        // Suppression du rendez-vous et des répétitions associées
        const rendezVousSupprime = await RendezVousService.deleteRendezVous(id);
        // Renvoi de la réponse
        res.json(rendezVousSupprime);
    }
    catch (error) {
        next(error);
    }
};

export const getPageCreationRendezVous = (req, res) => {
    // TODO : Renvoyer la page de création ( à modifier )
    res.render('rendezvous/page', {
        titrePage: 'Créer un rendez-vous',
        headerContenu: 'Créer un rendez-vous',
    });
};

export const getPageRendezVous = async (req, res) => {
    // TODO : Renvoyer la page de détails ( à modifier )
    const id = req.params.id;
    res.render('rendezvous/page', {
        titrePage: 'Rendez-vous',
        headerContenu: 'Détails du rendez-vous',
        rendezVous: {
            id: id,
            titre: `Rendez-vous ${id}`,
            debut: '2021-10-10T10:00',
            fin: '2021-10-10T11:00',
            description: `Description du rendez-vous ${id}`
        }
    });
};