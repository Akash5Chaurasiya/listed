const { Schema, model } = require("mongoose");

const postSchema=Schema({
    title:String,
    content:String
},{
    versionKey:false
})


const userPost=model('post',postSchema);


module.exports={userPost};