var account = require("../models/accounts");
const jwt = require('jsonwebtoken');


module.exports = {
    requireAuth: async function (req, res, next) {
            try{
                var token = req.cookies.token;
                var id = jwt.verify(token, 'mk');
                account.findOne({
                    _id:id,
                })
                .then((data) =>{
                    if(data){
                        req.data = data;
                        next();
                    }else{
                        res.json('not found');
                    }
                })
                .catch((err) => {})
                // var result = jwt.verify(token, 'mk')
                // if(result){
                //     res.render('admin');
                //     next();
                // }
    
            }catch(error){
                return res.redirect('admin');
            }
    },
    

    checkLogin: async function (req, res){
        var role = req.data.role

    }
}

