var express = require("express");
var router = express.Router();

// BL
const markerBL = require("./../bl/marker");

// =============================================== Get All ==========================================
router.get("/", async function(req, res, next) {
  try {
    const markers = await markerBL.GetAll();

    res.json(markers);
  } catch (e) {
    res.status(401).json(e.toString());
  }
});

// =============================================== Get ==========================================

router.get("/:id", async function(req, res, next) {
  const id = Number(req.params.id);
  try {
    const marker = await markerBL.Get(id);

    res.json(marker);
  } catch (e) {
    res.status(401).json(e.toString());
  }
});

// =============================================== Insert ==========================================

router.post("/", async function(req, res, next) {
  const id = req.body.id;
  const address = req.body.address;
  const lat = req.body.lat;
  const lng = req.body.lng;

  try {
    markerBL.Insert({ id, address, lat, lng });

    res.json({ id });
  } catch (e) {
    res.status(401).json(e.toString());
  }
});

// =============================================== Update ==========================================

router.patch("/", async function(req, res, next) {
  const id = req.body.id;
  const address = req.body.address;
  const lat = req.body.lat;
  const lng = req.body.lng;

  try {
    markerBL.Update(id, { address, lat, lng });

    res.json({ id });
  } catch (e) {
    res.status(401).json(e.toString());
  }
});

// =============================================== Delete ==========================================

router.delete("/:id", async function(req, res, next) {
  const id = Number(req.params.id);

  try {
    markerBL.Delete(id);

    res.json({ id });
  } catch (e) {
    res.status(401).json(e.toString());
  }
});

module.exports = router;
