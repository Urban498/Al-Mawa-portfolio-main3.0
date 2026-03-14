import { NextResponse } from "next/server";
import { connectDB } from "../../libs/db";
import InternshipApplyModel from "../../models/internship-apply-schema";
import { corsHeaders, handleOptions } from "@/lib/cors";

export async function OPTIONS() {
  return handleOptions();
}

export async function DELETE(request, { params }) {
  await connectDB();
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID is required" },
        { status: 400, headers: corsHeaders }
      );
    }

    const deleted = await InternshipApplyModel.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "Internship application not found" },
        { status: 404, headers: corsHeaders }
      );
    }

    return NextResponse.json(
      { success: true, message: "Internship application deleted successfully" },
      { headers: corsHeaders }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Failed to delete internship application"
      },
      { status: 500, headers: corsHeaders }
    );
  }
}
