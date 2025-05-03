const mongoose = require("mongoose");
const { Schema } = mongoose;

const variationSchema = new Schema(
  {
    product_id: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    size: { type: String, required: true },
    color: { type: String, required: true },
    stock: { type: Number, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: true,versionKey:false }
);

const variationModel = mongoose.model("Variation", variationSchema);
module.exports = variationModel;
