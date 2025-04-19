const {Schema, model} = require("mongoose");

const brandSchema = new Schema({
  name:{type:String, require:true, unique:true},
  image:{type:String}
}, { timestamps: true, versionKey: false })

const brandModel = model("brands", brandSchema);
module.exports = brandModel