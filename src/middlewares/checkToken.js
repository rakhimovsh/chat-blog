import jwt from '../lib/jwt.js';
import { ForbiddenError } from '../lib/error.js';

function checkToken(req, res, next) {
  try {
    let { token } = req.headers;
    if (!token) return next(new ForbiddenError(403, 'Invalid token'));
    let { userId } = jwt.verify(token);
    req.userId = userId;
    return next();
  } catch (e) {
    next(new ForbiddenError(403, e.message));
  }
}

export default checkToken;
