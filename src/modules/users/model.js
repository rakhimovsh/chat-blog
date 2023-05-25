import { Schema } from "mongoose";


const UserSchema = new Schema({
    full_name: String,
    username: String,
    password: String,
}, { timestamps: true, versionKey: false }); 