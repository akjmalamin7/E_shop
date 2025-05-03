const updateCartService = async (req, dataModel) => {
  try {
    const userId = req.user._id;
    const cart_id = req.params.cart_id;
    const updateData = req.body;

    // 1. Validate if update data is provided
    if (!updateData || Object.keys(updateData).length === 0) {
      return {
        status: "fail",
        message: "No update data provided",
      };
    }

    // 2. Check if the cart item exists and belongs to the user
    const cartItem = await dataModel.findOne({ _id: cart_id, user_id: userId });

    if (!cartItem) {
      return {
        status: "fail",
        message: "Cart item not found or does not belong to this user",
      };
    }

    // 3. Proceed to update
    await dataModel.updateOne(
      { _id: cart_id, user_id: userId },
      { $set: updateData }
    );

    return {
      status: "success",
      message: "Cart item updated successfully",
    };
  } catch (err) {
    return {
      status: "fail",
      message: "Failed to update cart item",
      error: err.message,
    };
  }
};

module.exports = {
  updateCartService,
};
