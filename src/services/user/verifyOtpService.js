const verifyOtpService = async (req, dataModel) => {
  try {
    const { email, otp } = req.body;

    const count = await dataModel.countDocuments({ email, otp });
    const user = await dataModel.findOne({ email, otp });

    if (count > 0 && user) {
      const token = user.generateJWT();
      await dataModel.updateOne({ email }, { $set: { otp: "0" } });

      return {
        status: "success",
        message: "OTP matched",
        token
      };
    } else {
      return {
        status: "fail",
        message: "Invalid OTP"
      };
    }

  } catch (err) {
    return {
      status: "fail",
      message: "Something went wrong",
      error: err.message
    };
  }
};

module.exports = { verifyOtpService };
