import mongoose from "mongoose";

const franchiseSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  emailAddress: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
  businessName: { type: String, required: true },
  location: { type: String, required: true },
  yearsOfExperience: { type: Number, required: true },
  investmentCapacity: { type: String, required: true }, // e.g., "5-10 Lakh", "10-20 Lakh"
  businessBackground: { type: String, required: false },
  message: { type: String, required: false },
  createdAt: { type: Date, default: Date.now }
});

const FranchiseModel = mongoose.models.FranchiseModel || mongoose.model("FranchiseModel", franchiseSchema);
export default FranchiseModel;
