const fs = require("fs");
const path = require("path");

exports.uploadFile = (req, res) => {
  if (!req.file && !req.files) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  // Multiple file upload
  if (req.files) {
    const filesInfo = req.files.map((file) => ({
      filename: file.filename,
      path: file.path,
    }));
    return res.status(200).json({
      message: "Multiple files uploaded successfully!",
      files: filesInfo,
    });
  }

  // Single file upload
  res.status(200).json({
    message: "Single file uploaded successfully!",
    filename: req.file.filename,
    path: req.file.path,
  });
};

// File Delete
exports.deleteFile = (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, "../../../uploads", filename);

  fs.unlink(filePath, (err) => {
    if (err) {
      return res.status(500).json({ message: "File delete failed", error: err.message });
    }
    res.status(200).json({ message: "File deleted successfully" });
  });
};

exports.getAllImages = (req, res) => {
  const dirPath = path.join(__dirname, "../../../uploads");

  fs.readdir(dirPath, (err, files) => {
    if (err) {
      return res.status(500).json({ message: "Unable to read files" });
    }

    // Filter only image files
    const images = files
      .filter((file) => /\.(jpg|jpeg|png|gif)$/i.test(file))
      .map((file) => ({
        image: file,
        id: Math.floor(1000000000 + Math.random() * 9000000000).toString(), 
      }));

    res.json(images);
  });
};


