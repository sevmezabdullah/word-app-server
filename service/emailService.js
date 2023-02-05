const nodemailer = require('nodemailer');
const { sendConfirmationEmail } = require('./verification_email');
require('dotenv').config({ path: '../config/config.env' });

async function sendEmail(to, subject, registerCode, name) {
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    tls: {
      rejectUnauthorized: false,
    },
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASS,
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: process.env.SMTP_EMAIL, // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    text: 'Hello world?', // plain text body
    html: sendConfirmationEmail(name, to, registerCode), // html body
  });
  console.log('Message sent: %s', info.messageId);

  return await true;
}

module.exports = {
  sendEmail,
};
