// import jwt from 'jsonwebtoken';


// export const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
// };

// export const verifyTokenGenerated = (token) => {
//   try {
//     return jwt.verify(token, process.env.JWT_SECRET);
//   } catch (error) {
//     return null;
//   }
// };



//change code for secction cookie
import jwt from 'jsonwebtoken';

export const generateAccessToken = (user) => {
  const payload = { id: user._id, email: user.email, role: user.role };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '15m' }); // 15 minutes
};

export const generateRefreshToken = (user) => {
  const payload = { id: user._id };
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' }); // 7 days
};

export const verifyToken = (token, secret) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
};
