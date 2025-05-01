const userProfileModel = require("../../models/profile/profileModel");
const userModel = require("../../models/user/userModel");
const { createService } = require("../../services/create/CreateService");
const { createProfileService } = require("../../services/user/createProfileService");
const { logoutService } = require("../../services/user/logoutService");
const { otpService } = require("../../services/user/otpService");
const { readProfileService } = require("../../services/user/readProfileService");
const { updateProfileService } = require("../../services/user/updateProfileService");
const { verifyOtpService } = require("../../services/user/verifyOtpService");

exports.createUserController = async (req, res) => {
  await createService(req, res, userModel);
};
/* OTP */
exports.userOtpController = async (req, res) => {
  await otpService(req, res, userModel);
};
exports.userVerifyOtpController = async (req, res) => {
  try {
    const result = await verifyOtpService(req, userModel);

    if (result.status === "success") {
      const cookieOptions = {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), 
        httpOnly: true,
        secure: process.env.NODE_ENV === "production"
      };

      res.cookie("token", result.token, cookieOptions);

      return res.status(200).json({
        status: "success",
        message: "Login successful",
        token: result.token
      });
    } else {
      return res.status(401).json(result);
    }
  } catch (err) {
    return res.status(500).json({
      status: "fail",
      message: "Internal server error",
      error: err.message
    });
  }
 
};
exports.userLogoutController = async (req, res) => {
  await logoutService(req, res);
};

exports.userCreateProfileController = async (req, res) => {
   const result =  await createProfileService(req, res, userProfileModel);
   return res.status(result.status === "success"? 200:400).json(result)
};
exports.updateUserProfileController = async (req, res) => {
  const result = await updateProfileService(req,res,userProfileModel);
  return res.status(result.status === "success" ? 200 : 400).json(result);
};
exports.userReadProfileController = async (req, res) => {
  const result = await readProfileService(req, res, userProfileModel);
  return res.status(result.status === "success" ? 200 : 400).json(result);
};
