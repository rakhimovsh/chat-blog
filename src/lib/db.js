import mongoose from "mongoose";

export async function connectToDatabase() {
    try {
        await mongoose.connect(``, {
            useCreateIndex: true,
            useFindAndModify: false,
        });
        console.log('Successfully connected to database');
    } catch (error) {
        console.error(error);
    }
}
