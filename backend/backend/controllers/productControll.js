import asyncErrorResolver from "../middlewares/asyncErrorResolver.js";
import { STATUS } from "../utils/constants.js";
import { addProductionServices ,productService,deleteProductServices,editProductServices,singleProductServices} from "../service/productService.js";
import CustomError from "../utils/customError.js";
//add product
export const addProduct = asyncErrorResolver(async (req, res) => {
  const { name, ...rest } = req.body;

  const data = await addProductionServices({ name, ...rest });
  res.status(201).json({
    success: STATUS.SUCCESS,
    message: "Product added successfully.",
    data,
  });
});


//delete product
export const deleteProduct=asyncErrorResolver(async(req,res)=>{
  const {id}=req.params
  await deleteProductServices(id)
  res.json({status:STATUS.SUCCESS,message:"Product deleted successfully"})
 
})

//edit product
export const editProduct=asyncErrorResolver(async(req,res)=>{
  const { _id, ...updateProduct } = req.body;
  if (!_id) {
      throw new CustomError("product is not found",400)
  }
  const updatedProduct = await editProductServices(_id, updateProduct);
  res.status(200).json({
      status: STATUS.SUCCESS,
      message: 'Product updated successfully',
      data: updatedProduct,
  });

})


//get single product
export const singleProduct =asyncErrorResolver(async(req,res)=>{
  const {id}=req.params
  const product=await singleProductServices(id)
  res.status(200).json({
    status:STATUS.SUCCESS,
    product
  })
})

//get product
export const getProducts=asyncErrorResolver(async(req,res)=>{
  const {category,page,search}=req.query
  const {products,pagination} = await productService({
    category,
    page: parseInt(page, 10) || 1,
    limit: 10,
    search,
  });
  if(products.length===0)
    res.status(200).json({status:STATUS.SUCCESS,message:"No products found"})
  else
    res.status(200).json({
    status: STATUS.SUCCESS,
    products,
    pagination
  });
})