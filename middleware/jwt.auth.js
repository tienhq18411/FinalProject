var account = require("../models/accounts");
const jwt = require('jsonwebtoken');


module.exports = {
    requireAuth: async function (req, res, next) {
            try{
                var token = req.headers.token;
                var result = jwt.verify(token, 'mk')
                if(result){
                    res.render('admin');
                    next();
                }
    
            }catch(error){
                return res.render('admin');
            }
    },
    

    checkLogin: async function (req, res){
        var role = req.data.role

    }
}

