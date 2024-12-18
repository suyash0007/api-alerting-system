const nodemailer = require('nodemailer');
require('dotenv').config();

//SMTP server configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host:'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,//email used to send the email alerts
    pass: process.env.EMAIL_PASS,//app-password
  },
});

const sendEmailAlert = async (ip, failedCount) => {
  const mailOptions = {
    from: {
        name:'Warning',
        address:process.env.EMAIL_USER
        
    },
    
    to: 'tiwarisuyash40@gmail.com',//recievers email
    subject: `Alert: Too many incorrect login attempts from ${ip}`,//subject of email
    text: `The IP ${ip} has triggered ${failedCount} failed requests in past 10 minutes.`,//email content
  };

  try {
    //using nodemailer functionality to send email alerts
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully')
  } catch (error) {
    console.error(error)
  }

  
};

module.exports = sendEmailAlert;
