import mongoose from "mongoose";
const ProductSchema = new mongoose.Schema({
  name: {type: String,required: true,},
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  description: { type: String, require: true },
  category: { type: String, require: true },
  url: { type: String, require: true },
  isDelete:{type:Boolean,required:true,default:false}
});
const product=mongoose.model('product',ProductSchema)
export default product