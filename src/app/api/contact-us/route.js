import { NextResponse } from "next/server";
import { connectDB } from "../libs/db";
import { ContactModel } from "../models/contact_schema";
import { corsHeaders, handleOptions } from "@/lib/cors";

// Handle preflight requests
export async function OPTIONS() {
  return handleOptions();
}

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
                message: "All required fields must be provided"
            }, { status: 400, headers: corsHeaders });
        }
        
        console.log("✅ All fields validated");
        
        const contactData = new ContactModel(reqBody);
        console.log("📄 Contact model created:", contactData);
        
        const savedData = await contactData.save();
        console.log("💾 Data saved successfully:", savedData._id);
        
        return NextResponse.json({
            success: true,
            message: "Contact form submitted successfully",
            data: savedData
        }, { headers: corsHeaders });
    } catch (error) {
        console.error("❌ Contact form error:", error);
        return NextResponse.json({
            success: false,
            message: error.message || "Failed to submit contact form"
        }, { status: 500, headers: corsHeaders });
    }
}

export async function GET() {
    await connectDB();
    try {
        const contacts = await ContactModel.find();
        if (contacts.length === 0) {
            return NextResponse.json({
                message: "No contact data available"
            }, { headers: corsHeaders });
        }
        return NextResponse.json({
            success: true,
            data: contacts
        }, { headers: corsHeaders });
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: error.message
        }, { status: 500, headers: corsHeaders });
    }
}
