import asyncErrorResolver from "../middlewares/asyncErrorResolver.js";
import { STATUS } from "../utils/constants.js";
import { AddCartServices ,getCartServices,deleteCartService} from "../service/cartService.js";
//add to cart
export const addToCart = asyncErrorResolver(async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;//req.user._id; 
    await AddCartServices(id, userId);
    res.json({ status: STATUS.SUCCESS, message:"add product success"});
});

//get all item in cart
export const getCart=asyncErrorResolver(async(req,res)=>{
    //const userId=req.user._id
    const userId = req.user.id;
    const cart = await getCartServices(userId);
    if(!cart)
        res.status(200).json({status:STATUS.SUCCESS,message:"Your cart is empty"})
    else 
        res.status(200).json({status:STATUS.SUCCESS,message:"cart list ....",cart})
})

//delete item in cart
export const deleteCart=asyncErrorResolver(async(req,res)=>{
    const {id}=req.params
    const userId = req.user._id;
    await deleteCartService(userId,id)
    res.json({status:STATUS.SUCCESS,message:"delete cart success"})
})