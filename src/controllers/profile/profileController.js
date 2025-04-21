const userProfileModel = require("../../models/profile/profileModel");
const { createService } = require("../../services/create/CreateService");

exports.profileController = async (req, res) => {
  await createService(req,res,userProfileModel)
};
