import mongoose from "mongoose";

export interface userInterface {
    username: string;
    email: string;
    userId: string | mongoose.Types.ObjectId;
}