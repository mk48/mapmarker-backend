const request = require("supertest");
const app = require("../app.js");

describe("Marker routes", () => {
  test("Insert a marker", async done => {
    const response = await request(app)
      .post("/marker")
      .send({ id: 1, address: "test address", lat: 1, lng: 2 });
    expect(response.statusCode).toBe(200);

    done();
  });

  test("Get a marker", async done => {
    const response = await request(app).get("/marker/1");

    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBe(1);
    expect(response.body.address).toBe("test address");

    done();
  });

  test("Get all marker", async done => {
    const response = await request(app).get("/marker");

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].address).toBe("test address");

    done();
  });

  test("Update a marker", async done => {
    const response = await request(app)
      .patch("/marker")
      .send({ id: 1, address: "updated address", lat: 1, lng: 2 });
    expect(response.statusCode).toBe(200);

    // get the marker and check
    const response1 = await request(app).get("/marker/1");
    expect(response1.body.address).toBe("updated address"); // address must be changed
    expect(response1.body.lat).toBe(1); // others should not be updated
    expect(response1.body.lng).toBe(2); // others should not be updated

    done();
  });

  test("Delete a marker", async done => {
    const response = await request(app).delete("/marker/1");

    const response1 = await request(app).get("/marker");

    expect(response1.statusCode).toBe(200);
    expect(response1.body.length).toBe(0);

    done();
  });
});
