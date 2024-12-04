import Joi from "joi";
import mongoose from "mongoose";

/**
 * @type {Joi.Root}
 */
const customJoi = Joi.extend((joi) => ({
    type: "id",
    base: joi.string(),
    messages: {
        "id.base": '"{{#label}}" doit être un id valide',
    },
    validate(value, helpers) {
        if (!mongoose.isValidObjectId(value)) {
            return { value, errors: helpers.error("id.base") };
        }
        return { value };
    },
}));

export default customJoi;
