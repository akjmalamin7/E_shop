const productModel = require("../../models/product/productModel.js");
const { createService } = require("../../services/create/CreateService.js");
const { productListByBrandService } = require("../../services/products/productsByBrand.js");
const { productListByCategories } = require("../../services/products/productsByCategory.js");
const { productListByRemark } = require("../../services/products/productsByRemark.js");
const {
  productsService,
  productDetailsService,
  productListByKeywordService,
  productListBySimilarService,
  productReviewListService,
} = require("../../services/products/productService.js");
exports.createProduct = async(req,res)=>{
  await createService(req,res,productModel);
}
exports.productListByBrand = async (req, res) => {
  await productListByBrandService(req, res, productModel)
};
exports.productListByCategory = async (req, res) => {
  await productListByCategories(req, res, productModel)
};
exports.productListBySimilar = async (req, res) => {};
exports.productListByKeyword = async (req, res) => {};
exports.productListByRemark = async (req, res) => {
  await productListByRemark(req,res,productModel)
};
exports.productReviewList = async (req, res) => {};
exports.createProductReview = async (req, res) => {};
exports.productDetails = async (req, res) => {};
