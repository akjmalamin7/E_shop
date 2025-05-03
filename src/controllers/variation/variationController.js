const variationModel = require("../../models/variation/variationModel");
const {
  getVariationService,
  createVariationService,
  updateVariationService,
  delateVariationService,
} = require("../../services/variation/variationService");
const getVariationListController = async (req, res) => {
  let result = await getVariationService(req, variationModel);
  res.status(result.status === "success" ? 200 : 500).json(result);
};
const createVariationController = async (req, res) => {
  let result = await createVariationService(req, variationModel);
  res.status(result.status === "success" ? 201 : 500).json(result);
};
const updateVariationController = async (req, res) => {
  let result = await updateVariationService(req, variationModel);
  res.status(result.status === "success" ? 200 : 500).json(result);
};
const deleteVariationController = async (req, res) => {
  let result = await delateVariationService(req, variationModel);
  res.status(result.status === "success" ? 200 : 500).json(result);
};
module.exports = {
  getVariationListController,
  createVariationController,
  updateVariationController,
  deleteVariationController,
};
