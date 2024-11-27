import api from "../utils/api.js";
import { CalendrierAPI } from "../utils/calendrier.js";
import { RendezVousModalAPI } from "../utils/rendez-vous-modal.js";

document.addEventListener("DOMContentLoaded", () => {
    const calendrierElement = document.getElementById("calendrier-container");
    const calendrier = new CalendrierAPI(
        calendrierElement,
        RendezVousModalAPI,
        api
    );

    calendrier.init();
    calendrier.show();
});
