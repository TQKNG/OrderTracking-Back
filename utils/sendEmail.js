const nodemailer = require("nodemailer");
const { translateAliases } = require("../models/trackingModel");

const sendMail = async(req,res)=>{
    const{email, message} = req.body;
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
}

module.exports = sendMail