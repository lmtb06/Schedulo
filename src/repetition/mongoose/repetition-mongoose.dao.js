import { removeProperties, removeValues } from "../../utils/index.js";
import { RepetitionDAO } from "../repetition.dao.js";
import { Repetition } from "../repetition.model.js";

/**
 * @typedef {import('mongoose').Model} MongooseModel
 */

class RepetitionMongooseDAO extends RepetitionDAO {
    constructor(RepetitionModel) {
        super();
        /**
         * Modèle mongoose des répétitions.
         * @type {MongooseModel}
         * @private
         * @readonly
         */
        this.RepetitionModel = RepetitionModel;
    }

    async create(repetition) {
        const donneesRepetition = removeValues(
            removeProperties(repetition, ["id"]),
            [undefined, null]
        );

        const repetitionModel = new this.RepetitionModel(donneesRepetition);
        await repetitionModel.save();
        return this.transformerEnRepetition(repetitionModel);
    }

    async findById({ id }) {
        const repetitionModel = await this.RepetitionModel.findById(id);
        return this.transformerEnRepetition(repetitionModel);
    }

    async update({ id, ...resteDesDonnees }) {
        const donneesRepetition = removeValues(
            resteDesDonnees[(undefined, null)]
        );
        const repetitionModel = await this.RepetitionModel.findByIdAndUpdate(
            id,
            donneesRepetition,
            {
                new: false,
            }
        );
        return this.transformerEnRepetition(repetitionModel);
    }

    async delete({ id }) {
        await this.RepetitionModel.findByIdAndDelete(id);
    }

    /**
     * Transforme une répétition mongoose en répétition métier.
     * @param {MongooseModel} repetitionModel La répétition mongoose.
     * @returns {Repetition} La répétition métier.
     */
    transformerEnRepetition(repetitionModel) {
        return new Repetition({
            id: repetitionModel._id,
            intervalle: repetitionModel.intervalle,
            unite: repetitionModel.unite,
            fin: repetitionModel.fin,
        });
    }
}

export { RepetitionMongooseDAO };
