import mongoose from 'mongoose';

const rendezVousSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: true
  },
  debut: {
    type: Date,
    required: true
  },
  fin: {
    type: Date,
    required: true
  },
  description: {
    type: String
  },
  repetitions: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Repetition'
  }]
}, {
  timestamps: true // Ajoute automatiquement createdAt et updatedAt
});

const RendezVous = mongoose.model('RendezVous', rendezVousSchema);

export default RendezVous;