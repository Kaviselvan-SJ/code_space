import mongoose from "mongoose";
const contestSchema = new mongoose.Schema({
  name: String,
  date: Date,
});
export default mongoose.model("Contest", contestSchema);