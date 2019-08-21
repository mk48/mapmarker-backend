const addressGoogle = require("./address-google");
const addressOSM = require("./address-open-street-map");

async function GeoCode(address) {
  let result = {};
  await GeoCodeOSM(address, result);

  // if  Open streetmap service response is failed then try the google
  if (result.success) {
    return result.data;
  } else {
    const googleResult = await GeoCodeGoogle(address, result);
    if (googleResult) {
      return result;
    } else {
      // if google response is also failed then return error.
      throw new Error("Can't find geocode for the given address");
    }
  }
}

//============================ Private functions =============
async function GeoCodeGoogle(address, result) {
  console.log("get geocode from Google");
  try {
    result = await addressGoogle.GeoCode(address);

    // check any err in google reply
    if (result.error_message) {
      throw new Error(result.error_message);
    }

    return true;
  } catch (err) {
    return false;
  }
}

async function GeoCodeOSM(address, result) {
  console.log("get geocode from osm");
  try {
    result.data = await addressOSM.GeoCode(address);
    result.success = true;
  } catch (err) {
    result.success = false;
  }
}

module.exports = {
  GeoCode: GeoCode
};
