const { getGames3DS, getGames3DS2011, getGames3DS2011Top3 } = require('./games');

async function run() {
  console.log("1 Jeux 3DS sortis :");
  const jeux3ds = await getGames3DS();
  console.log(jeux3ds);

  console.log("\n 2 Jeux 3DS sortis en 2011 :");
  const jeux2011 = await getGames3DS2011();
  console.log(jeux2011);

  console.log("\n3 Nom + Global_Sales des jeux 3DS sortis en 2011 :");
  const projet3 = await getGames3DS2011();
  const projet3Projection = projet3.map(g => ({ Name: g.Name, Global_Sales: g.Global_Sales }));
  console.log(projet3Projection);

  console.log("\n4 Top 3 ventes 3DS en 2011 :");
  const top3 = await getGames3DS2011Top3();
  console.log(top3);
}

run();