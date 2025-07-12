import nodemailer from "nodemailer";

export async function sendEmailAlert(to, subject, body) {
  // Configure your email service (Gmail used here)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,       // your Gmail address
      pass: process.env.EMAIL_PASSWORD,   // app password (not Gmail login)
    },
  });

  const mailOptions = {
    from: `"NeuroBridge Alert" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text: body,
    html: `<p>${body}</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}`);
  } catch (err) {
    console.error("Email sending failed:", err.message);
  }
}
