const {Schema, model} = require("mongoose");

const brandSchema = Schema({
  name:{type:String, require:true, unique:true},
  image:{type:String}
},{timestamp:true, versionKey:false})

const brandModel = model("brands", brandSchema);
module.exports = brandModel