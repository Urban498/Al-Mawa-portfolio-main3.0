import { NextResponse } from "next/server";
import { connectDB } from "../libs/db";
import EnquiryModel from "../models/enquiry_schema";
import { corsHeaders, handleOptions } from "@/lib/cors";

// Handle preflight requests
export async function OPTIONS() {
  return handleOptions();
}

export async function POST(request) {
    console.log("🔄 Enquiry API called");
    
    try {
        await connectDB();
        console.log("✅ Database connected");
        
        const reqBody = await request.json();
        console.log("📝 Request body:", reqBody);
        
        // Validate required fields
        const { fullName, Email, Number: phoneNumber, ServiceIntrestedIn, ProjectDetails } = reqBody;
        
        if (!fullName || !Email || !ServiceIntrestedIn || !ProjectDetails) {
            console.log("❌ Missing required fields");
            return NextResponse.json({
                success: false,
                message: "All required fields must be provided"
            }, { status: 400 });
        }
        
        console.log("✅ All fields validated");
        
        const enquiry_Data = new EnquiryModel(reqBody);
        console.log("📄 Enquiry model created:", enquiry_Data);
        
        const savedData = await enquiry_Data.save();
        console.log("💾 Data saved successfully:", savedData._id);
        
        return NextResponse.json({
            success: true,
            message: "Enquiry submitted successfully",
            data: savedData
        }, { headers: corsHeaders });
    } catch (error) {
        console.error("❌ Enquiry API error:", error);
        return NextResponse.json({
            success: false,
            message: error.message || "Failed to submit enquiry"
        }, { status: 500, headers: corsHeaders });
    }
}

export async function GET() {
    await connectDB()
    try {
        const getdata = await EnquiryModel.find()
        if (getdata.length === 0) {
            return NextResponse.json({message:"No data Available in enquiry form"}, { headers: corsHeaders })
        }
        return NextResponse.json({success:true,data:getdata}, { headers: corsHeaders })
    } catch (error) {
        return NextResponse.json({success:false,message:error}, { headers: corsHeaders })
    }
}