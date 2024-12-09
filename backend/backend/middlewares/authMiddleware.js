// import jwt from 'jsonwebtoken';
// import CustomError from '../utils/customError.js';
// import User from '../models/userModels.js';

// const authenticate = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization
//     if (!token) {
//       throw new CustomError("Authorization token missing", 401);
//     }
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.id);
//     if (!user) {
//       throw new CustomError("User not found", 404);
//     }
//     req.user = user;
//     next();
//   } catch (err) {
//     next(err);
//   }
// };

// export default authenticate;
// const authenticate = (req, res, next) => {
//   if (!req.session.user) {
//     return res.status(401).json({ status: "error", message: "Unauthorized. Please log in." });
//   }

//   req.user = req.session.user; 
//   next();
// };

// export default authenticate;

//change authmiddle
import { verifyToken } from '../utils/jwt.js';
import CustomError from '../utils/customError.js';
import User from '../models/userModels.js';

const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) {
      throw new CustomError('Access token missing', 401);
    }

    const decoded = verifyToken(token, process.env.JWT_SECRET);
    if (!decoded) {
      throw new CustomError('Invalid or expired access token', 403);
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      throw new CustomError('User not found', 404);
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

export default authenticate;


