const axios = require("axios");

async function GeoCode(address) {
  const addressToSearch = encodeURIComponent(address);
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${addressToSearch}&key=${
    process.env.GOOGLE_MAP_API_KEY
  };`;

  try {
    const result = await axios.get(url);

    return result.data;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  GeoCode: GeoCode
};

//============================ Reply from google for geocodes =============
/*

for wrong api key

[{ error_message: "The provided API key is invalid.", results: [], status: "REQUEST_DENIED" }];


*/
