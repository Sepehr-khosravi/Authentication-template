const config = require("config");
const jwt =require("jsonwebtoken");

async function Auth(req ,res , next){
    const auth = req.headers["auth-token"];
    const token = auth && auth.startsWith("Bearer ") ? auth.split(" ")[1] : null;
    if(!auth || !token){
        res.status(404).json({message : "not found" , data : {} , error : "not found this page"});
        return;
    }

    try{
        const decode = await jwt.verify(token , config.get("jwtKey"));
        req.user = decode.userId;
        next();
    }
    catch(e){
        return res.status(401).json({ message: "Unauthorized", data: {}, error: "Token not provided or invalid" });
    }
};

//You can use this middleware to protect the routes you want;

module.exports = Auth;