const markerBL = require("./../bl/marker");

// marker object with all the properties
const markerRow = {
  id: 0,
  address: "",
  lat: "",
  lng: ""
};

describe("Marker in memory DB operations", () => {
  test("Insert the marker to DB", async done => {
    markerBL.Insert({ id: 1, address: "a", lat: 1, lng: 11 });
    markerBL.Insert({ id: 2, address: "b", lat: 2, lng: 22 });
    markerBL.Insert({ id: 3, address: "c", lat: 3, lng: 33 });

    // no actual test here, values should be inserted

    done();
  });

  test("Retrieve values from marker DB", async done => {
    const marker2 = markerBL.Get(2);

    expect(marker2.id).toBe(2);
    expect(marker2.address).toBe("b");
    expect(marker2.lat).toBe(2);
    expect(marker2.lng).toBe(22);

    done();
  });

  test("Delete a marker value in DB", async done => {
    markerBL.Delete(1);

    // no actual test here, values should be deleted from DB

    done();
  });

  test("Access the deleted record and should be thrown error", async done => {
    expect(() => {
      const marker1 = markerBL.Get(1);
    }).toThrow();

    done();
  });
});
