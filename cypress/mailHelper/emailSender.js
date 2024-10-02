import { config } from "dotenv";
import nodemailer from "nodemailer";
import path from "path";

config();

// Configure SMTP settings for Outlook
const smtpConfig = {
  host: "smtp.office365.com",
  port: 587,
  secure: false,
  auth: {
    // FETCH EMAIL CREDENTIALS FROM THE .env FILE
    user: process.env.USERNAME,
    pass: process.env.PASSWORD,
  },
};

// Create a SMTP transporter for Outlook
const transporter = nodemailer.createTransport(smtpConfig);

// Function to send email
export async function sendEmail(
  toRecipients,
  ccRecipients,
  subject,
  mailBody,
  attachmentPaths
) {
  const attachments = attachmentPaths.map((attachment) => ({
    filename: path.basename(attachment),
    path: attachment,
  }));

  // Create the email message
  const mailOptions = {
    from: process.env.USERNAME,
    to: toRecipients,
    cc: ccRecipients,
    subject: subject,
    html: mailBody,
    attachments: attachments,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        reject(new Error("Something went wrong while sending the email."));
      } else {
        console.log("Email sent:", info.response);
        resolve("Email sent successfully.");
      }
    });
  });
}
