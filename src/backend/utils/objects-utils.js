/**
 * Enlève les propriétés de l'objet qui ont une valeur donnée
 * @param {Record<string, unknown>} obj - L'objet à nettoyer
 * @param {unknown[]} values - Les valeurs à supprimer (par défaut `[undefined, null]`)
 * @throws {TypeError} Si l'argument obj n'est pas un objet
 * @returns {Record<string, unknown>} L'objet nettoyé
 * @example
 * removeValues({ a: 1, b: null, c: undefined }) // => { a: 1 }
 * removeValues({ a: 1, b: 2 }, [2]) // => { a: 1 }
 * @todo Rendre récursif
 */
function removeValues(obj, values = [undefined, null]) {
    if (obj === null || typeof obj !== "object") {
        throw new TypeError("Le premier argument doit être un objet");
    }

    if (!Array.isArray(values)) {
        throw new TypeError("Le second argument doit être un tableau");
    }

    return Object.fromEntries(
        Object.entries(obj).filter(([_, value]) => !values.includes(value))
    );
}

/**
 * Enlève les propriétés de l'objet qui ont un nom donné
 * @param {Record<string, unknown>} obj - L'objet à nettoyer
 * @param {string[]} properties - Les noms des propriétés à supprimer
 * @throws {TypeError} Si l'argument obj n'est pas un objet
 * @throws {TypeError} Si l'argument properties n'est pas un tableau de chaînes
 * @returns {Record<string, unknown>} L'objet nettoyé
 * @example
 * removeProperties({ a: 1, b: 2 }, ['b']) // => { a: 1 }
 * removeProperties({ a: 1, b: 2, c: 3 }, ['b', 'c']) // => { a: 1 }
 */
function removeProperties(obj, properties) {
    if (obj === null || typeof obj !== "object") {
        throw new TypeError("Le premier argument doit être un objet");
    }

    if (
        !Array.isArray(properties) ||
        !properties.every((prop) => typeof prop === "string")
    ) {
        throw new TypeError(
            "Le second argument doit être un tableau de chaînes"
        );
    }

    return Object.fromEntries(
        Object.entries(obj).filter(([key]) => !properties.includes(key))
    );
}

export { removeProperties, removeValues };
