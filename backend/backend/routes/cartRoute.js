import express from 'express'
import authenticate from '../middlewares/authMiddleware.js'
import { addToCart, getCart ,deleteCart} from '../controllers/cartControll.js'
const router=express.Router()
router.post('/addToCart/:id',authenticate,addToCart)
router.get('/getCart',authenticate,getCart)
router.delete('/deleteCart/:id',authenticate,deleteCart)
export default router