import mongoose from "mongoose";



const jobApllySchema = new mongoose.Schema({
	FirstName: { type: String, required: true },
	LastName: { type: String, required: true },
	EmailAddress: { type: String, required: true },
	PhoneNumber: { type: Number, required: true },
	YearOfExperience: { type: Number, required: true },
	MonthsOfExperience: { type: Number, required: false, default: 0 },
	Coverletter: { type: String, required: true },
	ResumeLink: { type: String, required: true },
});

const jobApllyModel = mongoose.models.jobApllyModel || mongoose.model("jobApllyModel", jobApllySchema);
export default jobApllyModel;