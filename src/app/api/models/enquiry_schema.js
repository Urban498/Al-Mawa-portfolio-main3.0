import mongoose from "mongoose";


const Enquiry_Schema = new mongoose.Schema({
fullName:{type:String,required:true},
Email:{type:String,required:true},
Number:{type:Number,required:true},
ServiceIntrestedIn:{type:String,required:true},
ProjectDetails:{type:String,required:true}
})

const EnquiryModel = mongoose.models.EnquiryModel || mongoose.model("EnquiryModel",Enquiry_Schema)
export default EnquiryModel