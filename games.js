const { MongoClient } = require("mongodb");
const uri = "mongodb://127.0.0.1:27017"; // Mongo local

async function getGames3DS() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db("exercice");
    const games = db.collection("console_games");
    return await games.find({ Platform: "3DS" }).toArray();
  } finally {
    await client.close();
  }
}

async function getGames3DS2011() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db("exercice");
    const games = db.collection("console_games");
    return await games.find({ Platform: "3DS", Year: "2011" }).toArray();
  } finally {
    await client.close();
  }
}

async function getGames3DS2011Top3() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db("exercice");
    const games = db.collection("console_games");
    return await games.find(
      { Platform: "3DS", Year: "2011" },
      { projection: { Name: 1, Global_Sales: 1, _id: 0 } }
    )
      .sort({ Global_Sales: -1 })
      .limit(3)
      .toArray();
  } finally {
    await client.close();
  }
}

module.exports = { getGames3DS, getGames3DS2011, getGames3DS2011Top3 };
