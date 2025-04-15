const brandModel = require("../../models/brand/brandModel")

const brandListService = async(req,res)=>{
  try{
      let brands = await brandModel.find({});
     return res.status(200).json({status:"success",message:"Brand data successfully retrieve",data:brands})
  }catch(err){
    return res.status(400).json({status:"fail",message:"Brand data not retrieve",data:[]})
  }
}
module.exports = {brandListService}