const { Schema, model } = require("mongoose");
const invoiceSchema = new Schema(
  {
    product_id:{type:Schema.Types.ObjectId, required:true},
    user_id:{type:Schema.Types.ObjectId, required:true},
    payable:{type:String, required:true},
    cus_details:{type:String, required:true},
    ship_details:{type:String, required:true},
    val_id:{type:String, required:true},
    delivery_status:{type:String, required:true},
    payment_status:{type:String, required:true},
    total:{type:String, required:true},
    vat:{type:String, required:true},
   
  },
  { timestamps: true, versionKey: false }
);

const invoiceModel = model("invoice", invoiceSchema);
module.exports = invoiceModel;
