import jwt from '../lib/jwt.js';
import { ForbiddenError } from '../lib/error.js';

function checkToken(req, res, next) {
  try {
    let { token } = req.headers;
    if (!token) next(new ForbiddenError(403, 'Invalid token'));
    let { user_id } = jwt.verify(token);
    req.userId = user_id;
    return next();
  } catch (e) {
    next(new ForbiddenError(403, e.message));
  }
}

export default checkToken;
