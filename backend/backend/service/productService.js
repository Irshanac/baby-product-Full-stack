import product from "../models/productModel.js";
import CustomError from "../utils/customError.js";

//add new product 
export const addProductionServices = async ({ name, ...rest }) => {
    const existingItem = await product.findOne({ name });
    if (existingItem) {
      throw new CustomError("Product already exists.", 400);
    }
    const newProduct = new product({ name, ...rest });
    await newProduct.save();
    return newProduct;
  };


//delete a single product
export const deleteProductServices=async(productId)=>{
  const existingProduct = await product.findById(productId);
  if (!existingProduct) {
    throw new CustomError("Product is unavailable", 400);
  }
 return await product.findByIdAndUpdate(
    productId,  { isDelete: true },{ new: true } 
  );
};


//edit a product
export const editProductServices=async(id,updateProduct)=>{
  const existingProduct=await product.findById(id)
  if(!existingProduct)
  {
    throw new CustomError("product is unavailable",400)
  }
  const data = await product.findByIdAndUpdate(id, { $set: updateProduct }, { new: true });
  return data
}

 
  //get single product
export const singleProductServices=async(id)=>
{
const existingProduct=await product.findById(id)
  if(!existingProduct)
    throw new CustomError("product is unavailable",400)
  return existingProduct
}

//  //get all product
//  export const getProductServices=async()=>{
//   const allData=await product.find({$isDelete:{$eq:false}})
//   return allData
// }


// export const productByCategoryService=async(category)=>{
//   if (!category) {
//    throw CustomError("Category is required.", 400)
// }
// const products = await product.find({ category: new RegExp(`^${category}$`, "i") });
// if (!products || products.length === 0) {
//     return { message: `No products found in category`, products: [] };
// }

// return { message: `Products.....`, products };

// }

//get product

export const productService = async ({ category, page = 1, limit = 10, search }) => {
  const query = { isDelete: false }; 

  // Add category
  if (category) {
    query.category = { $regex: `^${category}$`, $options: "i" };
  }

  // Add search
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { category: { $regex: search, $options: "i" } },
    ];
  }

  // pagination
  const skip = (page - 1) * limit;
  const total = await product.countDocuments(query);
  const products = await product.find(query).skip(skip).limit(limit);

  return {
    products,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};
