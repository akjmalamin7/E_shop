
const brandListService = async (req, res,dataModel) => {
  try {
    let brands = await dataModel.find({});
    return res
      .status(200)
      .json({ status: "success", message: "Brand data successfully retrieve", data: brands });
  } catch (err) {
    return res.status(400).json({ status: "fail", message: "Brand data not retrieve", data: [] });
  }
};

module.exports = { brandListService };
