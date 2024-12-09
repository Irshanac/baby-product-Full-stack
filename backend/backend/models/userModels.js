// userModel.js

import mongoose from "mongoose";
import { passwordValidator } from "../validation/userValidation.js"; 

const userModel = new mongoose.Schema({
  username: { type: String, required: true },
  password: { 
    type: String, 
    required: true, 
    validate: passwordValidator
  },
  name: { type: String, required: true },
  email: { 
    type: String, 
    required: true
  },
  isAdmin: { type: Boolean, required: true, default: false },
  isBlock: { type: Boolean, required: true, default: false },
});

const user = mongoose.model("user", userModel);
export default user;
