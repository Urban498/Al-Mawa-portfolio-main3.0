import mongoose from "mongoose";


const Contact_schema = mongoose.Schema({
firstname:{type:String,required: true},
lastName:{type:String,required: true},
emailAddress:{type:String,required:true},
phoneNumber:{type:Number,required:true},
selecetCountry:{type:String,required:true},
subject:{type:String,required:true},
tellUSAboutYou:{type:String,required:true}
})
export const ContactModel = mongoose.models.contacts || mongoose.model("contacts",Contact_schema)