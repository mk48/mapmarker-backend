var express = require("express");
var router = express.Router();

// BL
const addressBL = require("./../bl/address");

router.get("/geocode", async function(req, res, next) {
  const address = req.query.address;
  try {
    const geocode = await addressBL.GeoCode(address);

    res.json(geocode);
  } catch (e) {
    res.status(401).json(e.toString());
  }
});

module.exports = router;
