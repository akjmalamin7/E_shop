const { Schema, model } = require("mongoose");
const wishSchema = new Schema(
  {
    productID:{type:Schema.Types.ObjectId, required:true},
    userID:{type:Schema.Types.ObjectId, required:true},
  },
  { timestamps: true, versionKey: false }
);

const wishModel = model("wish", wishSchema);
module.exports = wishModel;
