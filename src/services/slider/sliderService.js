const sliderModel = require("../../models/product/productSliderModel")


const sliderListService = async (req, res,dataModel) => {
  try {
    let brands = await dataModel.find({});
    return res
      .status(200)
      .json({ status: "success", message: "Slider data successfully retrieve", data: brands });
  } catch (err) {
    return res.status(400).json({ status: "fail", message: "Slider data not retrieve", data: [] });
  }
};


module.exports = {sliderListService}