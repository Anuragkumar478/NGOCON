import nodemailer from "nodemailer";

export const sendEmail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.example.com",
    port: 587,
    auth: { user: "your_email@example.com", pass: "your_password" }
  });

  await transporter.sendMail({
    from: "NGO Platform <noreply@ngoplatform.com>",
    to,
    subject,
    text
  });
};
