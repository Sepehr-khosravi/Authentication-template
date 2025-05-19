const mongoose = require("mongoose");
const config = require("config");

//for starting data base:
mongoose.connect(config.get("dbAddress"))
.then(()=>{
    console.log("server is connected to the database");
})
.catch((e)=>{
    console.log("error in connecting to the data base :" , e);
})



//for getting model Users:
const userModel = require("./users");

module.exports = {userModel};
