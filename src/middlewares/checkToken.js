import jwt from "../utils/jwt.js";
import { ForbiddenError } from "../utils/errors.js";

const tokenCheck = (req, res, next) => {
  try {
    let token = req.headers.token;
    if (!token) {
      return next(new ForbiddenError(403, "required token!"));
    }
    let { id } = jwt.verify(token);
    req.userId = id;
    return next();

  } catch (error) {
    return next(new ForbiddenError(403, error.message))
  }
};

export default tokenCheck;
