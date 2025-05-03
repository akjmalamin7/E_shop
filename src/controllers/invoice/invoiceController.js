const mongoose = require("mongoose");
const cartModel = require("../../models/cart/cartModel");
const userProfileModel = require("../../models/profile/profileModel");
const invoiceModel = require("../../models/invoice/invoiceModel");
const invoiceProductModel = require("../../models/invoice/invoiceProductModel");
const paymentSettingsModel = require("../../models/payment/paymentModel");

const ObjectID = mongoose.Types.ObjectId;
const formData = require("form-data");
const axios = require("axios");
const { createInvoiceService } = require("../../services/invoice/createInvoiceService");
const { paymentSuccessService } = require("../../services/invoice/paymentSuccessService");
const { paymentFailService } = require("../../services/invoice/paymentFailService");
const { paymentCancelService } = require("../../services/invoice/paymentCancelService");
const { paymentIPNService } = require("../../services/invoice/paymentIPNService");
const { invoiceListService } = require("../../services/invoice/invoiceListService");
const { invoiceProductListService } = require("../../services/invoice/invoiceProductListService");

const createInvoiceController = async (req, res) => {
  let result = await createInvoiceService({
    req: req,
    ObjectID: ObjectID,
    invoiceModel: invoiceModel,
    cartModel: cartModel,
    profileModel: userProfileModel,
    invoiceProductModel:invoiceProductModel
  });
  res.status(result.status === "success" ? 200 : 400).json(result);
};
const paymentSuccessController = async (req, res) => {
  let result = await paymentSuccessService(req, invoiceModel);
  res.status(result.status === "success" ? 200 : 400).json(result);
};
const paymentFailController = async (req, res) => {
  let result = await paymentFailService(req, invoiceModel);
  res.status(result.status === "success" ? 200 : 400).json(result);
};
const paymentCancelController = async (req, res) => {
  let result = await paymentCancelService(req, invoiceModel);
  res.status(result.status === "success" ? 200 : 400).json(result);
};
const paymentIPNController = async (req, res) => {
  let result = await paymentIPNService(req, invoiceModel);
  res.status(result.status === "success" ? 200 : 400).json(result);
};
const invoiceListController = async (req, res) => {
  let result = await invoiceListService(req, invoiceModel);
  res.status(result.status === "success" ? 200 : 400).json(result);
};
const invoiceProductListController = async (req, res) => {
  let result = await invoiceProductListService(req, invoiceModel);
  res.status(result.status === "success" ? 200 : 400).json(result);
};

module.exports = {
  createInvoiceController,
  paymentSuccessController,
  paymentFailController,
  paymentCancelController,
  paymentIPNController,
  invoiceListController,
  invoiceProductListController,
};
