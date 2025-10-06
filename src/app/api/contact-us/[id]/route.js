
import { NextResponse } from "next/server";
import { connectDB } from "../../libs/db";
import { ContactModel } from "../../models/contact_schema";

// CORS headers helper
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// Handle preflight requests
export async function OPTIONS() {
  return new Response(null, { status: 200, headers: corsHeaders });
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
        }, { headers: corsHeaders });
    } catch (error) {
        console.error('❌ Contact form error:', error);
        return NextResponse.json({
            success: false,
            message: error.message || "Failed to submit contact form"
        }, { status: 500, headers: corsHeaders });    
    }
}

export async function GET() {
    await connectDB()
    try {
        const getdata = await ContactModel.find()
        if (getdata.length ===0) {
            return NextResponse.json({message:"No data Available"}, { headers: corsHeaders })

        }
        return NextResponse.json({success:true,data:getdata}, { headers: corsHeaders })
    } catch (error) {
        return NextResponse.json({success:false,message:error}, { headers: corsHeaders })
    }
}

export async function DELETE(request, { params }) {
    await connectDB();
    try {
        const { id } =await params; // now params.id will have the value
        if (!id) {
            return NextResponse.json({ success: false, message: "ID is required" }, { headers: corsHeaders });
        }

        const deleteData = await ContactModel.findByIdAndDelete(id);
        if (!deleteData) {
            return NextResponse.json({ success: false, message: "Data not found" }, { headers: corsHeaders });
        }

        console.log("Data deleted successfully:", deleteData._id);
        return NextResponse.json({ success: true, message: "Data deleted successfully" }, { headers: corsHeaders });
    } catch (error) {
        console.error("Delete error:", error);
        return NextResponse.json({ success: false, message: error.message || error }, { headers: corsHeaders });
    }
}

