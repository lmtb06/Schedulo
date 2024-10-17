import RendezVous from '../models/rendezvous.js';
import createError from "http-errors";

export const getAllRendezVous = async (req, res) => {
    try {
        const rendezvous = await RendezVous.getAll();
        res.render('rendezvous/index', {
            titrePage: 'Liste des rendez-vous',
            rendezvous: rendezvous.map(rdv => ({
                id: rdv.id,
                titre: rdv.titre,
                date: rdv.date,
                heure: rdv.heure,
                description: rdv.description
            }))
        });
    } catch (error) {
        console.error("Erreur lors de la récupération des rendez-vous :", error);
        res.status(500).send('Erreur lors de la récupération des rendez-vous.');
    }
};

export const createRendezVous = async (req, res) => {
    console.log('Création du rendez-vous :', req.body);
    const { titre, debut, fin, description } = req.body;

    const rendezvous = new RendezVous(titre, debut, fin, description);
    await rendezvous.save();
    res.status(201).send(rendezvous);
};

export const getRendezVous = async (req, res) => {

};

export const updateRendezVous = async (req, res) => {

};

export const deleteRendezVous = async (req, res) => {

};

export const getPageCreationRendezVous = (req, res) => {
    res.render('rendezvous/page', {
        titrePage: 'Créer un rendez-vous',
        headerContenu: 'Créer un rendez-vous',
    });
};

export const getPageRendezVous = async (req, res) => {
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