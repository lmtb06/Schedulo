export const renderErrorPage = async (res, error) => {
    // Essai de rendre la page d'erreur spécifique et si elle n'existe pas, on rend la page d'erreur par défaut
    try {
        await res.render(`errors/${error.status}`, {
            titrePage: `Erreur ${error.status}`,
            status: error.status,
            message: error.message,
            errors: error.errors,
            stack: error.stack
        });
    } catch (e) {
        await res.render(`errors/default`, {
            titrePage: `Erreur ${error.status}`,
            status: error.status,
            message: error.message,
            errors: error.errors,
            stack: error.stack
        });
    }
};

export const renderApiErrorResponse = (res, error) => {
    res.status(error.status).json({
        message: error.message,
        errors: error.errors,
        stack: error.stack
    });
};

export const renderApiSuccessResponse = (res, { status, message, data }) => {
    res.status(status).json(
        {
            message: message,
            data: data
        }
    );
};

