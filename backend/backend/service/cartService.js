import product from "../models/productModel.js";
import Cart from "../models/cartModel.js";
import CustomError from "../utils/customError.js";

//add to cart
export const AddCartServices=async(productId,userid)=>{
    
    //find the product
    const existingItem=await product.findById(productId)
    if(!existingItem)
        throw CustomError("product is not present",401)
    let cart=await Cart.findOne({user:userid})
    if (!cart) {
        cart = new Cart({ user: userid, products: [] });
    }
    const existingIndex=cart.products.findIndex((item) => item.product.toString() === productId)
    
    if(existingIndex > -1)
    {
        const currentQuantity = cart.products[existingIndex].quantity;
        if (currentQuantity + 1 > existingItem.quantity) {
            throw new CustomError( "You cannot add the product to the cart. Insufficient stock.",400)
        }
        cart.products[existingIndex].quantity+=1
       throw new CustomError( "Product already exists in the cart, ",400)//quantity increased.
    }   
    else
    {
        cart.products.push({product:productId,quantity:1})
    }
    await cart.save()
}
export const getCartServices=async(userId)=>{
    const cart = await Cart.findOne({ user: userId }).populate("products.product");
    return cart
}
export const deleteCartService = async (userId, productId) => {
    const result = await Cart.updateOne(
        { user: userId },
        { $pull: { products: { product: productId } } }
    ); 
    if (result.modifiedCount === 0) {
        throw new CustomError("Cart not found for the user or product not in cart.", 401);
    }
};
