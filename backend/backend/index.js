import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectionDB from "./config/db.js";
import userRoutes from "./routes/userRouter.js";
import cartRoutes from "./routes/cartRoute.js";
import productRouters from "./routes/productRoute.js";
import favouriteRouter from "./routes/favouriteRoute.js";
import orderRouter from "./routes/orderRouter.js";
import adminRouter from "./routes/adminRouter.js";
import errorHandler from "./middlewares/errorHandler.js";

dotenv.config(); 

const app = express();

// Database Connection
connectionDB();

// Middleware Setup
app.use(cors({ 
  origin: process.env.CLIENT_URL, // Add frontend URL here
  credentials: true, // Allow cookies from the frontend
}));
app.use(express.json()); 
app.use(cookieParser()); 


app.use("/api/user", userRoutes);
app.use("/api/products", productRouters);
app.use("/api/cart", cartRoutes);
app.use("/api/favourite", favouriteRouter);
app.use("/api/order", orderRouter);
app.use("/api/admin", adminRouter);

app.use(errorHandler);

// Server Configuration
const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
