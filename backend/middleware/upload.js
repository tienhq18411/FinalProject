const multer = require("multer");

// set storage

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    urlImg = Date.now() + ".jpg";
    cb(null, urlImg);
  },
});
module.exports = multer({ storage: storage });
