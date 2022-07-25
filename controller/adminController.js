const admin = require('../models/admin');
const user = require('../models/accounts');

module.exports = {
    viewAccountAdmin: async function (req, res){
        res.render('./admin/admin')
    },
    postAccount: async function (req, res){
        try {
            const user = await User.find();
        } catch (error) {
            res.status(500).json(error)
        }
    }

}