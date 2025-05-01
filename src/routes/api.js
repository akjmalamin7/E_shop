const router = require("express").Router();
const { createBrand, brandList } = require("../controllers/brand/brandController.js");
const { createCategory, categoryList } = require("../controllers/category/categoryController.js");
const { productListByBrand, productListBySimilar, productListByKeyword, productListByRemark, productListByCategory, productDetails, productReviewList, createProduct } = require("../controllers/product/productController.js");
const { reviewController, reviewListController } = require("../controllers/reviews/reviewController.js");
const { sliderList, createSlider } = require("../controllers/slider/slider.js");
const { deleteFile, getAllImages, viewImage, viewImageById } = require("../controllers/upload/uploader.js");
const { userController, createUserController, userOtpController, userVerifyOtpController, userLogoutController, userCreateProfileController, updateUserProfileController, userReadProfileController } = require("../controllers/user/userController.js");
const { createProductDetails } = require("../services/products/productService.js");
const { uploadRouter } = require("./upload/uploadRouter.js");
const authMiddleware = require("../middlewares/authorize/authorize.js")

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

/* ========================= start users routes ========================= */
router.post("/user/create",createUserController)
router.post("/user-otp",userOtpController)
router.post("/verify-otp",userVerifyOtpController)
router.post("/logout",authMiddleware,userLogoutController)
/* profile */
router.post("/profile/create",authMiddleware,userCreateProfileController)
router.put("/profile/update", authMiddleware, updateUserProfileController);
router.get("/profile", authMiddleware, userReadProfileController);

/* =========================end users routes ========================= */

/* review */
router.post("/review/create",reviewController)
router.get("/review/list/:product_id",reviewListController)


module.exports = router;
