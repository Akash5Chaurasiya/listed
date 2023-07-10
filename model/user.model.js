const { Schema, model } = require("mongoose");

const userSchema=Schema({
    name:String,
    email:String,
    pass:String,
    city:String,
    age:Number
},{
    versionKey:false
})

const userModel=model('user',userSchema);


module.exports={userModel};