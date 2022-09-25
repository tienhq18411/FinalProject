const bcrypt = require("bcrypt");
const account = require('../models/accounts');

module.exports = {
    indexAdmin: function (req, res){
        res.render('admin/admin');
    },

    viewAccountAdmin: async function(req, res){
        const accountAdmin = await account.find({role :'admin'});
        res.render('admin/viewAccountAdmin', {accountAdmin: accountAdmin});
    },
    viewAccountUser: async function(req, res){
        res.render('admin/viewAccountUser', {
            accountAdmin : await account.find({role: 'user'}),
          });
    },
    viewAccountManager: function(req, res){
        res.render('admin/viewAccountManager');
    },
    createAccountAdmin: function (req, res) {
        res.render('admin/createAccountAdmin');
    },
    postCreateAccountAdmin: async function (req, res) {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);

            const newAdmin = await new account({
                username: req.body.username,
                password: hashed,
                role: req.body.role
            });
            const newUser = await newAdmin.save();
            res.redirect('viewAccountAdmin');
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        } 
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
    deleteAccountAdmin: async function(req, res){
        try {
            const user = await account.deleteOne(req.params.id)
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }

}