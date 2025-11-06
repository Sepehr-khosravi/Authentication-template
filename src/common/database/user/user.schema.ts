import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

//User Document
export type userDocument = HydratedDocument<User>;

//Schema class
export class User{
    @Prop({required : true, type : String})
    username : string;

    @Prop({required : true, type : String , unique : true})
    email : string;

    @Prop({required : true, type : String})
    password : string;
}

//Real User Schema 
export const userSchema = SchemaFactory.createForClass(User);