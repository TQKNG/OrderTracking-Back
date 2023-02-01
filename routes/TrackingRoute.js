const Tracking = require("../models/trackingModel");
const route = require("express").Router();
const sendEmail = require("../utils/sendEmail");

route.get("/api/tracking", (req, res) => {
  Tracking.find({})
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json(`Interal Server Error: ${err}`);
    });
});

route.get("/api/tracking/:id", (req, res) => {
  const id = req.params.id;
  Tracking.findById(id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json(`Interal Server Error: ${err}`);
    });
});

route.post("/api/tracking", (req, res) => {
  const input = req.body;
  const newTracking = new Tracking(input);

  newTracking
    .save()
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      res.status(500).json(`Interal Server Error: ${err}`);
    });
});

route.delete("/api/tracking/:id", (req, res) => {
  const id = req.params.id;
  Tracking.findByIdAndDelete(id)
    .then(() => {
      res.status(200).json("Tracking Item is deleted");
    })
    .catch((err) => {
      res.status(500).json(`Interal Server Error: ${err}`);
    });
});

route.put("/api/tracking/:id", (req, res) => {
  const id = req.params.id;
  const data = req.body;

  Tracking.findByIdAndUpdate(id, data).then(() => {
    res.status(200).json("Tracking Item is update");
  });
});

// email route
route.post("/api/tracking/contact", async(req, res) => {
  const{email, message} = req.body;

  var mail = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: `New Message from ${email} Contact Form`,
    content: message,
  };

  // // Send Mail
  try{
    await sendEmail(mail);
    res.status(200).json({success:true, message: "Email sent"});
  }
  catch(err){
    throw Error('Email not sent please try again')
  }
});


module.exports = route;
