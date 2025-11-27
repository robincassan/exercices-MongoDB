import Livre from "../models/livreModel.js";

export async function createLivre(req, res) {
  try {
    const livre = await Livre.create(req.body);
    return res.status(201).json(livre);
  } catch (error) {
    // Duplicate key error (MongoDB)
    if (error.code === 11000) {
      return res.status(400).json({ error: "Titre déjà utilisé" });
    }
    // Mongoose validation error
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({ error: messages.join(", ") });
    }
    // autre
    return res.status(400).json({ error: error.message });
  }
}

export async function getLivres(req, res) {
  try {
    const livres = await Livre.find().sort({ createdAt: -1 });
    res.json(livres);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
}
