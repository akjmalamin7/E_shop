const { Schema, model } = require("mongoose");
const productSlicerSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    image: { type: String, required: true },
    productID: { type: Schema.Types.ObjectId, required: true },
  },
  { timestamps: true, versionKey: false }
);

const productSliderModel = model("productSlider", productSlicerSchema);
module.exports = productSliderModel;
