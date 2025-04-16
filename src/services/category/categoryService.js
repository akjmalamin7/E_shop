const categoryModel = require("../../models/category/categoryModel")

const categoryListService = async(req,res)=>{
  try {
    let categories = await categoryModel.find({});
    return res
      .status(200)
      .json({ status: "success", message: "Categories data successfully retrieve", data: categories });
  } catch (err) {
    return res.status(400).json({ status: "fail", message: "Brand data not retrieve", data: [] });
  }
}
module.exports = {categoryListService}