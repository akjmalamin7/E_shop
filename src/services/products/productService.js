const productModel = require("../../models/product/productModel");
const productDetailsModel = require("../../models/product/productDetailsModel");
const productReviewModel = require("../../models/product/reviewModel");

const productListService = async (req, res) => {};
const productDetailsService = async (req, res) => {};
const productListByBrandService = async (req, res) => {};
const productListByCategoryService = async (req, res) => {};
const productListByKeywordService = async (req, res) => {};
const productListByRemarkService = async (req, res) => {};
const productListBySimilarService = async (req, res) => {};
const productReviewListService = async (req, res) => {};

module.exports = {
  productListService,
  productDetailsService,
  productListByBrandService,
  productListByCategoryService,
  productListByKeywordService,
  productListByRemarkService,
  productListBySimilarService,
  productReviewListService,
};
