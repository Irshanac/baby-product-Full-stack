import mongoose from "mongoose";

const favouriteSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    favourite: [{ type: mongoose.Schema.Types.ObjectId, ref: "product", required: true }],
});

const Favourite = mongoose.model("favourite", favouriteSchema);

export default Favourite;
