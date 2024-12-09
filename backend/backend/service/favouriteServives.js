import Favourite from "../models/favoriteModel.js";
import Product from "../models/productModel.js";
import CustomError from "../utils/customError.js";

export const addFavouriteSerivices = async (userId, productId) => {  
    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
        throw new CustomError("Product is not available.", 404);
    }
    let userFavourite = await Favourite.findOne({ user: userId });
    if (!userFavourite) {
        userFavourite = new Favourite({ user: userId, favourite: [] });
    }
    const existingFav = userFavourite.favourite.find(
        (item) => item.toString() === productId
    );
    if (existingFav) {
        throw new CustomError ("Item already exists in favourites",400)
    }
    userFavourite.favourite.push(productId);
    await userFavourite.save();
};


export const removeFavouriteServices = async (userId, productId) => {
  const updateResult = await Favourite.updateOne(
    { user: userId },
    { $pull: { favourite: productId } } 
  );
  if (updateResult.matchedCount === 0) {
    throw new CustomError("No favourites found for the user.", 404);
  }
  if (updateResult.modifiedCount === 0) {
    throw new CustomError("Product not found in user's favourites.", 404);
  }
};


export const getFavouriteServices = async (userId) => {
    const userFavourite = await Favourite.findOne({ user: userId }).populate("favourite");
    return userFavourite
};
