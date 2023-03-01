const nodemailer = require('nodemailer');

// Configure transport
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
transporter.verify((error,success)=>{
    if(error){
        console.log(error);
    }
    else{
        console.log('Server is ready to take message');
    }
})

module.exports = transporter;




