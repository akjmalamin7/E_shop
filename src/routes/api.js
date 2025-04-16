const router = require("express").Router();
const { createBrand, brandList } = require("../controllers/brand/brandController.js");
const { createCategory, categoryList } = require("../controllers/category/categoryController.js");
const { productListByBrand, productListBySimilar, productListByKeyword, productListByRemark, productListByCategory, productDetails, productReviewList } = require("../controllers/product/productController.js");
const { sliderList, createSlider } = require("../controllers/slider/slider.js");
const { deleteFile, getImages } = require("../controllers/upload/uploader.js");
const { uploadRouter } = require("./upload/uploadRouter.js");


/* brand */
router.get("/brand/create",createBrand)
router.get("/brand/list",brandList)

/* category */
router.get("/category/create",createCategory)
router.get("/category/list",categoryList)

/* product */
router.get("/product/list", productListByBrand);
router.get("/products/by-brand/:brandID", productListByBrand);
router.get("/products/by-category/:categoryID", productListByCategory);
router.get("/products/by-similar/:keyword", productListBySimilar);
router.get("/products/by-keyword/:keyword", productListByKeyword);
router.get("/products/by-remark/:remark", productListByRemark);
router.get("/products/details/:productID",productDetails);
router.get("products/review-list/:productID",productReviewList);

/* slider */
router.get("/slider/list",sliderList)
router.get("/slider/create",createSlider)


/* file routes */
router.post("/upload", uploadRouter);
router.get('/images/all', getImages);
router.delete("/delete/:filename", deleteFile);

module.exports = router;
