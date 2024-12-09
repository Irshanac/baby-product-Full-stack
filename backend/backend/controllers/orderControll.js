import asyncErrorResolver from "../middlewares/asyncErrorResolver.js";
import { STATUS } from "../utils/constants.js";
import { addOrderServices, showOrderServices } from "../service/oderService.js";
export const addOrder = asyncErrorResolver(async (req, res) => {
  const userId = req.user._id;
  const { name, address, paymentMethod, total } = req.body;
  await addOrderServices(
    name,
    address,
    paymentMethod,
    total,
    userId
  );
  res.status(200).json({status:STATUS.SUCCESS,message:"order success"})
});

//get all orders
export const showOrders = asyncErrorResolver(async (req, res) => {
    const userId = req.user._id; 
    const { page } = req.query; 
    const { orders,
        pagination} = await showOrderServices(
      userId,
      parseInt(page, 10) || 1, 
      10 
    );
    const message = orders.length 
    ? "Orders retrieved successfully" 
    : "No orders found";
    res.status(200).json({
      status: STATUS.SUCCESS,
      message,
      orders,
      pagination

    });
  });
  
