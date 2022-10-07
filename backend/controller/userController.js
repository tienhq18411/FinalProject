const account = require("../models/accounts");

module.exports = {
  indexUser: function (req, res) {
    res.render("user/user");
  },
};
