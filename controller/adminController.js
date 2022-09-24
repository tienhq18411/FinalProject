
const account = require('../models/accounts');

module.exports = {
    indexAdmin: function (req, res){
        res.render('admin/admin');
    },

    viewAccountAdmin: function(req, res){
        res.render('admin/viewAccountAdmin');
    },
    viewAccountUser: function(req, res){
        res.render('admin/viewAccountUser');
    },
    viewAccountManager: function(req, res){
        res.render('admin/viewAccountManager');
    },
    updateAccountAdmin: function(req, res){
        res.render('admin/updateAccountAdmin');
    },
    updateAccountUser: function(req, res){
        res.render('admin/updateAccountUser');
    },
    updateAccountManager: function(req, res){
        res.render('admin/updateAccountManager');
    },

}