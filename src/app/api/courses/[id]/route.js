import { NextResponse } from "next/server";
import { connectDB } from "../../libs/db";
import CourseModel from "../../models/course_schema";
import { corsHeaders, handleOptions } from "@/lib/cors";

export async function OPTIONS() {
  return handleOptions();
}

export async function PUT(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;
    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID is required" },
        { status: 400, headers: corsHeaders }
      );
    }

    const body = await request.json();

    const updated = await CourseModel.findByIdAndUpdate(id, body, { new: true });
    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Course not found" },
        { status: 404, headers: corsHeaders }
      );
    }

    return NextResponse.json(
      { success: true, data: updated },
      { headers: corsHeaders }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error?.message || "Failed to update course" },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;
    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID is required" },
        { status: 400, headers: corsHeaders }
      );
    }

    const deleted = await CourseModel.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "Course not found" },
        { status: 404, headers: corsHeaders }
      );
    }

    return NextResponse.json(
      { success: true, message: "Course deleted successfully" },
      { headers: corsHeaders }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error?.message || "Failed to delete course" },
      { status: 500, headers: corsHeaders }
    );
  }
}
