const request = require("supertest");
const app = require("../app.js");

describe("Address", () => {
  test("GeoCode api should be able to provide geocode for address", async done => {
    const response = await request(app)
      .get("/address/geocode")
      .query({ address: "T Ayyampalayam" });

    expect(response.statusCode).toBe(200);
    expect(response.body.lat).toBe(9);
    //console.log(response.body);

    done();
  });
});
