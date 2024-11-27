class ServiceError extends Error {
    constructor(...args) {
        super(...args);
    }
}

export { ServiceError };
