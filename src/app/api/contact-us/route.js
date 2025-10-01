
import { NextResponse } from "next/server";
import { connectDB } from "../libs/db";
import { ContactModel } from "../models/contact_schema";


export async function POST(request) {
    console.log("🔄 Contact form API called");
    
    try {
        await connectDB();
        console.log("✅ Database connected");
        
        const reqBody = await request.json();
        console.log("📝 Request body:", reqBody);
        
        // Validate required fields
        const { firstname, lastName, emailAddress, phoneNumber, selecetCountry, subject, tellUSAboutYou } = reqBody;
        
        if (!firstname || !lastName || !emailAddress || !phoneNumber || !selecetCountry || !subject || !tellUSAboutYou) {
            console.log("❌ Missing required fields");
            return NextResponse.json({
                success: false,
                message: "All fields are required"
            }, { status: 400 });
        }
        
        console.log("✅ All fields validated");
        
        const contact_Data = new ContactModel(reqBody);
        console.log("📄 Contact model created:", contact_Data);
        
        const savedData = await contact_Data.save();
        console.log("💾 Data saved successfully:", savedData._id);
        
        return NextResponse.json({
            success: true, 
            message: "Contact form submitted successfully", 
            data: savedData
        });
    } catch (error) {
        console.error('❌ Contact form error:', error);
        return NextResponse.json({
            success: false,
            message: error.message || "Failed to submit contact form"
        }, { status: 500 });    
    }
}

export async function GET() {
    await connectDB()
    try {
        const getdata = await ContactModel.find()
        if (getdata.length ===0) {
            return NextResponse.json({message:"No data Available"})

        }
        return NextResponse.json({success:true,data:getdata})
    } catch (error) {
        return NextResponse.json({success:false,message:error})
    }
}