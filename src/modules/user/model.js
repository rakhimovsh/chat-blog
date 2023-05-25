import mongoose, {Schema} from "mongoose";


const UserModelSchema = new Schema({
    full_name: String,
    username: String,
    password: String,
}, {timestamps: true, versionKey: false});


const UserModel = mongoose.model('user', UserModelSchema)

export default UserModel