const router = require("express").Router();
const { createBrand, brandList } = require("../controllers/brand/brandController.js");
const { createCategory, categoryList } = require("../controllers/category/categoryController.js");
const { productListByBrand, productListBySimilar, productListByKeyword, productListByRemark, productListByCategory, productDetails, productReviewList, createProduct } = require("../controllers/product/productController.js");
const { profileController } = require("../controllers/profile/profileController.js");
const { reviewController, reviewListController } = require("../controllers/reviews/reviewController.js");
const { sliderList, createSlider } = require("../controllers/slider/slider.js");
const { deleteFile, getAllImages, viewImage, viewImageById } = require("../controllers/upload/uploader.js");
const { userController } = require("../controllers/user/userController.js");
const { createProductDetails } = require("../services/products/productService.js");
const { uploadRouter } = require("./upload/uploadRouter.js");


/* brand */
router.post("/brand/create",createBrand)
router.get("/brand/list",brandList)

/* category */
router.post("/category/create",createCategory)
router.get("/category/list",categoryList)

/* product */
router.post("/products/add", createProduct);
router.post("/products/details/create", createProductDetails);
router.get("/products/details/:product_id",productDetails);
router.get("/product/list", productListByBrand);
router.get("/products/by-brand/:brand_id", productListByBrand);
router.get("/products/by-category/:category_id", productListByCategory);
router.get("/products/by-similar/:category_id", productListBySimilar);
router.get("/products/by-keyword/:keyword", productListByKeyword);
router.get("/products/by-remark/:remark", productListByRemark);
router.get("products/review-list/:product_id",productReviewList);

/* slider */
router.post("/slider/create",createSlider)
router.get("/slider/list",sliderList)


/* file routes */
router.post("/upload", uploadRouter);
router.get('/images', getAllImages);
router.delete("/delete/:filename", deleteFile);

/* users */
router.post("/user/create",userController)
/* profile */
router.post("/profile/create",profileController)
/* review */
router.post("/review/create",reviewController)
router.get("/review/list/:product_id",reviewListController)


module.exports = router;
