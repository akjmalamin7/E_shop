const categoryModel = require("../../models/category/categoryModel")
const {  categoryListService } = require("../../services/category/categoryService")
const { createService } = require("../../services/create/CreateService")

exports.createCategory = async(req,res)=>{
  await createService(req,res, categoryModel)
}
exports.categoryList = async(req,res)=>{
  await categoryListService(req,res)
}