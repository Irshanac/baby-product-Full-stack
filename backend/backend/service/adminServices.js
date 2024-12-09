import Order from "../models/orderModel.js";
import user from "../models/userModels.js";
import CustomError from "../utils/customError.js";

//user Block
export const userBlockService = async (id) => {
  const userDetails = await user.findById(id);
  if (!userDetails) {
    throw CustomError("user is not found ", 400);
  }
  else{
    if(userDetails.isBlock)
      userDetails.isBlock=false
    else
      userDetails.isBlock=true
    userDetails.save()
    return userDetails
  }
};

//get all user
export const getAllUserServices = async (limit, skip) => {
  const usersList = await user
    .find({ isAdmin: { $ne: true } })
    .skip(skip)
    .limit(limit);
  const totalUsers = await user.countDocuments({ isAdmin: { $ne: true } });
  return { usersList, totalUsers };
};

//specific user
export const singleUserServices = async (id) => {
  const users = await user.findById(id);
  if (!users)
     throw CustomError("user not found", 400);
  else
    return users;
};

//get all order list
export const getAllOrderServices = async (id) => {
  const orderdata = await Order.find();
  return orderdata
};

//get total revenue
export const getTotalRevenueServices = async () => {
  const result = await Order.aggregate([{$group:{_id:null,totalRevenue:{$sum:"$total"}}}])
  return result;
};
// export const userCountServices = async () => {
//   const userlists = await getAllUserServices();
//   // console.log("user count",userlist.length)
//   if (!userlists) return { messege: "no user", count: 0 };
//   else {
//     return { message: "user count", count: userlists.userlist.length };
//   }
// };
