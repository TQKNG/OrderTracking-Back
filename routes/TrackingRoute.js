const {getAllTracking, addTracking, deleteTracking, updateTracking} = require("../controllers/trackingController")
const route = require("express").Router();

route.get("/", getAllTracking);
// route.get("/:id", getTrackingById);
route.post("/", addTracking);
route.delete("/:id", deleteTracking);
route.put("/:id", updateTracking);

module.exports = route;



