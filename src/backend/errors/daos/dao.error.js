/**
 * @augments {Error}
 */
class DAOError extends Error {
    constructor(...args) {
        super(...args);
    }
}

export { DAOError };
