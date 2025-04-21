exports.createService = async (req, res,dataModel, message) => {
  try {
    let body = req.body;
    const result = await dataModel(body);
    let data = await result.save();
    return res.status(201).json({status:"success",message:"Created successfully!",data:data})

  } catch (err) {
    return res.status(400).json({ status: "fail", message:err.message });
  }
};