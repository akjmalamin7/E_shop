const createCartService = async (req, dataModel) => {
  try {
    const userId = req.user._id;
    const { product_id, color, qty, size } = req.body;

    // Check if product already exists in cart
    const existingCartItem = await dataModel.findOne({ user_id: userId, product_id });

    if (existingCartItem) {
      return {
        status: "fail",
        message: "Product already in cart",
      };
    }

    // Create and save new cart item
    const newCartItem = new dataModel({ user_id: userId, product_id,color,qty,size });
    const savedCartItem = await newCartItem.save();

    return {
      status: "success",
      message: "Product added to cart",
      data: savedCartItem,
    };
  } catch (err) {
    return {
      status: "fail",
      message: "Failed to add to cart",
      error: err.message,
    };
  }
};

module.exports = { createCartService };
