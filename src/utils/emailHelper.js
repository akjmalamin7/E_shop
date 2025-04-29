const path = require("path");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const emailSender = async (emailTo, emailText, emailSubject) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: emailTo,
    subject: emailSubject,
    text: emailText,
  };

  return await transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return;
    } else {
      console.log(info.response);
    }
  });
};
