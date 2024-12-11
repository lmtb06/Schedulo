# Schedulo

## Lancement du serveur

### Depuis la racine du projet:
```bash
cd src && npm install && npm start
```

### Depuis le dossier src:
```bash
npm install && npm start
```

## Technologies
- NodeJS
- Express
- MongoDB
- FullCalendar
- TailwindCSS
- Rollup

## Fonctionnalités

### Utilisateur
    - [ ] S'inscrire
    - [ ] Se connecter
    - [ ] Se déconnecter
    - [ ] Modifier son profil
    - [ ] Supprimer son compte
    - [ ] Reinitaliser son mot de passe

### Agenda

    - [ ] Créer un agenda
    - [ ] Visualiser un agenda
    - [ ] Visualiser des agendas
    - [ ] Modifier un agenda
    - [ ] Supprimer un agenda
    - [ ] Importer un agenda
    - [ ] Exporter un agenda
    - [ ] Partager un agenda
    - [ ] Annuler le partage d'un agenda

### Rendez-vous

    - [ X ] Ajouter un rendez-vous
    - [ X ] Modifier un rendez-vous
    - [ X ] Supprimer un rendez-vous
    - [ X ] Visualiser un rendez-vous
    - [ ] Rechercher un rendez-vous

## Organisation des fichiers

### src
Le dossier src contient les fichiers relatifs au code source du projet.<br>

### Documenation
#### sprint
Le dossier sprint contient les fichiers relatifs aux sprints (un dossier par sprint).<br>
Chaque dossier sera nommé `sprintX` où X est le numéro du sprint.<br>
Ils contiendront les fichiers `backlog.md`, `retrospective.md` et `revue.md`.

#### diagrammes
Le dossier diagrams contient les fichiers relatifs aux diagrammes UML du projet dans le sous-dossier src se trouve les sources plantuml et out contient les sorties.

#### routes
Le dossier routes contient un fichier `routes.md` qui contiendra toutes les routes de l'application.