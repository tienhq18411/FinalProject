const account = require('../models/accounts');

module.exports = {
    indexManager: function(req, res){
        res.render('manager/manager');
    }
}