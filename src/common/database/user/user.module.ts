import { Module } from "@nestjs/common";

//modules
import { UserService } from "./user.service";

@Module({
    providers : [UserService]
})
export class UserModule{}