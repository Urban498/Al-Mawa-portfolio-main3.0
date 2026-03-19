import mongoose from "mongoose";

const referralSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  emailAddress: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
  companyName: { type: String, required: true },
  designationPosition: { type: String, required: true },
  referralSource: { type: String, required: true }, // e.g., "Web Services", "Digital Marketing", "IT Services"
  interestedServices: { type: String, required: true },
  clientDetails: { type: String, required: false },
  message: { type: String, required: false },
  createdAt: { type: Date, default: Date.now }
});

const ReferralModel = mongoose.models.ReferralModel || mongoose.model("ReferralModel", referralSchema);
export default ReferralModel;
