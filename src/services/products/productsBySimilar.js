const mongoose = require("mongoose");
exports.productListBySimilar = async (req, res, dataModel) => {
  try {
    const {category_id} = req.params;

    /*
    check brand id is valid or not 
    */
    if (!mongoose.Types.ObjectId.isValid(category_id)) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid brand_id. Must be a 24-character hex string.",
      });
    }

    const match_similar = {
      $match: {
        category_id: new mongoose.Types.ObjectId(category_id),
      },
    };
    const limit_stage = { $limit: 10 };

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

    const projection = {
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
              b: { arrayElemAt: ["$brand", 0] },
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
      },
    };
    const data = await dataModel.aggregate([
      match_similar,
      limit_stage,
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
