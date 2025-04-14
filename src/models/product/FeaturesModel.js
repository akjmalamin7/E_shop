const { Schema, model } = require("mongoose");
const featuresSchema = new Schema(
  {
    name:{type:String, required:true},
    des:{type:String, required:true},
    img:{type:String, required:true},
  },
  { timestamps: true, versionKey: false }
);

const featuresModel = model("features", featuresSchema);
module.exports = featuresModel;
