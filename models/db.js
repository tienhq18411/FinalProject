const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017', {useNewUrlParser:true}, (err) =>{
    if(!err) {console.log('connection succeeded')}
    else{console.log('connection failed' + err)}
});