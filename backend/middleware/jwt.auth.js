var Account = require("../models/accounts");
const jwt = require("jsonwebtoken");


module.exports = {
    requireAuth: async function (req, res, next) {
       try{
            const token = req.cookies.token;
            const isUser =  jwt.verify(token, 'mk')
            

            Account.findOne({
                _id:isUser.id
            })
            .then(data =>{
                if(data){
                req.data = data;
                    next();
                }else{
                    res.json("no token")
                }
            })
            
         .catch (err => {
            console.log(err);
            res.json("ban can login");
         })
        }
         catch (err){
            res.status(500).json("loi server")
         }
       

    },
    checkAdmin: function (req, res, next) {
           var role = req.data.role;
           if(role === 'admin'){
            console.log(req.data);
            next();
           } else{
            res.json("nope ")
           }
            
    }, 
    checkHost: function (req, res, next) {
           var role = req.data.role;
           if(role === 'host'){
            console.log(req.data);
            next();
           } else{
            res.json("nope " + role)
           }
            
    }, 
    checkUser: function (req, res, next) {
           var role = req.data.role;
           if(role === 'user'){
            console.log(req.data);
            next();
           } else{
            res.json("nope " + role)
           }
            
    }
}