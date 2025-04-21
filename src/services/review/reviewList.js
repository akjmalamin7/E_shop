const mongoose = require("mongoose");
exports.reviewListService = async (req, res, dataModel) => {
  try {
    const { product_id } = req.params;
    /*
        check brand id is valid or not 
        */
    if (!mongoose.Types.ObjectId.isValid(product_id)) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid product_id. Must be a 24-character hex string.",
      });
    }
    const match_product_id = {
      $match: {
        product_id: new mongoose.Types.ObjectId(product_id),
      },
    };
    const join_with_profile = {
      $lookup: {
        from: "userprofiles",
        localField: "user_id",
        foreignField: " _id",
        as: "profile",
      },
    };

    const projection = {
      $project: {
        des:1,
        rating:1,
        "profile.cus_name": 1,
      },
    };
    const data = await dataModel.aggregate([
      match_product_id,
      join_with_profile,
      projection,
    ]);
    return res.status(200).json({
      status: "success",
      message: "Successfully created",
      data: data,
    });
  } catch (err) {
    return res.status(400).json({ status: "fail", message: err.message });
  }
};
