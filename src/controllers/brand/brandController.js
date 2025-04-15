const { brandListService } = require("../../services/brand/brandService")

exports.createBrand = async(req,res)=>{}
exports.brandList = async(req,res)=>{
  await brandListService(req,res)
}