const removeCartService = async (req, dataModel) => {
  try {
    const userId = req.user._id;
    const req_body = { ...req.body, user_id: userId };

    const result = await dataModel.deleteOne(req_body);

    if (result.deletedCount === 0) {
      return {
        status: "fail",
        message: "Item not found in the cart or already removed",
      };
    }

    return {
      status: "success",
      message: "Item removed from cart successfully"
    };
  } catch (err) {
    return {
      status: "fail",
      message: "Failed to remove from the cart",
      error: err.message,
    };
  }
};

module.exports = { removeCartService };
