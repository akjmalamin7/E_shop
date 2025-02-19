const { Schema, model } = require("mongoose");
const productDetailsSchema = new Schema(
  {
    image1: { type: String, required: true },
    image2: { type: String, required: true },
    image3: { type: String, required: true },
    image4: { type: String, required: true },
    image5: { type: String },
    image6: { type: String },
    image7: { type: String },
    image8: { type: String },
    des:{type:String, required:true},
    color:{type:String, required:true},
    size:{type:String, required:true},
    productID: { type: Schema.Types.ObjectId, required: true },
  },
  { timestamps: true, versionKey: false }
);

const productDetailsModel = model("productDetails", productDetailsSchema);
module.exports = productDetailsModel;
