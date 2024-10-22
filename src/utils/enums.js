const Environnement = Object.freeze({
    PRODUCTION: 'production',
    DEVELOPMENT: 'development',
    TEST: 'test'
});

// Enumération des unités de répétition
const UniteRepetition = Object.freeze({
    JOUR: "jour",
    SEMAINE: "semaine",
    MOIS: "mois",
    ANNEE: "année"
});

export { Environnement, UniteRepetition };