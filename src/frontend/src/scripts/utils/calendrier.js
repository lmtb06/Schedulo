import { Calendar } from "@fullcalendar/core";
import allLocales from "@fullcalendar/core/locales-all";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import multiMonth from "@fullcalendar/multimonth";
import timeGridPlugin from "@fullcalendar/timegrid";

import { API } from "./api.js";
import { CreateRendezVousModal } from "./create-rdv-modal.js";
import { EditRendezVousModal } from "./edit-rdv-modal.js";
import { ModalFactory } from "./modal-factory.js";

class Calendrier {
    /**
     * @type {API}
     * @private
     */
    _api;
    /**
     * @type {CreateRendezVousModal}
     * @protected
     */
    _createRdvModal;

    /**
     * @type {EditRendezVousModal}
     * @protected
     */
    _editRdvModal;
    /**
     * @type {Calendar}
     * @private
     */
    _calendar;
    /**
     *
     * @param {HTMLElement} element
     * @param {ModalFactory} modalFactory
     * @param {API} api
     */
    constructor(element, modalFactory, api) {
        const calendarElement = element.querySelector(".calendar");
        const createRdvModalElement =
            element.querySelector(".create-rdv-modal");
        const editRdvModalElement = element.querySelector(".edit-rdv-modal");
        if (
            !calendarElement ||
            !createRdvModalElement ||
            !editRdvModalElement
        ) {
            throw new Error(
                "Element %s non trouvé",
                calendarElement
                    ? editRdvModalElement
                        ? "create-rdv-modal"
                        : "edit-rdv-modal"
                    : "calendar"
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

        this._createRdvModal = modalFactory.getCreateRendezvousModal(
            createRdvModalElement
        );
        this._editRdvModal =
            modalFactory.getEditRendezvousModal(editRdvModalElement);
        this._api = api;
    }

    _addEventSources() {
        const eventDataTransform = (rdv) => {
            const event = {
                id: rdv.id,
                title: rdv.titre,
                start: rdv.debut,
                end: rdv.fin,
            };
            return event;
        };
        this._api
            .getAgendasWithReadPermission()
            .then((agendas) => {
                agendas.forEach((agenda) => {
                    this._calendar.addEventSource({
                        id: agenda.id,
                        color: agenda.couleur,
                        events: (info, successCallback, failureCallback) => {
                            this._api
                                .fetchRendezVousIntervalle(
                                    info.start,
                                    info.end,
                                    agenda.id
                                )
                                .then((listeRendezVous) => {
                                    successCallback(listeRendezVous);
                                    return listeRendezVous;
                                })
                                .catch((error) => {
                                    failureCallback(error);
                                });
                        },
                        eventDataTransform,
                    });
                });
                return;
            })
            .catch((errors) => {
                console.error(
                    "Erreur lors de la récupération des agendas :",
                    errors
                );
            });
    }

    _addListeners() {
        this._calendar.on("dateClick", (dateInfo) => {
            const debut = dateInfo.date;
            const fin = new Date(debut);
            fin.setHours(debut.getHours() + 1);
            this._createRdvModal.init();
            this._createRdvModal.prefill({
                debut,
                fin,
            });
            this._createRdvModal.show();
        });

        this._calendar.on("eventClick", (eventInfo) => {
            this._editRdvModal.init();
            this._editRdvModal.prefill({
                ...eventInfo.event.extendedProps,
                id: eventInfo.event.id,
                debut: eventInfo.event.start,
                fin: eventInfo.event.end,
            });
            this._editRdvModal.show();
        });

        this._calendar.on("eventChange", (eventInfo) => {
            const rdv = {
                id: eventInfo.event.id,
                debut: eventInfo.event.start,
                fin: eventInfo.event.end,
            };
            this._api
                .updateRendezVous(rdv.id, rdv)
                .then((rendezVous) => {
                    return rendezVous;
                })
                .catch((error) => {
                    alert("Erreur lors de la mise à jour du rendez-vous");
                    eventInfo.revert();
                });
        });

        this._createRdvModal.onCreationSuccess((rendezVous) => {
            this._calendar.getEventSourceById(rendezVous.idAgenda).refetch();
        });

        this._editRdvModal.onUpdateSuccess((rendezVous) => {
            this._calendar.refetchEvents();
        });

        this._editRdvModal.onDeleteSuccess((rendezVous) => {
            this._calendar.getEventSourceById(rendezVous.idAgenda).refetch();
        });
    }

    init() {
        this._addEventSources();
        this._addListeners();
    }

    show() {
        this._calendar.render();
    }
}

export { Calendrier };
