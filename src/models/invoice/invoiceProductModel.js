const { Schema, model } = require("mongoose");
const invoiceProductSchema = new Schema(
  {
    product_id:{type:Schema.Types.ObjectId, required:true},
    user_id:{type:Schema.Types.ObjectId, required:true},
    invoice_id:{type:Schema.Types.ObjectId, required:true},
    qty:{type:String, color:true},
    color:{type:String, required:true},
    price:{type:String,required:true},
    size:{type:String, color:true},
  },
  { timestamps: true, versionKey: false }
);

const invoiceProductModel = model("invoiceProduct", invoiceProductSchema);
module.exports = invoiceProductModel;
