const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    console.log(file);
    cb(null, Date.now() + ext);
  },
});

var upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    if (file.mimetype == "image/jpeg" || file.mimetype == "image/pneg") {
      callback(null, true);
    } else {
      console.log("only jpg and png file");
      callback(null, false);
    }
  },
});

module.exports = upload;
