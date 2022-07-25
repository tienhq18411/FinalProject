const admin = require('../models/admin');
const user = require('../models/accounts');

module.exports = {
    getAccount: async function (req, res){
        res.render('admin/admin');
    }

}