const {getAllTracking, addTracking, deleteTracking, updateTracking} = require("../controllers/trackingController")
const router = require("express").Router();

router.get("/", getAllTracking);
// route.get("/:id", getTrackingById);
router.post("/", addTracking);
router.delete("/:id", deleteTracking);
router.put("/:id", updateTracking);

module.exports = router;



