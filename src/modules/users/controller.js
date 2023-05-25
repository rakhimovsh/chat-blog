import { InternalServerError } from '../../lib/error.js';

async function register(req, res, next) {
    try {

    } catch (error) {
        next(new InternalServerError(500, e.message));
    }
};