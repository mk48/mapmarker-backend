const addressGoogle = require("./address-google");
const addressOSM = require("./address-open-street-map");

/**
 * Get Geocode from an address
 *
 * @param {*} address
 * @returns {lat: ###, lng: ###}
 */
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

//=============================================== Private functions ===============================================
/**
 * get Geo code from google
 *
 * @param {*} address
 * @param {*} result.data will have the lat/lng. result.success is boolean having it's success or fail info
 */
async function GeoCodeGoogle(address, result) {
  try {
    result.data = await addressGoogle.GeoCode(address);

    // check any err in google reply
    if (result.data.error_message) {
      throw new Error(result.data.error_message);
    }

    result.success = true;
  } catch (err) {
    result.success = false;
  }
}

/**
 * get Geo code from Open street map
 *
 * @param {*} address
 * @param {*} result.data will have the lat/lng. result.success is boolean having it's success or fail info
 */
async function GeoCodeOSM(address, result) {
  try {
    const osmResponse = await addressOSM.GeoCode(address);

    if (osmResponse) {
      result.data = { addressFound: true, ...osmResponse };
    } else {
      result.data = { addressFound: false };
    }

    result.success = true;
  } catch (err) {
    result.success = false;
  }
}

//=============================================== Export ===============================================

module.exports = {
  GeoCode: GeoCode
};
