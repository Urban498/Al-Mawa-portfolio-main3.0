import { NextResponse } from "next/server";
import { connectDB } from "../../libs/db";
import jobApllyModel from "../../models/job-apply-schema";
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

        const deleteData = await jobApllyModel.findByIdAndDelete(id);
        if (!deleteData) {
            return NextResponse.json({ 
                success: false, 
                message: "Job application not found" 
            }, { status: 404, headers: corsHeaders });
        }

        console.log("Job application deleted successfully:", deleteData._id);
        return NextResponse.json({ 
            success: true, 
            message: "Job application deleted successfully" 
        }, { headers: corsHeaders });
    } catch (error) {
        console.error("Delete job application error:", error);
        return NextResponse.json({ 
            success: false, 
            message: error.message || "Failed to delete job application" 
        }, { status: 500, headers: corsHeaders });
    }
}
