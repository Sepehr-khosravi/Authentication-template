const express = require("express");
const Router = express.Router();
Router.use(express.json());

//for user login and register api:
const AuthRouter = require("./auth");
// All auth related routes are assigned to the auth folder:
Router.use("/auth" , AuthRouter);




module.exports = Router;