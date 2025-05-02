const cartModel = require("../../models/cart/cartModel")
const { createCartService } = require("../../services/cart/cartListServices")

const createCartController = async(req,res)=>{
  let result = await createCartService(req,res, cartModel)
}
module.exports = {createCartController}