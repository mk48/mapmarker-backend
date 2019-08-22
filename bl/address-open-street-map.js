const axios = require("axios");

async function GeoCode(address) {
  const addressToSearch = encodeURIComponent(address);
  const url = `https://nominatim.openstreetmap.org/search/${addressToSearch}?format=json&addressdetails=1&limit=1`;

  try {
    const result = await axios.get(url);
    const data = result.data;
    /*
    open streetmap will return an array 
    refer the commented sample in the bottom of this file
    */

    if (data.length > 0) {
      //return the lat+lng of the address
      return { lat: data[0].lat, lng: data[0].lon };
    } else {
      // if address not found then return null
      return null;
    }
  } catch (err) {
    throw err;
  }
}

module.exports = {
  GeoCode: GeoCode
};

/* =============================================== Sample output from openstreetmap for geocode =====================
[
  {
    place_id: 641809,
    licence: "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
    osm_type: "node",
    osm_id: 245586375,
    boundingbox: ["10.2055408", "10.5255408", "77.8095854", "78.1295854"],
    lat: "10.3655408",
    lon: "77.9695854",
    display_name: "Dindigul, Anna, Dindigul district, Tamil Nadu, 624001, India",
    class: "place",
    type: "city",
    importance: 0.520941488689445,
    icon: "https://nominatim.openstreetmap.org/images/mapicons/poi_place_city.p.20.png",
    address: {
      city: "Dindigul",
      county: "Anna",
      state_district: "Dindigul district",
      state: "Tamil Nadu",
      postcode: "624001",
      country: "India",
      country_code: "in"
    }
  }
];
*/
