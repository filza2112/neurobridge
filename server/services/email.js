// server/services/email.js
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,       // e.g., 'youremail@gmail.com'
    pass: process.env.EMAIL_PASSWORD,  // app password
  },
});

async function sendAlertEmail(to, subject, message) {
  const mailOptions = {
    from: `"NeuroBridge Alert" <${process.env.ALERT_EMAIL}>`,
    to,
    subject,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Alert email sent to", to);
  } catch (err) {
    console.error("Email error:", err.message);
  }
}

module.exports = { sendAlertEmail };
