import API from "../api.js";

let elementFormulaireRendezVous = null;
let elementTitre = null;
let elementDescription = null;
let elementDateDebut = null;
let elementDateFin = null;
let elementHeureDebut = null;
let elementHeureFin = null;
let elementBoutonEnregistrer = null;


function recupererElementsPage() {
    elementFormulaireRendezVous = document.getElementById('formulaireRendezVous');
    elementTitre = elementFormulaireRendezVous.querySelector('input[name="titre"]');
    elementDescription = elementFormulaireRendezVous.querySelector('textarea[name="description"]');
    elementDateDebut = elementFormulaireRendezVous.querySelector('input[name="dateDebut"]');
    elementDateFin = elementFormulaireRendezVous.querySelector('input[name="dateFin"]');
    elementHeureDebut = elementFormulaireRendezVous.querySelector('input[name="heureDebut"]');
    elementHeureFin = elementFormulaireRendezVous.querySelector('input[name="heureFin"]');
    elementBoutonEnregistrer = elementFormulaireRendezVous.querySelector('button[type="submit"]');
}


function afficherTitre(titre) {
    if (titre !== undefined && titre !== null) {
        elementTitre.value = titre;
    }
}

function afficherDescription(description) {
    if (description !== undefined && description !== null) {
        elementDescription.value = description;
    }
}

function afficherDateDebut(dateDebut) {
    if (dateDebut !== undefined && dateDebut !== null) {
        elementDateDebut.value = dateDebut;
    }
}

function afficherDateFin(dateFin) {
    if (dateFin !== undefined && dateFin !== null) {
        elementDateFin.value = dateFin;
    }
}

function afficherHeureDebut(heureDebut) {
    if (heureDebut !== undefined && heureDebut !== null) {
        elementHeureDebut.value = heureDebut;
    }
}

function afficherHeureFin(heureFin) {
    if (heureFin !== undefined && heureFin !== null) {
        elementHeureFin.value = heureFin;
    }
}

function ajouterEcouteurCreation() {
    elementFormulaireRendezVous.addEventListener('submit', (event) => {
        event.preventDefault();
        const titre = elementTitre.value;
        const description = elementDescription.value;
        const dateDebut = elementDateDebut.value;
        const dateFin = elementDateFin.value;
        const heureDebut = elementHeureDebut.value;
        const heureFin = elementHeureFin.value;
        const rendezVous = {
            titre,
            debut: `${dateDebut}T${heureDebut}`,
            fin: `${dateFin}T${heureFin}`,
            description
        };
        // Envoi des données
        API.creerRendezVous(rendezVous)
            .then((result) => {
                console.log('Rendez-vous créé :', result);
                // window.location.href = '/';
            })
            .catch((error) => {
                console.error('Erreur lors de la création du rendez-vous :', error);
            });

    });
}

function ajouterEcouteurEdition() {

}

function initialiserFormulaireCreation() {
    elementBoutonEnregistrer.textContent = 'Créer';
    ajouterEcouteurCreation();
}

function initialiserFormulaireEdition() {
    elementBoutonEnregistrer.textContent = 'Enregistrer';
    afficherRendezVous(RENDEZVOUS);
    ajouterEcouteurEdition();
}

function afficherRendezVous(rendezVous) {
    const { titre, debut, fin, description } = rendezVous;
    const dateDebut = debut.split('T')[0];
    const dateFin = fin.split('T')[0];
    const heureDebut = debut.split('T')[1].split('Z')[0];
    const heureFin = fin.split('T')[1].split('Z')[0];
    afficherTitre(titre);
    afficherDateDebut(dateDebut);
    afficherHeureDebut(heureDebut);
    afficherDateFin(dateFin);
    afficherHeureFin(heureFin);
    afficherDescription(description);
}

function initPage() {
    recupererElementsPage();

    if (RENDEZVOUS !== undefined && RENDEZVOUS !== null) {
        initialiserFormulaireEdition();
    } else {
        initialiserFormulaireCreation();
        const rendezVous = {
            titre: "Test1",
            debut: "2021-10-10T10:00",
            fin: "2021-10-10T11:00",
            description: "Description du rendez-vous test1"
        };
        // Envoi des données
        API.creerRendezVous(rendezVous)
            .then((result) => {
                console.log('Réponse :', result);
                // window.location.href = '/';
            })
            .catch((error) => {
                console.error('Erreur lors de la création du rendez-vous :', error);
            });


    }
}

document.addEventListener('DOMContentLoaded', initPage);