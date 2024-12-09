import Order from "../models/orderModel.js";
import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";
import CustomError from "../utils/customError.js";
export const addOrderServices = async (
  name,        
  address,     
  paymentMethod, 
  total,      
  userId
) => {
  const cart = await Cart.findOne({ user: userId });
  if (!cart || cart.products.length === 0) {
    throw new CustomError("Your cart is empty. Add items before placing an order.");
  }

  
  const order = new Order({
    user: userId,
    items: [],
    date: new Date(),
    name,             
    address,          
    paymentMethod,    
    total             
  });
  for (let item of cart.products) {
    const product = await Product.findById(item.product);
    if (!product) {
      throw new CustomError(`Product with ID "${item.product}" does not exist.`);
    }

    if (product.quantity < item.quantity) {
      throw new CustomError(`Insufficient quantity for ${product.name}.`);
    }
    product.quantity -= item.quantity;
    await product.save();
    order.items.push({ productId: item.product, quantity: item.quantity });
  }
  await order.save();
  cart.products = [];
  await cart.save();
};

export const showOrderServices = async (userId, page = 1, limit = 10) => {
  const skip = (page - 1) * limit; 
  const total = await Order.countDocuments({ user: userId });
  const orders = await Order.find({ user: userId })
    .populate({ path: 'items.productId', model: 'product' })
    .skip(skip)
    .limit(limit);

  return {
    orders,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

