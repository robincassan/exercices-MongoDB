/**
 * Suites de tests E2E
 */
describe('API Backend Tests', () => { 

        let parkingId = 99; // Id du parking créé, on le réutilise pour Update et Delete
    // READ - Liste des parkings
    it('GET /parkings renvoie une liste des parkings', () => {
        cy.request('GET', 'http://localhost:8080/parkings')
        .then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('array');
        });
    });

    // CREATE - Création d'un parking
    it('POST /parking crée un parking', () => {
    cy.request('POST', 'http://localhost:8080/parkings',  {
          "id": 99,
          "name":"Parking 99",
          "type": "AIRPORT 99",
          "city": "ROISSY EN FRANCE"
      }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
      //console.log(JSON.stringify(response.body).indexOf('Parking 99'))
      expect(JSON.stringify(response.body).indexOf('Parking 99')).to.gt(0);
    });
  });
  
  // READ - Vérification du parking créé
    it('GET /parkings/:id renvoie le parking créé', () => {
        cy.request('GET', `http://localhost:8080/parkings/${parkingId}`)
        .then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('id', parkingId);
            expect(response.body).to.have.property('name', 'Parking 99');
        });
    });

    // UPDATE - Modification du parking
    it('PUT /parkings/:id modifie un parking', () => {
        cy.request('PUT', `http://localhost:8080/parkings/${parkingId}`, {
            "name":"Parking 99 Modifié",
            "type": "AIRPORT MODIFIE",
            "city": "ROISSY MODIFIE"
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('name', 'Parking 99 Modifié');
        });
    });

    // DELETE - Suppression du parking
    it('DELETE /parkings/:id supprime un parking', () => {
        cy.request('DELETE', `http://localhost:8080/parkings/${parkingId}`)
        .then((response) => {
            expect(response.status).to.eq(200);
            // On peut vérifier qu'il n'existe plus
            cy.request({
                method: 'GET',
                url: `http://localhost:8080/parkings/${parkingId}`,
                failOnStatusCode: false
            }).then((res) => {
                expect(res.status).to.eq(404);
            });
        });
    });
});