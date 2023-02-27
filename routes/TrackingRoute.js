const {getAllTracking, getTrackingById, addTracking, deleteTracking, updateTracking} = require("../controllers/trackingController")
const route = require("express").Router();
const sendMail = require("../utils/sendEmail");

route.get("/", getAllTracking);
route.get("/:id", getTrackingById);
route.post("/", addTracking);
route.delete("/:id", deleteTracking);
route.put("/:id", updateTracking);

// email route


module.exports = route;



