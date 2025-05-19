const express =require("express");
const Router = express.Router();
Router.use(express.json());
const Auth = require("./controler");
const validate = require("../validator");

//api for /login route :
Router.post("/login" , validate.loginValidate() , validate.validation , Auth.login);

//api for /register route :
Router.post("/register" , validate.registerValidate() , validate.validation , Auth.register);


module.exports = Router;