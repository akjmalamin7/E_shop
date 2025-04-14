const { Schema, model } = require("mongoose");
const reviewSchema = Schema(
  {
    product_id: { type: Schema.Types.ObjectId },
    user_id: { type: Schema.Types.ObjectId },
    des: { type: String, required: true },
    rating: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);
const ReviewModel = model("review",reviewSchema)
module.exports = ReviewModel