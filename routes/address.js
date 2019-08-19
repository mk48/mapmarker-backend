var express = require("express");
var router = express.Router();

// BL
const addressBL = require("./../bl/address");

/* GET users listing. */
router.get("/geocode", async function(req, res, next) {
  const id = req.query.id;
  try {
    const geocode = await addressBL.GeoCode(shopId, id);

    res.json(geocode);
  } catch (e) {
    res.status(401).json(e.toString());
  }
});

module.exports = router;
