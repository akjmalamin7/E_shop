const wishModel = require("../../models/wish/wishlistModel")
const { createWishService, updateWishlistService,deleteWishlistService, getWishlistService  } = require("../../services/wish/wishlistService")

const createWishController = async(req,res)=>{
 const result = await createWishService(req,wishModel)
 res.status(result.status === "success" ? 200:400).json(result)
}
const updateWishController = async(req,res)=>{
 const result = await updateWishlistService(req,wishModel)
 res.status(result.status === "success" ? 200:400).json(result)
}
const deleteWishController = async(req,res)=>{
 const result = await deleteWishlistService (req,wishModel)
 res.status(result.status === "success" ? 200:400).json(result)
}
const getWishlistController = async(req,res)=>{
 const result = await getWishlistService (req,res,wishModel)
 res.status(result.status === "success" ? 200:400).json(result)
}

module.exports = {
  createWishController,
  updateWishController,
  deleteWishController,
  getWishlistController
}