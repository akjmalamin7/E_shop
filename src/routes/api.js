const router = require("express").Router();
const { createBrand, brandList } = require("../controllers/brand/brandController.js");
const { createCategory, categoryList } = require("../controllers/category/categoryController.js");
const {
  productListByBrand,
  productListBySimilar,
  productListByKeyword,
  productListByRemark,
  productListByCategory,
  productDetails,
  productReviewList,
  createProduct,
} = require("../controllers/product/productController.js");
const {
  reviewController,
  reviewListController,
} = require("../controllers/reviews/reviewController.js");
const { sliderList, createSlider } = require("../controllers/slider/slider.js");
const {
  deleteFile,
  getAllImages,
} = require("../controllers/upload/uploader.js");
const {
  createUserController,
  userOtpController,
  userVerifyOtpController,
  userLogoutController,
  userCreateProfileController,
  updateUserProfileController,
  userReadProfileController,
} = require("../controllers/user/userController.js");
const { createProductDetails } = require("../services/products/productService.js");
const { uploadRouter } = require("./upload/uploadRouter.js");
const authMiddleware = require("../middlewares/authorize/authorize.js");
const { createWishController, updateWishController, deleteWishController, getWishlistController } = require("../controllers/wishlist/wishListController.js");
const { createCartController, removeCartController } = require("../controllers/cart/cartListController.js");

/* ========================= start Brand routes ========================= */
router.post("/brand/create", createBrand);
router.get("/brand/list", brandList);
/* ========================= start Brand routes ========================= */

/* ========================= start category routes ========================= */
router.post("/category/create", createCategory);
router.get("/category/list", categoryList);
/* ========================= start category routes ========================= */

/* ========================= start Product routes ========================= */
router.post("/products/add", createProduct);
router.post("/products/details/create", createProductDetails);
router.get("/products/details/:product_id", productDetails);
router.get("/product/list", productListByBrand);
router.get("/products/by-brand/:brand_id", productListByBrand);
router.get("/products/by-category/:category_id", productListByCategory);
router.get("/products/by-similar/:category_id", productListBySimilar);
router.get("/products/by-keyword/:keyword", productListByKeyword);
router.get("/products/by-remark/:remark", productListByRemark);
router.get("products/review-list/:product_id", productReviewList);
/* ========================= start Product routes ========================= */


/* ========================= start wishlist routes ========================= */
router.post("/wishlist/add", authMiddleware, createWishController);
router.put("/wishlist/:wishId", authMiddleware, updateWishController);
router.delete("/wishlist/:wishId", authMiddleware, deleteWishController);
router.get("/wishlist", authMiddleware, getWishlistController);
/* ========================= start wishlist routes ========================= */



/* ========================= start Slider routes ========================= */
router.post("/slider/create", createSlider);
router.get("/slider/list", sliderList);
/* ========================= start Slider routes ========================= */

/* file routes */
router.post("/upload", uploadRouter);
router.get("/images", getAllImages);
router.delete("/delete/:filename", deleteFile);

/* ========================= start users routes ========================= */
router.post("/user/create", createUserController);
router.post("/user-otp", userOtpController);
router.post("/verify-otp", userVerifyOtpController);
router.post("/logout", authMiddleware, userLogoutController);

/* profile */
router.post("/profile/create", authMiddleware, userCreateProfileController);
router.put("/profile/update", authMiddleware, updateUserProfileController);
router.get("/profile", authMiddleware, userReadProfileController);

/* =========================end users routes ========================= */

/* ========================= start review routes ========================= */
router.post("/review/create", reviewController);
router.get("/review/list/:product_id", reviewListController);
/* ========================= start review routes ========================= */

/* ========================= start cart routes ========================= */
router.post("/cart/add",authMiddleware,createCartController)
router.delete("/cart/remove",authMiddleware,removeCartController)
/* ========================= start cart routes ========================= */

module.exports = router;
