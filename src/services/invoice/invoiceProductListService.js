const invoiceProductListService = async(req,dataModel)=>{
  try{}catch(err){
    return{
      status:"fail",
      error:err.message
    }
  }
}
module.exports = {invoiceProductListService}