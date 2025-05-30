const { Schema, model } = require("mongoose");
const productSchema = new Schema(
  {
    title: { type: String, required: true },
    short_des: { type: String, required: true },
    price: { type: String, required: true },
    discount: { type: Boolean, required: true },
    discount_price: { type: String, required: true },
    image: { type: String, required: true },
    star: { type: String, required: true },
    stock: { type: Boolean, required: true },
    remark: { type: String, required: true },
    category_id: { type: Schema.Types.ObjectId, required: true },
    brand_id: { type: Schema.Types.ObjectId, required: true },
  },
  { timestamps: true, versionKey: false }
);

const productModel = model("product", productSchema);
module.exports = productModel;
