const { Schema, model } = require("mongoose");
const categorySchema = new Schema(
  {
    name: { type: String, required: true },
    image: { type: String, },
  },
  { timestamps: true, versionKey: false }
);

const categoryModel = model("categories", categorySchema);
module.exports = categoryModel;
