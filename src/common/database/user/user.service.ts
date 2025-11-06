import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { userDocument, User } from "./user.schema";
import { Model } from "mongoose";
import mongoose from "mongoose";
//Dto
import * as Dto from "./dto";
//interfaces
import type { userInterface } from "./interfaces/userInterface";

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<userDocument>
    ) { };
    //create new user
    async create(dto: Dto.Create): Promise<userInterface> {
        const user = await this.userModel.create(dto);
        return { username: user.username ? user.username : "", email: user.email ? user.email : "", userId: user._id ? user._id : "" };
    }
    //update new user
    async update(dto: Dto.Update): Promise<userInterface> {
        const user = await this.userModel.findOneAndUpdate({ email: dto.email }, { $set: dto }, { new: true });
        return { username: user?.username ? user.username : "", email: user?.email ? user.email : "", userId: user?._id ? user._id : "" };
    }
    //find a special user
    async find(dto: Dto.Find): Promise<{ username: string, email: string, userId: string | mongoose.Types.ObjectId, password: string }> {
        const user = await this.userModel.findOne(dto);
        return { username: user?.username ? user.username : "", email: user?.email ? user.email : "", userId: user?._id ? user._id : "", password: user?.password ? user.password : "" };
    }
    //delete a special use
    async delete(dto: Dto.Delete): Promise<void> {
        await this.userModel.deleteOne(dto);
    }
}