import mongoose from "mongoose";
const companySchema = new mongoose.Schema({
  name: String,
  domain: String,
});
export default mongoose.model("Company", companySchema);