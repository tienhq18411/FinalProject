const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    console.log(file);
    cb(null, Date.now() + ext);
  },
});

const upload = multer({
  storage: storage,
});

module.exports = upload;
