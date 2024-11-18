import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import timeGridPlugin from "@fullcalendar/timegrid";

document.addEventListener("DOMContentLoaded", () => {
    const calendarElement = document.getElementById("calendar");

    const calendar = new Calendar(calendarElement, {
        plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
        initialView: "dayGridMonth",
        locale: "fr",
        headerToolbar: {
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,listWeek",
        },
        buttonText: {
            today: "Aujourd'hui",
            month: "Mois",
            week: "Semaine",
            day: "Jour",
            list: "Liste",
        },
        firstDay: 1,
        height: "auto",
        events(fetchInfo, successCallback, failureCallback) {
            fetch("/api/rendezvous")
                .then((response) => response.json())
                .then((data) => {
                    const events = data.data.map((rendezvous) => ({
                        id: rendezvous._id,
                        title: rendezvous.titre,
                        start: rendezvous.debut,
                        end: rendezvous.fin,
                        description: rendezvous.description,
                        url: `/rendezvous/${rendezvous._id}`,
                    }));
                    successCallback(events);
                })
                .catch((error) => {
                    console.error(
                        "Erreur lors de la récupération des rendez-vous :",
                        error
                    );
                    failureCallback(error);
                });
        },
        eventClick(info) {},
    });

    calendar.render();
});
