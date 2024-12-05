import api from "../utils/api.js";
import { Calendrier } from "../utils/calendrier.js";
import { ModalFactory } from "../utils/modal-factory.js";

document.addEventListener("DOMContentLoaded", () => {
    const calendrierElement = document.getElementById("calendrier-container");
    const modalFactory = new ModalFactory(api);
    const calendrier = new Calendrier(calendrierElement, modalFactory, api);
    calendrier.init();
    calendrier.show();
});
