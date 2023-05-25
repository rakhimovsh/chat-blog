import mongoose from "mongoose";
import {dbUri} from "../config.js";

export async function connectToDatabase() {
    try {
        await mongoose.connect(dbUri);
        console.log('Successfully connected to database');
    } catch (error) {
        console.error(error);
    }
}
