const nodemailer = require('nodemailer');
const { translateAliases } = require('../models/trackingModel');

// Configure transport
const sendEmail = async(subject, message, send_to, sent_from, reply_to)=>{
    var transport = {
        host: process.env.EMAIL_HOST,
        port: 587,
        auth:{
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    }
    
    // Option for sending email
    const options ={
        from: sent_from,
        to: send_to,
        replyTo: reply_to,
        subject: subject,
        html: `<span>Dear Value Customer, </span>
        <p>Order Tracking App has received your email.
        Our Transportation Service team will get back to you in 24 hours
        </p>
        <p>Your message is : ${message}</p>
        <h5>Best regards</h5>
        <h5>Order Tracking Management Team</h5>
      `,
      
    }
    // Create Transport
    var transporter = nodemailer.createTransport(transport);
    transporter.sendMail(options,(err,info)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log(info);
        }
    })
}

  // await sendEmail(mail, (err, data) => {
  //     if (err) {
  //       res.status(500).json("Error during sending")
  //       reject();
  //     } else {
  //      res.status(200).json("Successful send the email")
  //       resolve();
  //     }
  
  //     // Send auto-reply mail
  //     // sendEmail(
  //     //   {
  //     //     from: process.env.EMAIL_USER,
  //     //     to: email,
  //     //     subject: "Thank you for your email",
  //     //     html: `<span>Dear Value Customer, </span>
  //     //       <p>Order Tracking App has received your email.
  //     //       Our Transportation Service team will get back to you in 24 hours
  //     //       </p>
  //     //       <h5>Best regards</h5>
  //     //       <h5>Order Tracking Management Team</h5>
  //     //     `,
  //     //   },
  //     //   (err, info) => {
  //     //     if (err) {
  //     //       console.log(err);
  //     //     } else {
  //     //       console.log(`Message sent: ${info.response}`);
  //     //     }
  //     //   }
  //     // );
  //   });


module.exports = sendEmail;




