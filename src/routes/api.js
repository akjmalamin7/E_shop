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
const { deleteFile, getAllImages } = require("../controllers/upload/uploader.js");
const {
  createUserController,
  userOtpController,
  userVerifyOtpController,
  userLogoutController,
  userCreateProfileController,
  updateUserProfileController,
  userReadProfileController,
} = require("../controllers/user/userController.js");
const { createProductDetails, productListService } = require("../services/products/productService.js");
const { uploadRouter } = require("./upload/uploadRouter.js");
const authMiddleware = require("../middlewares/authorize/authorize.js");
const {
  createWishController,
  updateWishController,
  deleteWishController,
  getWishlistController,
} = require("../controllers/wishlist/wishListController.js");
const {
  createCartController,
  removeCartController,
  updateCartController,
} = require("../controllers/cart/cartListController.js");
const { createInvoiceController } = require("../controllers/invoice/invoiceController.js");
const { createVariationController, getVariationListController, updateVariationController, deleteVariationController } = require("../controllers/variation/variationController.js");

/* ========================= 
start Brand routes 
========================= */
router.post("/brand/create", createBrand);
router.get("/brand/list", brandList);
/* ========================= s
tart Brand routes
 ========================= */

/* ========================= 
start category routes 
========================= */
router.post("/category/create", createCategory);
router.get("/category/list", categoryList);
/* ========================= 
start category routes 
========================= */

/* ========================= 
start Product routes 
========================= */
router.post("/products/add", createProduct);
router.post("/products/details/create", createProductDetails);
router.get("/products/details/:product_id", productDetails);
router.get("/products/list", productListService);
router.get("/products/by-brand/:brand_id", productListByBrand);
router.get("/products/by-category/:category_id", productListByCategory);
router.get("/products/by-similar/:category_id", productListBySimilar);
router.get("/products/by-keyword/:keyword", productListByKeyword);
router.get("/products/by-remark/:remark", productListByRemark);
router.get("products/review-list/:product_id", productReviewList);
/* =========================
 end Product routes 
 ========================= */

/* =========================
 start variation routes 
 ========================= */
 router.get("/variations",authMiddleware, getVariationListController);
 router.post("/variations/add",authMiddleware, createVariationController);
 router.put("/variations/:id",authMiddleware, updateVariationController);
 router.delete("/variations/:id",authMiddleware, deleteVariationController);
/* =========================
 end variation routes 
 ========================= */

/* =========================
 start wishlist routes 
 ========================= */
router.post("/wishlist/add", authMiddleware, createWishController);
router.put("/wishlist/:wishId", authMiddleware, updateWishController);
router.delete("/wishlist/:wishId", authMiddleware, deleteWishController);
router.get("/wishlist", authMiddleware, getWishlistController);
/* =========================
 end wishlist routes 
 ========================= */

/* =========================
 start Slider routes 
 ========================= */
router.post("/slider/create", createSlider);
router.get("/slider/list", sliderList);
/* =========================
 end Slider routes 
 ========================= */

/* file routes */
router.post("/upload", uploadRouter);
router.get("/images", getAllImages);
router.delete("/delete/:filename", deleteFile);

/* =========================
 start users routes 
 ========================= */
router.post("/user/create", createUserController);
router.post("/user-otp", userOtpController);
router.post("/verify-otp", userVerifyOtpController);
router.post("/logout", authMiddleware, userLogoutController);

/* profile */
router.post("/profile/create", authMiddleware, userCreateProfileController);
router.put("/profile/update", authMiddleware, updateUserProfileController);
router.get("/profile", authMiddleware, userReadProfileController);

/* =========================
end users routes 
========================= */

/* =========================
 start review routes 
 ========================= */
router.post("/review/create", reviewController);
router.get("/review/list/:product_id", reviewListController);
/* =========================
 end review routes 
 ========================= */

/* =========================
 start cart routes 
 ========================= */
router.post("/cart/add", authMiddleware, createCartController);
router.put("/cart/update/:cart_id", authMiddleware, updateCartController);
router.delete("/cart/remove", authMiddleware, removeCartController);
/* =========================
end cart routes 
========================= */

/* =========================
start invoice routes 
========================= */
router.post("/invoice/create", authMiddleware, createInvoiceController);

/* =========================
 end cart routes 
 ========================= */

module.exports = router;
