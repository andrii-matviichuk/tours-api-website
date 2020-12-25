const nodemailer = require('nodemailer');

const sendEmail = (options) => {
  // Create transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Define email options
  const emailOptions = {
    from: 'Andrii Matviichuk <hello@ok.io>',
    to: options.to,
    subject: options.subject,
    text: options.message,
    // html
  };

  // Send email
  transporter.sendMail(emailOptions);
};

module.exports = sendEmail;
