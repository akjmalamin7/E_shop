const { Schema, model } = require("mongoose");
const wishSchema = new Schema(
  {
    product_id:{type:Schema.Types.ObjectId, required:true},
    user_id:{type:Schema.Types.ObjectId, required:true},
  },
  { timestamps: true, versionKey: false }
);

const wishModel = model("wishes", wishSchema);
module.exports = wishModel;
