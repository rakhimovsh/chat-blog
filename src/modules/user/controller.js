import {ForbiddenError, InternalServerError, NotFoundError} from '../../lib/error.js';
import userService from './service.js'

async function register(req, res, next) {
    try {
        const {full_name, username, password} = req.body
        const existUser = await userService.checkUserExists(username);
        if (existUser) return next(new ForbiddenError(401, "User already exists"));
        const newUser = await userService.register(full_name, username, password);
        res.json({
            status: 201,
            message: "User registered",
            data: {
                token: userService.generateToken(newUser._id)
            }
        })
    } catch (error) {
        next(new InternalServerError(500, error.message));
    }
}

async function login(req, res, next) {
    try {
        const {username, password} = req.body
        const user = await userService.login(username, password)
        if (user) {
            res.json({
                status: 200,
                message: "User is now logged in",
                data: {
                    token: userService.generateToken(user._id)
                }
            })
        } else {
            return next(new NotFoundError(404, "User not found"));
        }
    } catch (error) {
        next(new InternalServerError(500, error.message));
    }
}

export default {login, register}