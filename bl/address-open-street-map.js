const axios = require("axios");

async function GeoCodeOpenStreetMap(address) {
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
      throw new Error("Place not found");
    }
  } catch (err) {
    throw err;
  }
}

module.exports = {
  GeoCodeOpenStreetMap: GeoCodeOpenStreetMap
};

/* =============================================== Sample output from openstreetmap for geocode =====================
[
  {
    place_id: 173144307,
    licence: "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
    osm_type: "way",
    osm_id: 450265962,
    boundingbox: ["10.2212916", "10.2317866", "77.7412539", "77.7536993"],
    lat: "10.22608515",
    lon: "77.7474364130865",
    display_name: "Ayyampalayam, Anna, Dindigul district, Tamil Nadu, India",
    class: "place",
    type: "village",
    importance: 0.48500000000000004,
    icon: "https://nominatim.openstreetmap.org/images/mapicons/poi_place_village.p.20.png",
    address: {
      village: "Ayyampalayam",
      county: "Anna",
      state_district: "Dindigul district",
      state: "Tamil Nadu",
      country: "India",
      country_code: "in"
    }
  }
];

*/
