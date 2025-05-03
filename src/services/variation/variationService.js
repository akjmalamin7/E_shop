const getVariationService = async (req, dataModel) => {
  try {
    const variations = await dataModel.find();
    return {
      status: "success",
      message: "Successfully fetch variations",
      data:variations
    };
  } catch (err) {
    return { status: "fail", message: "Failed to fetch variations", error: err.message };
  }
};
const createVariationService = async (req, dataModel) => {
  const { product_id, size, color, stock, price } = req.body;
  try {
    const newVariation = new dataModel({ product_id, size, color, stock, price });
    await newVariation.save();
    return { status: "success", message: "Variation added successfully", data: newVariation };
  } catch (err) {
    return { status: "fail", message: "Failed to add variation", error: err.message };
  }
};
const updateVariationService = async (req, dataModel) => {
  try {
    const variation = await dataModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!variation) {
      return { status: "fail", message: "Variation not found"}
    }
    return { status: "success", message: "Variation updated successfully", data: variation };
  } catch (err) {
    return { status: "fail", message: "Failed to update variation", error: err.message };
  }
};
const delateVariationService = async (req, dataModel) => {
  try {
    const variation = await dataModel.findByIdAndDelete(req.params.id);
    if (!variation) {
      return { status: "fail", message: "Variation not found"}
    }
    return { status: "success", message: "Variation deleted successfully", data: variation };
  } catch (err) {
    return { status: "fail", message: "Failed to delete variation", error: err.message };
  }
};

module.exports = {
  getVariationService,
  createVariationService,
  updateVariationService,
  delateVariationService
};
