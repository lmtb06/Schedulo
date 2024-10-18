import RendezVousService from "../services/rendezvousService.js";
import createError from "http-errors";

export const getAllRendezVous = async (req, res, next) => {
    try {
        // Récupération des critères de recherche et validation
        const filtres = {};
        // Récupération des rendez-vous
        const rendezVous = await RendezVousService.getAll(filtres);
        // Renvoi des rendez-vous
        res.json(rendezVous);
    }
    catch (error) {
        next(error);
    }
};

export const createRendezVous = async (req, res) => {
    // Récupération des informations du rendez-vous à créer

    // Validation des informations du rendez-vous

    // Création du rendez-vous

    // Renvoi de la réponse
};

export const getRendezVous = async (req, res) => {
    // Récupération de l'identifiant du rendez-vous

    // Récupération des informations du rendez-vous

    // Renvoi des informations du rendez-vous
};

export const updateRendezVous = async (req, res) => {
    // Récupération de l'identifiant du rendez-vous

    // Récupération des informations du rendez-vous à mettre à jour

    // Validation des informations du rendez-vous

    // Mise à jour du rendez-vous

    // Renvoi de la réponse

};

export const deleteRendezVous = async (req, res) => {
    // Récupération de l'identifiant du rendez-vous

    // Suppression du rendez-vous et des répétitions associées

    // Renvoi de la réponse
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