import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../src/app.js";
import Livre from "../src/models/livreModel.js";

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterEach(async () => {
  // nettoie les documents entre chaque test
  await Livre.deleteMany();
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("API /livres", () => {

  test("Ajout d'un livre valide => 201", async () => {
    const res = await request(app)
      .post("/livres")
      .send({
        titre: "Harry Potter à l'école des sorciers",
        auteur: "J. K. Rowling",
        annee: 2001,
        genre: "Fantasy"
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("_id");
    expect(res.body.titre).toBe("Harry Potter à l'école des sorciers");
  });

  test("Insertion refusée si année < 1901 => 400", async () => {
    const res = await request(app)
      .post("/livres")
      .send({
        titre: "Livre vieux",
        auteur: "Auteur inconnu",
        annee: 1800
      });

    expect(res.status).toBe(400);
    // on peut vérifier le message
    expect(res.body.error).toMatch(/1900/);
  });

  test("Titre dupliqué => 400", async () => {
    // crée d'abord
    await request(app)
      .post("/livres")
      .send({
        titre: "Harry Potter à l'école des sorciers",
        auteur: "J. K. Rowling",
        annee: 2001
      });

    // tentative de créer un second avec même titre
    const res = await request(app)
      .post("/livres")
      .send({
        titre: "Harry Potter à l'école des sorciers",
        auteur: "Copycat",
        annee: 2012
      });

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/Titre déjà utilisé|duplicate/i);
  });

  test("Récupération GET /livres => liste", async () => {
    await request(app).post("/livres").send({
      titre: "Harry Potter 1",
      auteur: "J. K. Rowling",
      annee: 2001
    });
    await request(app).post("/livres").send({
      titre: "Harry Potter 2",
      auteur: "J. K. Rowling",
      annee: 2002
    });

    const res = await request(app).get("/livres");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body.length).toBe(2);
  });

});
