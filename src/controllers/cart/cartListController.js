const cartModel = require("../../models/cart/cartModel")
const { createCartService } = require("../../services/cart/createCartService");
const { removeCartService } = require("../../services/cart/removeCartService");
const { updateCartService } = require("../../services/cart/updateCartService");

const createCartController = async(req,res)=>{
  let result = await createCartService(req,cartModel);
  const statusCode = result.status === "success" ? 200 : 400;
  res.status(statusCode).json(result);
}
const updateCartController = async(req,res)=>{
  let result = await updateCartService(req,cartModel);
  const statusCode = result.status === "success" ? 200 : 400;
  res.status(statusCode).json(result);
}
const removeCartController = async(req,res)=>{
  let result = await removeCartService(req,cartModel);
  const statusCode = result.status === "success" ? 200 : 400;
  res.status(statusCode).json(result);
}
module.exports = {createCartController,updateCartController, removeCartController}