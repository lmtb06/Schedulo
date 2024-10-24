document.addEventListener('DOMContentLoaded', function () {
    const calendarEl = document.getElementById('calendar');

    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'timeGridWeek',
        locale: 'fr',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        events: function (fetchInfo, successCallback, failureCallback) {
            fetch('/api/rendezvous')
                .then(response => response.json())
                .then(data => {
                    const events = data.data.map(rendezvous => ({
                        id: rendezvous._id,
                        title: rendezvous.titre,
                        start: rendezvous.debut,
                        end: rendezvous.fin,
                        description: rendezvous.description,
                        url: '/rendezvous/' + rendezvous._id,
                    }));
                    successCallback(events);
                })
                .catch(error => {
                    console.error('Erreur lors de la récupération des rendez-vous :', error);
                    failureCallback(error);
                });
        },
        eventClick: function (info) {
            
        }
    });

    calendar.render();
});