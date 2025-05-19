const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {userModel} = require("../../models");
const config = require("config");

class Auth{
    register = async(req, res)=>{
        const {name , email , password} = req.body;
        const findUser = await userModel.findOne({email});
        if(findUser){
            res.status(400).json({message : "invalid email or password" , data : {}});
            return;
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password , salt);
        const newUser = await userModel({name : name , email : email , password : hashPassword});
        const token = await jwt.sign({userId : newUser.id} ,config.get("jwtKey"));
        res.status(200).json({message : "successfuly to register" , data : {name : newUser.name , email : newUser.email , token  : token}});
    }
    login = async(req , res)=>{
        const {email , password} = req.body;
        const user = await userModel.findOne({email});
        if(!user){
            res.status(400).json({message : "invalid email or password" , data : {}});
            return;
        }
        const checkPassword = await bcrypt.compare(password, user.password);
        if(!checkPassword){
            res.status(400).json({message : "invalid email or password" , data : {}});
            return;
        }
        const token = await jwt.sign({userId : user.id} ,config.get("jwtKey"));
        res.status(200).json({message : "successfuly to login" , data : {name : user.name , email : user.email , token : token}});
    }
}

module.exports = new Auth;