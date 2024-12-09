import asyncErrorResolver from "./asyncErrorResolver.js";
import CustomError from "../utils/customError.js";
const isAdmin = asyncErrorResolver((req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    throw new CustomError("Access denied. Admin only.", 403);
  }
  next();
});

export default isAdmin;
