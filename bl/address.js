const axios = require("axios");

async function GeoCode(address) {
  /*const url =
    "https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=" +
    process.env.GOOGLE_MAP_API_KEY;*/
  const addressToSearch = encodeURIComponent(address);
  const url = `https://nominatim.openstreetmap.org/search/${addressToSearch}?format=json&addressdetails=1&limit=1`;

  try {
    const result = await axios.get(url);
    //console.log(result.data.results);

    return result.data;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  GeoCode: GeoCode
};
