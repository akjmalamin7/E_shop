const { Schema, model } = require("mongoose");
const paymentSettingsSchema = new Schema(
  {
    store_id:{type:String, required:true},
    store_password:{type:String,required:true},
    currency:{type:String, color:true},
    success_url:{type:String, color:true},
    fail_url:{type:String, color:true},
    cancel_url:{type:String, color:true},
    inp_url:{type:String, color:true},
    init_url:{type:String, color:true},
  },
  { timestamps: true, versionKey: false }
);

const paymentSettingsModel = model("paymentSettings", paymentSettingsSchema);
module.exports = paymentSettingsModel;
