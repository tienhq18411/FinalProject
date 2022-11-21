const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://tien:XwKYXtSC1ZGQ3hKR@cluster0.idsgewf.mongodb.net/test",
  { useNewUrlParser: true },
  (err) => {
    if (!err) {
      console.log("connection succeeded");
    } else {
      console.log("connection failed" + err);
    }
  }
);
