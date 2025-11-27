import express from "express";
import livreRoute from "./routes/livreRoute.js";
import { connectDB } from "./database.js";

const app = express();
app.use(express.json());

app.use("/livres", livreRoute);

// si on veut lancer le serveur seulement si ce fichier est exécuté directement
if (process.env.NODE_ENV !== "test") {
  // connecte la DB et démarre le serveur
  connectDB()
    .then(() => {
      const PORT = process.env.PORT || 3000;
      app.listen(PORT, () => console.log(`Serveur lancé sur http://localhost:${PORT}`));
    })
    .catch(err => {
      console.error("Impossible de démarrer le serveur :", err);
    });
}

export default app;
