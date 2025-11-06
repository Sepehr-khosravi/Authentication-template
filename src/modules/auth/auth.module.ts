import { Module } from "@nestjs/common";

//controller
import { AuthController } from "./auth.controller";

//Providers 
import { AuthService } from "./auth.service";
import { UserService } from "src/common/database/user/user.service";
@Module({
    controllers : [AuthController],
    providers : [AuthService, UserService],
})

export class AuthModule{};