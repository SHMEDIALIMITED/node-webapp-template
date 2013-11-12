var mongoose = require('mongoose');

var User = new mongoose.Schema({

    firstName : { type : String },
    lastName : { type : String },
    email: { type : String },
    mobile : { type:String },
    address1 : { type:String },
    address2 : { type:String },
    postcode : { type:String },
    city : { type:String },
    captcha : { type:String }

});



module.exports = {

    User : mongoose.model('User', User)

}