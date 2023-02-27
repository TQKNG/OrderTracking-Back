const route = require("express").Router();
const sendMail = require("../utils/sendEmail");

route.post("/", sendMail);
module.exports = route;
