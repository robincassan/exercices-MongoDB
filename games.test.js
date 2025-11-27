const { getGames3DS, getGames3DS2011, getGames3DS2011Top3 } = require('./games');

describe("Tests MongoDB - Console Games", () => {

  test("Récupère tous les jeux 3DS", async () => {
    const jeux = await getGames3DS();
    expect(Array.isArray(jeux)).toBe(true);
    expect(jeux.length).toBeGreaterThan(0);
  });

  test("Récupère les jeux 3DS de 2011", async () => {
    const jeux2011 = await getGames3DS2011();
    expect(jeux2011.length).toBeGreaterThan(0);
    jeux2011.forEach(g => {
      expect(g.Platform).toBe("3DS");
      expect(g.Year).toBe("2011");
    });
  });

  test("Top 3 ventes 3DS 2011", async () => {
    const top3 = await getGames3DS2011Top3();
    expect(top3.length).toBeLessThanOrEqual(3);
    expect(top3[0].Global_Sales).toBeGreaterThanOrEqual(top3[1]?.Global_Sales || 0);
  });

});
