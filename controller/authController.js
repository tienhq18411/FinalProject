const account = require('../models/accounts')


module.exports = {
    login: function (req, res, next){
        res.render('login');
    },
    postLogin: async function (req, res, next){
        var username = req.body.username;
        var password = req.body.password;
        var role = req.body.role;
        account.findOne({
            username: username,
            password: password,
            role: role
        })
        .then(data =>{
            res.render('admin');
        })
        .catch(error=>{
            res.status(500).json(error)
            })

        var Account = await account.findOne({ username: username });
        

        if (!Account) {
            res.render('login', {
                error: [
                    'Account does not exist'
                ],
                values: req.body
            });
            return;
        }

        if (Account.password !== password) {
            res.render('login', {
                error: [
                    'Incorrect password'
                ],
                values: req.body
            });
            return;
        }
        

    },
    register: function (req, res, next){
        res.render('register');
    },
    postRegister: async function(req, res, next){
        var username = req.body.username
        var password = req.body.password
        var role = req.body.role

        var oldUser = await account.findOne({username})
        if (oldUser) {
            res.render('register',{
                error: [
                    "User Already Exist. Please Login"],
                    values: req.body     
            });
          }

        account.create({
            username: username,
            password: password,
            role: role
        })
        .then(data =>{
            res.render('login');
        })
        .catch(error=>{
            res.status(500).json(error)
            })

    }

} 


