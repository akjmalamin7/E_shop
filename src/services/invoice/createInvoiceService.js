const createInvoiceService = async ({
  req,
  ObjectID,
  invoiceModel,
  cartModel,
  profileModel,
  invoiceProductModel,
}) => {
  try {
    const user_id = new ObjectID(req.user._id);
    const cus_email = req.user.email;

    /* =====================================
    step 01: Calculate Total  Payable & Vat
    ======================================== */
    const match_with_user = {
      $match: {
        user_id: user_id,
      },
    };
    const join_with_product = {
      $lookup: {
        from: "products",
        localField: "product_id",
        foreignField: "_id",
        as: "product",
      },
    };

    const projection = {
      $project: {
        product: { $arrayElemAt: ["$product", 0] },
      },
    };
    const unwind_Stage = { $unwind: "$product" };
    const cart_products = await cartModel.aggregate([
      match_with_user,
      join_with_product,
      unwind_Stage,
    ]);

    const total_amount = cart_products.reduce((sum, item) => {
      const has_discount = item.product.discount === true;
      const price =
        parseFloat(has_discount ? item.product.discount_price : item.product.price) || 0;
      const quantity = parseInt(item.qty) || 1;

      return sum + price * quantity;
    }, 0);
    const vat = total_amount * 0.05;
    const total_payable = total_amount + vat;

    /* =====================================
    step 02: Prepare Customer Details & Shipping Details
    ======================================== */
    const customer_profile = await profileModel.aggregate([match_with_user]);
    const customer_details = Object.fromEntries(
      Object.entries(customer_profile[0])
        .filter(([key]) => key.startsWith("cus_"))
        .map(([key, value]) => [key.replace("cus_", ""), value])
    );
    if (customer_details.add) {
      customer_details.address = customer_details.add;
      delete customer_details.add;
    }
    customer_details.email = cus_email;
    const shipping_details = Object.fromEntries(
      Object.entries(customer_profile[0])
        .filter(([key]) => key.startsWith("ship_"))
        .map(([key, value]) => [key.replace("ship_", ""), value])
    );

    if (shipping_details.add) {
      shipping_details.address = shipping_details.add;
      delete shipping_details.add;
    }
    /* =====================================
    step 03: Transactions and Other's ID
    ======================================== */
    const transaction_id = `TXT-${Math.floor(10000000 + Math.random() * 90000000)}`;
    let val_id = 0;
    let delivery_status = "pending";
    let payment_status = "pending";
    /* =====================================
    step 04: Create Invoice
    ======================================== */
    let create_invoice = new invoiceModel({
      user_id: user_id,
      payable: total_payable,
      cus_details: customer_details,
      ship_details: shipping_details,
      val_id: val_id,
      delivery_status: delivery_status,
      payment_status: payment_status,
      total: total_amount,
      vat: vat,
    });
    let create_invoice_data = await create_invoice.save();

    /* =====================================
    step 05: Create Invoice Product
    ======================================== */

    let invoice_id = create_invoice_data._id;

    const invoiceProducts = cart_products.map((element) => ({
      product_id: element["product_id"],
      user_id: user_id,
      invoice_id: invoice_id,
      qty: element["qty"],
      price: element["product"]["discount"]
        ? element["product"]["discount_price"]
        : element["product"]["price"],
      color: element["color"],
      size: element["size"],
    }));

    await invoiceProductModel.insertMany(invoiceProducts);
    /* =====================================
    step 06: Remove Carts
    ======================================== */
    await cartModel.deleteMany({ user_id: user_id });
    /* =====================================
    step 06: Prepare SSL Payment
    ======================================== */

    return {
      status: "success",
      message: "Successfully done",
      // data: cart_products,
      invoice_product: invoiceProducts,
      invoice_id: invoice_id,
      customer_details: customer_details,
      shipping_details: shipping_details,
      total_price: total_amount,
      vat: vat,
      payable: total_payable,
      transaction_id: transaction_id,
    };
  } catch (err) {
    return {
      status: "fail",
      error: err.message,
    };
  }
};
module.exports = { createInvoiceService };
