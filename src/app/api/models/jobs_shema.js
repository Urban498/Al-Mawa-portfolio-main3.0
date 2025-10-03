// jobs details apply form 
import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    jobTitle:{type:String,required:true},
    jobDescription:{type:String,required:true},
    jobkeySkills:{type:[String],required:true},
    // jobdetails:{type:String,required:true},
    jobDepartment:{type:String,required:true},
    jobType:{type:String,required:true},
})

const jobModel = mongoose.models.jobModel || mongoose.model("jobModel",jobSchema)
export default jobModel