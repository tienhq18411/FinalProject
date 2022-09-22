var Account = require("../models/accounts");

module.exports = {
    requireAuth: async function (req, res, next) {
        if (!req.cookies.AccountId) {
            res.redirect('/login');
            return;
        }
        var account = await Account.find({ id: req.cookies.AccountId });
        if (!account) {
            res.redirect('/login');
            return;
        }
        next();

    },
    // checkLogin: function (role) {
    //     return async (req, res, next) => {
    //         var id = req.cookies.accountId
    //         var account = await Account.findOne({ _id: id });
    //         if (account.role !== role) {
    //             res.status(401)
    //             return res.send('You are not an ' + role +', you do not have permission to access this website');
    //         }
    //         res.locals.account = account;
            
            
    //         next();
    //     }
    // }
};