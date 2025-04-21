const ReviewModel = require("../../models/product/reviewModel");
const { createService } = require("../../services/create/CreateService");
const { reviewListService } = require("../../services/review/reviewList");

exports.reviewController = async (req, res) => {
  await createService(req,res,ReviewModel)
};
exports.reviewListController = async(req,res)=>{
  await reviewListService(req,res,ReviewModel)
}