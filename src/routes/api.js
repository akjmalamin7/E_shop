const router = require("express").Router()
const ProductController = require("../controllers/product")

/* product */
router.get("/brand/list",ProductController.ProductBrandList)
router.get("/category/list",ProductController.ProductCategoryList)
router.get("/slider/list",ProductController.ProductCategoryList)

module.exports = router