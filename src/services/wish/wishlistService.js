const mongoose = require("mongoose");
const createWishService = async (req, dataModel) => {
  try {
    const userId = req.user._id;
    const { product_id } = req.body;
    const existingWish = await dataModel.findOne({ user_id: userId, product_id });

    if (existingWish) {
      return {
        status: "fail",
        message: "Product already in wishlist",
      };
    }

    const result = await dataModel({ user_id: userId, product_id });
    const data = await result.save();
    return {
      status: "success",
      message: "Product added to wishlist",
      data: data,
    };
  } catch (err) {
    return {
      status: "fail",
      message: "Failed to add to wishlist",
      error: err.message,
    };
  }
};
const updateWishlistService = async (req, dataModel) => {
  try {
    const userId = req.user._id;
    const { wishId } = req.params;
    const { product_id } = req.body;

    const existingWish = await dataModel.findOne({
      _id: { $ne: wishId },
      user_id: userId,
      product_id,
    });

    if (existingWish) {
      return {
        status: "fail",
        message: "This product is already in your wishlist",
      };
    }

    const updatedWish = await dataModel.findOneAndUpdate(
      { _id: wishId, user_id: userId },
      { product_id },
      { new: true }
    );

    if (!updatedWish) {
      return {
        status: "fail",
        message: "Wishlist item not found or unauthorized",
      };
    }

    return {
      status: "success",
      message: "Wishlist updated successfully",
      data: updatedWish,
    };
  } catch (err) {
    return {
      status: "fail",
      message: "Failed to update wishlist",
      error: err.message,
    };
  }
};
const deleteWishlistService = async (req, dataModel) => {
  try {
    const userId = req.user._id;
    const { wishId } = req.params;

    const deletedWish = await dataModel.findOneAndDelete({
      _id: wishId,
      user_id: userId,
    });

    if (!deletedWish) {
      return {
        status: "fail",
        message: "Wishlist item not found or unauthorized",
      };
    }

    return {
      status: "success",
      message: "Wishlist item deleted successfully",
    };
  } catch (err) {
    return {
      status: "fail",
      message: "Failed to delete wishlist item",
      error: err.message,
    };
  }
};
const getWishlistService = async (req, res, dataModel) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user._id);

    // Step 1: Filter wishlist by user
    const match_stage = {
      $match: { user_id: userId }
    };

    // Step 2: Join with products collection
    const join_with_products = {
      $lookup: {
        from: "products",
        localField: "product_id",
        foreignField: "_id",
        as: "productDetails",
      }
    };

    // Step 3: Unwind productDetails array
    const unwind_product = {
      $unwind: "$productDetails"
    };

    // Step 4: Join with brand using productDetails.brand_id
    const join_with_brand = {
      $lookup: {
        from: "brands",
        localField: "productDetails.brand_id",
        foreignField: "_id",
        as: "brand"
      }
    };

    // Step 5: Join with category using productDetails.category_id
    const join_with_category = {
      $lookup: {
        from: "categories",
        localField: "productDetails.category_id",
        foreignField: "_id",
        as: "category"
      }
    };

    // Step 6: Final projection
    const projection = {
      $project: {
        _id: 1,
        user_id: 1,
        product_id: 1,
        createdAt: 1,
        productDetails: {
          $let:{
            vars:{
              p:{ $arrayElemAt:["$productDetails",0]}
            },in:{
              _id: "$$p._id",
              title: "$$p.title",
              image: "$$p.image",
              price: "$$p.price",
            }
          }
        },
        brand: {
          $let: {
            vars: {
              b: { $arrayElemAt: ["$brand", 0] },
            },
            in: {
              _id: "$$b._id",
              name: "$$b.name",
              image: "$$b.image",
            }
          }
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
            }
          }
        }
      }
    };

    // Step 7: Run aggregation
    const data = await dataModel.aggregate([
      match_stage,
      join_with_products,
      // unwind_product,
      join_with_brand,
      join_with_category,
      projection
    ]);

    return {
      status: "success",
      message: "Successfully fetched wishlist",
      data: data,
    };

  } catch (err) {
    return {
      status: "fail",
      message: "Failed to fetch wishlist items",
      error: err.message,
    };
  }
};


module.exports = {
  createWishService,
  updateWishlistService,
  deleteWishlistService,
  getWishlistService,
};
