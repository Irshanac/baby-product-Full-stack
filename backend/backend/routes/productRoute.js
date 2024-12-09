import express from 'express'
import { addProduct,getProducts,deleteProduct ,editProduct,singleProduct} from '../controllers/productControll.js'
import authenticate from '../middlewares/authMiddleware.js'
import isAdmin from '../middlewares/isAdmin.js'
const router=express.Router()
router.post("/api/admin/addProduct",authenticate,isAdmin,addProduct)
router.get("/getProduct", getProducts);
router.delete("/api/admin/deleteProduct/:id",authenticate,isAdmin,deleteProduct)
router.put("/api/admin/editproducts",authenticate,isAdmin,editProduct)
router.get("/api/admin/singleProduct/:id",authenticate,isAdmin,singleProduct)
export default router