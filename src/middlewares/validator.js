import Validators from '../validators/index.js'
import {ForbiddenError, InternalServerError} from "../lib/error.js";

const Validator = function (validator) {
    return async (req, res, next) => {
        try {
            req.body = await Validators[validator].validateAsync(req.body)
            next()
        } catch (err) {
            if (err.isJoi) return next(new ForbiddenError(403, err.message));
            return next(new InternalServerError(500, err.message))
        }
    }
}

export default Validator