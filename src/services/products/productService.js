const mongoose = require("mongoose");
const productModel = require("../../models/product/productModel");
const productDetailsModel = require("../../models/product/productDetailsModel");

const productReviewModel = require("../../models/product/reviewModel");

const createProductDetails = async (req, res) => {
  try {
    const { images } = req.body;

    // Validation (optional but good practice)
    if (!images || images.length < 3) {
      return res.status(400).json({
        status: "fail",
        message: "At least 3 images are required.",
      });
    }

    const newDetails = new productDetailsModel(req.body);

    const data = await newDetails.save();

    return res.status(201).json({
      status: "success",
      message: "Product details created successfully!",
      data: data,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};
const productDetailsService = async (req, res) => {
  try {
    const { product_id } = req.params;

    const match_product_id = {
      $match: { _id: new mongoose.Types.ObjectId(product_id) },
    };
    const join_with_brands = {
      $lookup: {
        from: "brands",
        localField: "brand_id",
        foreignField: "_id",
        as: "brand",
      },
    };
    const join_with_category = {
      $lookup: {
        from: "categories",
        localField: "category_id",
        foreignField: "_id",
        as: "category",
      },
    };
    const join_with_product_details = {
      $lookup: {
        from: "productdetails",
        localField: "_id",
        foreignField: "product_id",
        as: "details",
      },
    };
    let projection = {
      $project: {
        _id: 1,
        title: 1,
        image: 1,
        price: 1,
        discount_price: 1,
        discount: 1,
        remark: 1,
        brand: {
          $let: {
            vars: {
              b: { $arrayElemAt: ["$brand", 0] },
            },
            in: {
              _id: "$$b._id",
              name: "$$b.name",
              image: "$$b.image",
            },
          },
        },
        category: {
          $let: {
            vars: {
              c: { $arrayElemAt: ["$category", 0] },
            },
            in: {
              _id: "$$c._id",
              name: "$$c.name",
              image: "$$c.image",
            },
          },
        },
        details: {
          $cond: [
            { $gt: [{ $size: "$details" }, 0] },
            {
              $let: {
                vars: { d: { $arrayElemAt: ["$details", 0] } },
                in: {
                  images: "$$d.images",
                  des: "$$d.des",
                  color: "$$d.color",
                  size: "$$d.size",
                },
              },
            },
            {}, // if no details found
          ],
        },
      },
    };

    const data = await productModel.aggregate([
      match_product_id,
      join_with_product_details,
      join_with_brands,
      join_with_category,
      projection,
    ]);
    res.status(200).json({
      status: "success",
      message: "Successfully retrieve",
      data: data,
    });
  } catch (err) {
    return res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};


const productListService = async (req, res) => {
  try {
    const products = await productModel.find({});
    return res.status(200).json({
      status:"success",
      message:"Successfully retrieve",
      data:products
    })
  } catch (err) {
    return rest.status(500).json({
      status: "fail",
      message: "Product not found",
      error: err.message,
    });
  }
};

module.exports = {
  createProductDetails,
  productListService,
  productDetailsService,
};
