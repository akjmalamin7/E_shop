const { Schema, model } = require("mongoose");
const cartSchema = new Schema(
  {
    product_id:{type:Schema.Types.ObjectId, required:true},
    user_id:{type:Schema.Types.ObjectId, required:true},
    color:{type:String, required:true},
    qty:{type:String, color:true},
    size:{type:String, color:true},
  },
  { timestamps: true, versionKey: false }
);

const cartModel = model("cart", cartSchema);
module.exports = cartModel;
