const mongoose = require("mongoose");

//for make a good structure for data:
const schema = new mongoose.Schema({
    name : {type : String , required : true} ,
    email : {type : String , required : true , unique : true} ,
    password : {type : String , required : true} ,
    isAdmin : {type  : Boolean , default : false}
});


//for make a model :
const model  = mongoose.model("users" , schema);


module.exports = model;