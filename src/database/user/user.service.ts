import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { userDocument, User } from "./user.schema";
import { Model } from "mongoose";



@Injectable()
export class UserService{
    constructor(
        @InjectModel(User.name)
        private userModel : Model<userDocument>
    ){};

    
}