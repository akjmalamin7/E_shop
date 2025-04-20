const { Schema, model } = require("mongoose");
const productDetailsSchema = new Schema(
  {
    images: {
      type: [String],
      required: true,
      validate: {
        validator: (v) => Array.isArray(v) && v.length >= 3,
        message: () => `At least 4 images are required.`,
      },
    },
    
    des: { type: String, required: true },
    color: { type: String, required: true },
    size: { type: String, required: true },
    product_id: { type: Schema.Types.ObjectId, required: true },
  },
  { timestamps: true, versionKey: false }
);

const productDetailsModel = model("productDetails", productDetailsSchema);
module.exports = productDetailsModel;
