const Tracking = require("../models/trackingModel");
const route = require("express").Router();
// const sendEmail = require("../utils/sendEmail");
const sgMail = require('@sendgrid/mail')

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
  // const send_to = process.env.EMAIL_USER;
  // const sent_from = process.env.EMAIL_USER;
  // const reply_to = email;
  // const subject = `New Message from ${email} Contact Form`;
  // // Send Mail
  // With sendGrid
  sgMail.setApiKey('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');
  const mail ={
    to: email,
    from: process.env.EMAIL_USER,
    subject:`New Message from Order Tracking Team Contact Form`,
    html: `<span>Dear Value Customer, </span>
    <p>Order Tracking App has received your email.
    Our Transportation Service team will get back to you in 24 hours
    </p>
    <p>Your message is : ${message}</p>
    <h5>Best regards</h5>
    <h5>Order Tracking Management Team</h5>`
  }

  await sgMail
  .send(mail)
  .then(()=>{
    res.status(200).json({success:true, message: "Email sent"});
    console.log('Email sent')
  })
  .catch((err)=>{
    throw Error(`Email not sent please try again ${err}`)
  })



  // try{
  //   await sendEmail(subject, message, send_to, sent_from, reply_to);
  //   res.status(200).json({success:true, message: "Email sent"});
  // }
  // catch(err){
  //   throw Error('Email not sent please try again')
  // }
});


module.exports = route;
