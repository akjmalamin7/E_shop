const productSliderModel = require("../../models/product/productSliderModel")
const { sliderListService } = require("../../services/slider/sliderService")

exports.createSlider = async(req,res)=>{}
exports.sliderList = async(req,res)=>{
  await sliderListService(req,res, productSliderModel)
}