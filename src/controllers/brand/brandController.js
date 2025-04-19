const brandModel = require("../../models/brand/brandModel")
const { brandListService } = require("../../services/brand/brandService")
const { createService } = require("../../services/create/CreateService")

exports.createBrand = async(req,res)=>{
  await createService(req,res,brandModel)
}
exports.brandList = async(req,res)=>{
  await brandListService(req,res,brandModel)
}