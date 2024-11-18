import mongoose from "mongoose";

const agendaSchema = new mongoose.Schema(
    {
        nom: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const Agenda = mongoose.model("Agenda", agendaSchema);

export default Agenda;
