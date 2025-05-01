const { emailSender } = require("../../utils/emailHelper");

const otpService = async (req, res, dataModel) => {
  try {
    let {email} = req.body;
    let otp_code = Math.floor(100000 + Math.random() * 900000);

    let email_text = `Your verification code is = ${otp_code}`;
    let email_subject = `Email verification`;

    await emailSender({ emailTo: email, emailText: email_text, emailSubject: email_subject });

    await dataModel.updateOne({ email: email }, { $set: { otp: otp_code } }, { upsert: true });

    return res.status(200).json({ status: "success", message: "6 Digit OTP has been send" });
  } catch (err) {
    return res.status(400).json({ status: "fail", message: "Something went wrong" });
  }
};
module.exports = { otpService };
