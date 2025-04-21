const mongoose = require("mongoose");
exports.productListByKeywords = async (req, res, dataModel) => {
  try {

    let search_regex = { $regex: req.params.keyword, $options: "i" };
    let search_params = [{ title: search_regex }, { short_des: search_regex }];
    let search_query = { $or: search_params };

    const match_keyword = {
      $match: search_query,
    };

    const join_with_brands = {
      $lookup: {
        from: "brands",
        localField: "brand_id",
        foreignField: "_id",
        as: "brand",
      },
    };
    let join_with_category = {
      $lookup: {
        from: "categories",
        localField: "category_id",
        foreignField: "_id",
        as: "category",
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
      },
    };
    const data = await dataModel.aggregate([
      match_keyword,
      join_with_brands,
      join_with_category,
      projection,
    ]);
   return res.status(200).json({
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
