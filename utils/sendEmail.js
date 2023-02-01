const nodemailer = require('nodemailer');

// Configure transport
const sendEmail = async(mail)=>{
    var transport = {
        host: process.env.EMAIL_HOST,
        port: 587,
        auth:{
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    }
    
    // Create Transport
    var transporter = nodemailer.createTransport(transport);
    // await new Promise((resolve,reject)=>{
    //     transporter.verify((error,success)=>{
    //         if(error){
    //             console.log(error);
    //             reject(error);
    //         }
    //         else{
    //             console.log('Server is ready to take message');
    //             resolve(success);
    //         }
    //     })
    // })

    transporter.sendMail(mail,(err,info)=>{
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




