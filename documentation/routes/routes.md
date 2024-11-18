# Routes de l'application
## Pages
### Rendez-vous
- `rendezvous/create` : Page de création d'un rendez-vous
- `rendezvous/{id}` : Page de détails d'un rendez-vous
- 
## API
### Authentification

- `POST /api/auth/login` : Connexion de l'utilisateur
- `POST /api/auth/logout` : Déconnexion de l'utilisateur
- `POST /api/auth/refresh` : Rafraîchir le token d'authentification

### Comptes

- `GET /api/comptes` : Récupérer la liste des comptes
- `POST /api/comptes` : Créer un nouveau compte
- `GET /api/comptes/{id}` : Récupérer les détails d'un compte spécifique
- `PUT /api/comptes/{id}` : Mettre à jour un compte
- `DELETE /api/comptes/{id}` : Supprimer un compte

### Agendas

- `GET /api/agendas` : Récupérer la liste des agendas de l'utilisateur connecté
- `POST /api/agendas` : Créer un nouvel agenda
- `GET /api/agendas/{id}` : Récupérer les détails d'un agenda spécifique
- `PUT /api/agendas/{id}` : Mettre à jour un agenda
- `DELETE /api/agendas/{id}` : Supprimer un agenda

### Rendez-vous

- `GET /api/rendezvous` : Récupérer tous les rendez-vous qui satisfassent les critères de recherche
- `POST /api/rendezvous` : Créer un nouveau rendez-vous dans un agenda
- `GET /api/rendezvous/{id}` : Récupérer les détails d'un rendez-vous spécifique
- `PUT /api/rendezvous/{id}` : Mettre à jour un rendez-vous
- `DELETE /api/rendezvous/{id}` : Supprimer un rendez-vous



### Répétitions

- `GET /api/agendas/{agendaId}/rendezvous/{rendezvousId}/repetitions` : Récupérer les répétitions d'un rendez-vous
- `POST /api/agendas/{agendaId}/rendezvous/{rendezvousId}/repetitions` : Ajouter une répétition à un rendez-vous
- `PUT /api/agendas/{agendaId}/rendezvous/{rendezvousId}/repetitions/{id}` : Modifier une répétition
- `DELETE /api/agendas/{agendaId}/rendezvous/{rendezvousId}/repetitions/{id}` : Supprimer une répétition

### Routes pour administrateurs

- `GET /api/comptes/{id}/agendas` : Récupérer tous les agendas d'un compte spécifique
- `GET /api/comptes/{id}/rendezvous` : Récupérer tous les rendez-vous créés par un compte spécifique
