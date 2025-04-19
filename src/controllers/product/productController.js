const productModel = require("../../models/product/productModel.js");
const { createService } = require("../../services/create/CreateService.js");
const {
  productsService,
  productDetailsService,
  productListByBrandService,
  productListByCategoryService,
  productListByKeywordService,
  productListByRemarkService,
  productListBySimilarService,
  productReviewListService,
} = require("../../services/products/productService.js");
exports.createProduct = async(req,res)=>{
  await createService(req,res,productModel);
}
exports.productListByBrand = async (req, res) => {
  await productListByBrandService(req, res)
};
exports.productListByCategory = async (req, res) => {};
exports.productListBySimilar = async (req, res) => {};
exports.productListByKeyword = async (req, res) => {};
exports.productListByRemark = async (req, res) => {};
exports.productReviewList = async (req, res) => {};
exports.createProductReview = async (req, res) => {};
exports.productDetails = async (req, res) => {};
