import asyncErrorResolver from "../middlewares/asyncErrorResolver.js";
import {STATUS} from '../utils/constants.js'
import {getAllUserServices, userBlockService,singleUserServices,getAllOrderServices,getTotalRevenueServices} from '../service/adminServices.js'
//user blocking
export const userBlock=asyncErrorResolver(async(req,res)=>{
    const {id}=req.params
    const user=await userBlockService(id)
    const message = user.isBlock? "User is blocked": "User is unblocked";
    res.json({
        status: STATUS.SUCCESS,
        message
      });
})


//ALL USERS
export const allUser = asyncErrorResolver(async (req, res) => {
    const { page} = req.query; 
    const pageInt = parseInt(page, 10)|| 1
    const limit=10
    const skip = (pageInt - 1) * limit;
    const { usersList, totalUsers } = await getAllUserServices(limit, skip);
  
    const message = usersList.length ? "User list" : "No users found";
    const totalPages = Math.ceil(totalUsers / limit);
  
    res.json({
      status: STATUS.SUCCESS,
      message,
      data: {
        users: usersList,
        totalUsers,
        totalPages,
        currentPage: pageInt,
      },
    });
  });

  //user list
 export const userCount=asyncErrorResolver(async(req,res)=>{
    const {  totalUsers } = await getAllUserServices(10, 1);
    const message = totalUsers ? "User list" : "No users found";
    res.json({status:STATUS.SUCCESS,message:message,totalUsers})
 })
//specific user
export const singleUser=asyncErrorResolver(async(req,res)=>{
    const {id}=req.params
    const user=await singleUserServices(id)
    res.json({status:STATUS.SUCCESS,message:"user details ...",user})
})

//order list
export const orderDetails=asyncErrorResolver(async(req,res)=>{
    const orderList=await getAllOrderServices()
    res.json({status:STATUS.SUCCESS,message:"order list ...",order:orderList})
})

//total revenue
export const totalRevenue=asyncErrorResolver(async(req,res)=>{
    const totalprofit=await getTotalRevenueServices()
    const total=totalprofit.length>0?totalprofit[0].totalRevenue:0
    res.json({status:STATUS.SUCCESS,message:"total revenue ",total})
})


