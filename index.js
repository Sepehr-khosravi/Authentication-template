const express = require("express");
const app = express();
//for server can read the json files :
app.use(express.json());
//for public files :
app.use(express.static("public"));

//for connection with frontend:
const cors = require("cors");
app.use(cors());

//for cybersecerity:
const helmet = require("helmet");
app.use(helmet());

//for writing api:
const router = require("./src/routes");
app.use("/api" , router);


//for getting environment varaible : //example : PORT 
const config = require("config");

const PORT = config.get("PORT");

app.listen(PORT , ()=>{
    console.log("server is run this port :" , PORT);
})