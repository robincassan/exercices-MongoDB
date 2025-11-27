import mongoose from "mongoose";

const LivreSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: [true, "Le titre est requis"],
    unique: true,
    trim: true
  },
  auteur: {
    type: String,
    required: [true, "L'auteur est requis"],
    minlength: [1, "L'auteur ne peut pas être vide"],
    trim: true
  },
  annee: {
    type: Number,
    required: [true, "L'année est requise"],
    min: [1901, "L'année doit être supérieure à 1900"]
  },
  genre: {
    type: String
  }
}, { timestamps: true });

// Pour que l'index 'unique' soit créé en dev automatiquement
LivreSchema.index({ titre: 1 }, { unique: true });

export default mongoose.model("Livre", LivreSchema);
