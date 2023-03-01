const {getAllTracking, addTracking, getTrackingById, deleteTracking, updateTracking} = require("../controllers/trackingController")
const router = require("express").Router();

router.get("/", getAllTracking);
router.get("/:id", getTrackingById);
router.post("/", addTracking);
router.delete("/:id", deleteTracking);
router.put("/:id", updateTracking);

module.exports = router;



