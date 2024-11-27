/**
 * Utilitaire de validation d'interfaces
 * @class
 */
class InterfaceValidator {
    /**
     * Vérifie qu'une classe implémente une interface
     * @param {Function} targetClass - La classe à vérifier
     * @param {Function} interfaceClass - L'interface de référence
     * @throws {TypeError} Si les paramètres sont invalides
     * @throws {Error} Si l'implémentation est incorrecte
     */
    static ensureImplementsInterface(targetClass, interfaceClass) {
        // Validation des paramètres
        if (typeof targetClass !== "function") {
            throw new TypeError("targetClass doit être une classe");
        }
        if (typeof interfaceClass !== "function") {
            throw new TypeError("interfaceClass doit être une interface");
        }

        const targetProto = targetClass.prototype;
        const interfaceProto = interfaceClass.prototype;

        // Récupération des méthodes de l'interface
        const methodsDescriptors = Object.entries(
            Object.getOwnPropertyDescriptors(interfaceProto)
        );
        const targetMethodsDescriptors = Object.entries(
            Object.getOwnPropertyDescriptors(targetProto)
        );

        const requiredMethodsDescriptors = methodsDescriptors.filter(
            ([name, descriptor]) => {
                return (
                    typeof descriptor.value === "function" &&
                    name !== "constructor"
                );
            }
        );

        // Vérification de l'implémentation des méthodes
        const missingMethods = requiredMethodsDescriptors.filter(
            ([name, descriptor]) => {
                return !targetMethodsDescriptors.some(
                    ([targetName, targetDescriptor]) =>
                        targetName === name &&
                        typeof targetDescriptor.value === "function" &&
                        targetDescriptor.value.length ===
                            descriptor.value.length
                );
            }
        );

        // Génération d'erreur si des méthodes sont manquantes
        if (missingMethods.length > 0) {
            throw new Error(
                `La classe ${targetClass.name} n'implémente pas correctement ` +
                    `l'interface ${interfaceClass.name}.\n` +
                    `Méthodes manquantes/mal implémentées : ${missingMethods.reduce(
                        (acc, [name, _]) => `${acc}${name}, `,
                        ""
                    )}`
            );
        }
    }

    /**
     * Vérifie plusieurs interfaces à la fois
     * @param {Function} targetClass - La classe à vérifier
     * @param {...Function} interfaces - Les interfaces à vérifier
     * @throws {Error} Si une interface n'est pas correctement implémentée
     */
    static ensureImplementsInterfaces(targetClass, ...interfaces) {
        const errors = [];
        interfaces.forEach((interfaceClass) => {
            try {
                this.ensureImplementsInterface(targetClass, interfaceClass);
            } catch (error) {
                errors.push(error.message);
            }
        });

        if (errors.length > 0) {
            throw new Error(errors.join("\n"));
        }
    }

    /**
     * Crée un décorateur de validation d'interface
     * @param {...Function} interfaces - Les interfaces à implémenter
     * @returns {Function} Le décorateur
     */
    static implements(...interfaces) {
        return function (targetClass) {
            InterfaceValidator.ensureImplementsInterfaces(
                targetClass,
                ...interfaces
            );
            return targetClass;
        };
    }
}

export { InterfaceValidator };
