const nodemailer = require('nodemailer');

// Configure transport
const sendEmail = async(req,res)=>{
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
    await new Promise((resolve,reject)=>{
        transporter.verify((error,success)=>{
            if(error){
                console.log(error);
                reject(error);
            }
            else{
                console.log('Server is ready to take message');
                resolve(success);
            }
        })
    })
}


module.exports = sendEmail;




