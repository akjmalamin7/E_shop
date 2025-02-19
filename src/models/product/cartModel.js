const { Schema, model } = require("mongoose");
const cartSchema = new Schema(
  {
    productID:{type:Schema.Types.ObjectId, required:true},
    userID:{type:Schema.Types.ObjectId, required:true},
    color:{type:String, required:true},
    qty:{type:String, color:true},
    size:{type:String, color:true},
  },
  { timestamps: true, versionKey: false }
);

const cardModel = model("cart", cartSchema);
module.exports = cardModel;
