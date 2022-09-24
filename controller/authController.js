const account = require('../models/accounts');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


module.exports = {
    register: function (req, res, next){
        res.render('auth/register');
    },
    postRegister: async function(req, res, next){
        try {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);

            const newUser = await new account({
                username: req.body.username,
                password: hashed,
                role: req.body.role
            });
            const Account = await newUser.save();
            res.redirect('login');
        } catch (error) {
            res.status(500).json(error);
        } 
    },

    login: function (req, res, next){
        res.render('auth/login');
    },
    postLogin: async function (req, res, next){
         try {
            const user = await account.findOne({username: req.body.username});
            if(!user){
                res.status(404).json("wrong username")
            }
            const validPassword = await bcrypt.compare(
                req.body.password,
                user.password
            );
            if(!validPassword){
                res.status(404).json("wrong password")
            }
            if(user && validPassword){
                var token = jwt.sign({
                    id: user.id
                },'mk',
                {expiresIn: "30d"}
                );
                
                res.cookie('token', token);
                res.redirect('/'+ user.role);
            }
            
         } catch (error) {
            res.status(500).json(error);
         }
    }
}