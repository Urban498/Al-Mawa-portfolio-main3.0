import mongoose from "mongoose";

const internshipApplySchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    emailAddress: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    courseOfInterest: { type: String, required: true },
    message: { type: String, required: false, default: "" }
  },
  { timestamps: true }
);

const InternshipApplyModel =
  mongoose.models.InternshipApplyModel ||
  mongoose.model("InternshipApplyModel", internshipApplySchema);

export default InternshipApplyModel;
