import { NextResponse } from "next/server";
import { connectDB } from "../../libs/db";
import EnquiryModel from "../../models/enquiry_schema";
import { corsHeaders, handleOptions } from "@/lib/cors";

// Handle preflight requests
export async function OPTIONS() {
  return handleOptions();
}

export async function DELETE(request, { params }) {
    await connectDB();
    try {
        const { id } = await params;
        if (!id) {
            return NextResponse.json({ 
                success: false, 
                message: "ID is required" 
            }, { status: 400, headers: corsHeaders });
        }

        const deleteData = await EnquiryModel.findByIdAndDelete(id);
        if (!deleteData) {
            return NextResponse.json({ 
                success: false, 
                message: "Enquiry not found" 
            }, { status: 404, headers: corsHeaders });
        }

        console.log("Enquiry deleted successfully:", deleteData._id);
        return NextResponse.json({ 
            success: true, 
            message: "Enquiry deleted successfully" 
        }, { headers: corsHeaders });
    } catch (error) {
        console.error("Delete enquiry error:", error);
        return NextResponse.json({ 
            success: false, 
            message: error.message || "Failed to delete enquiry" 
        }, { status: 500, headers: corsHeaders });
    }
}
