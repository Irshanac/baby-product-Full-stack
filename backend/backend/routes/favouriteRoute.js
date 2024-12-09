import {addToFavourites,removeSingleFavourite,getAllFavorite} from '../controllers/favouriteControll.js'
import express from 'express'
import authenticate from '../middlewares/authMiddleware.js'
const router=express.Router()
router.post('/addFavourite/:id',authenticate,addToFavourites)
router.delete('/deleteFavourite/:id',authenticate,removeSingleFavourite)
router.get('/getFavourite',authenticate,getAllFavorite)
export default router