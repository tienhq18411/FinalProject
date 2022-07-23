var account = require("../models/accounts");

module.exports = {
    requireAuth: async function (req, res, next) {
        if (!req.cookies.accountId) {
            res.redirect('login');
            return;
        }
        var Account = await account.find({ id: req.cookies.accountId });
        if (!Account) {
            res.redirect('login');
            return;
        }
        next();

    },
    checkLogin: function (role) {
        return async (req, res, next) => {
            var id = req.cookies.accountId
            var Account = await account.findOne({ _id: id });
            if (account.role !== role) {
                res.status(401)
                return res.send('You are not an ' + role +', you do not have permission to access this website');
            }
            res.locals.Account = Account;
            
            
            next();
        }
    }
}