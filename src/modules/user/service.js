import UserModel from "./model.js";
import jwt from "../../lib/jwt.js";
import * as bcrypt from "bcrypt";

async function hashPassword(password) {
    const saltRounds = 10
    return await bcrypt.hash(password, saltRounds);
}

async function comparePassword(password, hash) {
    return await bcrypt.compare(password, hash)
}

async function register(full_name, username, password) {
    const userDto = {
        full_name,
        username,
        password: await hashPassword(password)
    }
    return await UserModel.create(userDto);
}

async function checkUserExists(username) {
    return await UserModel.findOne({username})
}

async function login(username, password) {
    const user = await UserModel.findOne({username}).lean()
    if(await comparePassword(password, user.password)) {
        return user
    } else {
        return null
    }
}
function generateToken(userId) {
    return jwt.sign({userId: userId})
}

export default {register, login, checkUserExists, generateToken}