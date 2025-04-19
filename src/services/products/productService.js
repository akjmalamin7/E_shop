const mongoose = require("mongoose");
const productModel = require("../../models/product/productModel");
const productDetailsModel = require("../../models/product/productDetailsModel");

const productReviewModel = require("../../models/product/reviewModel");

const productListService = async (req, res) => {};
const productDetailsService = async (req, res) => {};
const productListByBrandService = async (req, res) => {
  try {
    const { brand_id } = req.params;
    /* check valid id */
    if (!mongoose.Types.ObjectId.isValid(brand_id)) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid brand_id. Must be a 24-character hex string.",
      });
    }

    const match_brands = {
      $match: {
        brand_id: new mongoose.Types.ObjectId(brand_id),
      },
    };
    const join_with_brands = {
      $lookup: {
        from: "brands",
        localField: "brand_id",
        foreignField: "_id",
        as: "brands",
      },
    };
    const join_with_category = {
      $lookup: {
        from: "categories",
        localField: "category_id",
        foreignField: "_id",
        as: "categories",
      },
    };
    const projection = {
      $project:{
        _id:1,
        title:1,
        price:1,
        discount:1,
        discount_price:1,
        image:1,
        stock:1,
        brand_id:1,
        category_id:1,
        brand: { $arrayElemAt: ["$brands", 0] },
        category: { $arrayElemAt: ["$categories", 0] }
      }
    }

    // arrayElemAt and unwind work same
    const unwindBrand ={$unwind:"$brands"}
    const unwindCategories ={$unwind:"$categories"}

    const data = await productModel.aggregate([
      match_brands,
      join_with_brands,
      join_with_category,
      projection
    ]);

    res.status(200).json({
      status:"success",
      message:"Successfully retrieve",
      data:data
    })
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message
    });
  }
};
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
