import { Calendar } from "@fullcalendar/core";
import allLocales from "@fullcalendar/core/locales-all";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import multiMonth from "@fullcalendar/multimonth";
import timeGridPlugin from "@fullcalendar/timegrid";

import { API } from "./api.js";
import { RendezVousModal } from "./rendez-vous-modal.js";
class Calendrier {
    /**
     * @type {RendezVousModal}
     * @private
     */
    _rdvModal;
    /**
     * @type {Calendar}
     * @private
     */
    _calendar;
    /**
     *
     * @param {HTMLElement} element
     * @param {RendezVousModal} RdvModalClass
     */
    constructor(element, RdvModalClass) {
        const calendarElement = element.querySelector(".calendar");
        const rdvModalElement = element.querySelector(".rdv-modal");
        if (!calendarElement || !rdvModalElement) {
            throw new Error(
                "Element %s non trouvé",
                calendarElement ? "rdv-modal" : "calendar"
            );
        }
        this._calendar = new Calendar(calendarElement, {
            initialView: "timeGridWeek",
            plugins: [
                dayGridPlugin,
                timeGridPlugin,
                listPlugin,
                interactionPlugin,
                multiMonth,
            ],
            headerToolbar: {
                left: "prev,next today",
                center: "title",
                right: "multiMonthYear,dayGridMonth,timeGridWeek,timeGridDay,listWeek",
            },
            height: "auto",
            handleWindowResize: true,
            // eventDisplay: "block",
            eventTimeFormat: {
                hour: "2-digit",
                minute: "2-digit",
                meridiem: true,
            },
            events: [],
            editable: true,
            dayMaxEvents: 3,
            weekNumbers: true,
            navLinks: true,
            firstDay: 1,
            locales: allLocales,
            locale: "fr",
        });
        this._rdvModal = new RdvModalClass(rdvModalElement);
    }
    _addEventSources() {
        // this._calendar.addEventSource(() => {});
    }
    _addListeners() {
        this._calendar.on("dateClick", (dateInfo) => {
            const debut = dateInfo.date;
            const fin = new Date(debut);
            fin.setHours(debut.getHours() + 1);
            this._rdvModal.show(
                {
                    debut,
                    fin,
                },
                "create"
            );
        });
        this._calendar.on("eventClick", (eventInfo) => {
            this._rdvModal.show(
                {
                    ...eventInfo.event.extendedProps,
                    id: eventInfo.event.id,
                    debut: eventInfo.event.start,
                    fin: eventInfo.event.end,
                },
                "update"
            );
        });
    }
    init() {
        this._addEventSources();
        this._addListeners();
        this._rdvModal.setSuccessCallback((rendezVous) => {
            this._calendar.refetchEvents();
        });
        this._rdvModal.init();
    }

    show() {
        this._calendar.render();
    }
}

class CalendrierAPI extends Calendrier {
    /**
     * @type {API}
     * @private
     */
    _api;
    constructor(element, RdvModalClass, api) {
        super(element, RdvModalClass);
        this._api = api;
    }

    _addEventSources() {
        super._addEventSources();

        const eventDataTransform = (rdv) => {
            const event = {
                id: rdv.id,
                title: rdv.titre,
                start: rdv.debut,
                end: rdv.fin,
            };
            return event;
        };
        const events = (info, successCallback, failureCallback) => {
            this._api
                .fetchRendezVousIntervalle(info.start, info.end)
                .then((listeRendezVous) => {
                    successCallback(listeRendezVous);
                    return listeRendezVous;
                })
                .catch((error) => {
                    failureCallback(error);
                });
        };

        const eventSource = {
            events,
            eventDataTransform,
        };
        this._calendar.addEventSource(eventSource);
    }

    _addListeners() {
        super._addListeners();
        this._calendar.on("eventChange", (eventInfo) => {
            const rdv = {
                id: eventInfo.event.id,
                debut: eventInfo.event.start,
                fin: eventInfo.event.end,
            };
            this._api
                .updateRendezVous(rdv.id, rdv)
                .then((rendezVous) => {
                    console.log(rendezVous);
                    return rendezVous;
                })
                .catch((error) => {
                    console.error(
                        "Erreur lors de la mise à jour du rendez-vous :",
                        error
                    );
                    eventInfo.revert();
                });
        });
    }
}

export { Calendrier, CalendrierAPI };
