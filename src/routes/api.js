const router = require("express").Router();
const ProductController = require("../controllers/product/productController.js");
const { deleteFile } = require("../controllers/upload/uploader.js");
const { uploadRouter } = require("./upload/uploadRouter.js");

/* product */
router.get("/brand/list", ProductController.ProductBrandList);
router.get("/category/list", ProductController.ProductCategoryList);
router.get("/slider/list", ProductController.ProductCategoryList);
/* file routes */
router.post("/upload",uploadRouter );
router.delete("/delete/:filename", deleteFile);

module.exports = router;
