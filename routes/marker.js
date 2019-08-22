var express = require("express");
var router = express.Router();

// BL
const markerBL = require("./../bl/marker");

router.get("/", async function(req, res, next) {
  const id = req.query.id;
  try {
    const marker = await markerBL.Get(id);

    res.json(marker);
  } catch (e) {
    res.status(401).json(e.toString());
  }
});

module.exports = router;
