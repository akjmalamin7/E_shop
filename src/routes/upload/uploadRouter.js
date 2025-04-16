const { uploadFile } = require("../../controllers/upload/uploader");
const upload = require("../../middlewares/uploader/fileUpload");
const fs = require('fs');
exports.uploadRouter = (req, res, next) => {
  if (!req.headers["content-type"]?.includes("multipart/form-data")) {
    return res.status(400).json({ message: "Invalid content type" });
  }

  const isMultiple = req.query.multiple === "true";

  const uploader = isMultiple ? upload.array("file", 10) : upload.single("file");

  uploader(req, res, function (err) {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    uploadFile(req, res);
  });
}

