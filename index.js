import { MongoClient } from "mongodb";

const uri = "mongodb://127.0.0.1:27017"; // Mongo local
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();

    const db = client.db("exercice");
    const games = db.collection("console_games");

    console.log(" 1 Jeux 3DS sortis :");
    const jeux3ds = await games.find(
      { Platform: "3DS" }
    ).toArray();
    console.log(jeux3ds);

    console.log("\n 2 Jeux 3DS sortis en 2011 :");
    const jeux2011 = await games.find(
      { Platform: "3DS", Year: "2011" }
    ).toArray();
    console.log(jeux2011);

    console.log("\n 3 Nom + Global_Sales des jeux 3DS sortis en 2011 :");
    const projet3 = await games.find(
      { Platform: "3DS", Year: "2011" },
      { projection: { Name: 1, Global_Sales: 1, _id: 0 } }
    ).toArray();
    console.log(projet3);

    console.log("\n  4 Top 3 ventes 3DS en 2011 :");
    const top3 = await games.find(
      { Platform: "3DS", Year: "2011" },
      { projection: { Name: 1, Global_Sales: 1, _id: 0 } }
    )
      .sort({ Global_Sales: -1 })
      .limit(3)
      .toArray();
    console.log(top3);

  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

run();
