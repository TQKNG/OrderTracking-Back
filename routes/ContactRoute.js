const router = require("express").Router();
const sendMail = require("../utils/sendEmail");

router.post("/", sendMail);
module.exports = router;
