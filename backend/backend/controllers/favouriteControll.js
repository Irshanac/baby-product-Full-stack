import asyncErrorResolver from "../middlewares/asyncErrorResolver.js";
import {addFavouriteSerivices,removeFavouriteServices,getFavouriteServices} from '../service/favouriteServives.js'
import { STATUS } from "../utils/constants.js";
//add to favorite
export const addToFavourites=asyncErrorResolver(async(req,res)=>{
    const userId=req.user._id
    const {id}=req.params
    const favoriteProduct=await addFavouriteSerivices(userId,id)
    if(favoriteProduct)
        res.status(200).json({status:STATUS.SUCCESS,message:"add to favourite"})
})


//delete a single favorite
export const removeSingleFavourite=asyncErrorResolver(async(req,res)=>{
    const userId=req.user._id
    const {id}=req.params
    await removeFavouriteServices(userId,id)
    res.json({status:STATUS.SUCCESS,message:"Product removed from favourites successfully."})
})

//get all favorite
export const getAllFavorite=asyncErrorResolver(async(req,res)=>{
    const userId=req.user._id
    const userFavourite  = await getFavouriteServices(userId);
    if (!userFavourite || userFavourite.favourite.length === 0) {
        res.status(200).json({status:STATUS.SUCCESS,message:"empty"})
    }
    else
        res.status(200).json({status:STATUS.SUCCESS,favourite:userFavourite.favourite})
    
})