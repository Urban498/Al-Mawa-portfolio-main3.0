import mongoose from "mongoose";


const Opt_schema = mongoose.Schema({
name:{type:String,},
message:{type:String,},
company:{type:String,},
number:{type:Number,},
})
export const OptModel = mongoose.models.opt || mongoose.model("opt",Opt_schema)