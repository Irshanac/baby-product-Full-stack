// import {userRegisterServices,loginUserService} from '../service/userServices.js'
// import { generateToken } from "../utils/jwt.js";
// import asyncErrorResolver from "../middlewares/asyncErrorResolver.js";
// import { STATUS } from '../utils/constants.js';

// // registration

// // export const registerUser = asyncErrorResolver(async (req, res) => {
// //   const data = req.body;
// //   const id = await userRegisterServices(data);
// //   const token = generateToken(id);
// //   res.json({
// //     status: STATUS.SUCCESS,
// //     message: "User registered successfully",
// //     token,
// //   });
// // });
// export const registerUser = asyncErrorResolver(async (req, res) => {
//   const data = req.body;
//   const user = await userRegisterServices(data);
  
//   req.session.user = { id: user._id, email: user.email, isAdmin: user.isAdmin };
//   res.json({
//     status: STATUS.SUCCESS,
//     message: "User registered successfully",
//    user,
//   });
// });

// // Login
// // export const loginUser = asyncErrorResolver(async (req, res) => {
// //   const { email, password } = req.body;
// //   const userData = await loginUserService(email, password);
// //   const token = generateToken(userData._id);
// //   res.status(200).json({
// //     status: STATUS.SUCCESS,
// //     message: userData.isAdmin ? "Admin Login successful" : "Login successful",
// //     token,
// //     user: userData,
// //   });
// // });

// export const loginUser = asyncErrorResolver(async (req, res) => {
//   const { email, password } = req.body;
//   const user = await loginUserService(email, password);

//   req.session.user = { id: user._id, email: user.email, isAdmin: user.isAdmin };
//   res.status(200).json({
//     status: STATUS.SUCCESS,
//     message: user.isAdmin ? "Admin Login successful" : "Login successful",
//     user,
//   });
// });

// //logout
// export const logoutUser = (req, res) => {
//   req.session.destroy((err) => {
//     if (err) return res.status(500).json({ status: STATUS.ERROR, message: "Logout failed" });
//     res.clearCookie('connect.sid');
//     res.json({ status: STATUS.SUCCESS, message: "Logged out successfully" });
//   });
// };



//change controller 
import { generateAccessToken, generateRefreshToken, verifyToken } from '../utils/jwt.js';
import asyncErrorResolver from '../middlewares/asyncErrorResolver.js';
import { userRegisterServices, loginUserService } from '../service/userServices.js';
import { STATUS } from '../utils/constants.js';
import CustomError from '../utils/customError.js';

export const registerUser = asyncErrorResolver(async (req, res) => {
  const data = req.body;
  await userRegisterServices(data);

  res.status(201).json({
    status: STATUS.SUCCESS,
    message: 'User registered successfully',
  });
});

export const loginUser = asyncErrorResolver(async (req, res) => {
  const { email, password } = req.body;
  const user = await loginUserService(email, password);

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  res
    .cookie('accessToken', accessToken, { httpOnly: true, secure: false, maxAge: 15 * 60 * 1000 })
    .cookie('refreshToken', refreshToken, { httpOnly: true, secure: false, maxAge: 7 * 24 * 60 * 60 * 1000 })
    .status(200)
    .json({
      status: STATUS.SUCCESS,
      message: user.isAdmin ? 'Admin Login successful' : 'Login successful',
      user,
    });
});

export const refreshToken = asyncErrorResolver(async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    throw new CustomError('Refresh token missing', 401);
  }

  const decoded = verifyToken(refreshToken, process.env.JWT_REFRESH_SECRET);
  if (!decoded) {
    throw new CustomError('Invalid or expired refresh token', 403);
  }

  const user = await User.findById(decoded.id);
  if (!user) {
    throw new CustomError('User not found', 404);
  }

  const newAccessToken = generateAccessToken(user);
  res
    .cookie('accessToken', newAccessToken, { httpOnly: true, secure: false, maxAge: 15 * 60 * 1000 })
    .status(200)
    .json({
      status: STATUS.SUCCESS,
      message: 'Access token refreshed',
    });
});
