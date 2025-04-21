const userModel = require("../../models/user/userModel");
const { createService } = require("../../services/create/CreateService");

exports.userController = async (req, res) => {
  await createService(req, res, userModel);
};
