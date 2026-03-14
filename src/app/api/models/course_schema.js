import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    iconKey: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    desc: { type: String, required: true },
    details: {
      overview: { type: String, required: true },
      whatYouWillLearn: { type: [String], required: true },
      whoIsThisFor: { type: [String], required: true }
    }
  },
  { timestamps: true }
);

const CourseModel = mongoose.models.CourseModel || mongoose.model("CourseModel", courseSchema);

export default CourseModel;
