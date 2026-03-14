import { NextResponse } from "next/server";
import { connectDB } from "../libs/db";
import CourseModel from "../models/course_schema";
import { corsHeaders, handleOptions } from "@/lib/cors";

export async function OPTIONS() {
  return handleOptions();
}

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const { iconKey, slug, title, desc, details } = body || {};

    if (
      !iconKey ||
      !slug ||
      !title ||
      !desc ||
      !details?.overview ||
      !Array.isArray(details?.whatYouWillLearn) ||
      !Array.isArray(details?.whoIsThisFor)
    ) {
      return NextResponse.json(
        { success: false, message: "All required fields must be provided" },
        { status: 400, headers: corsHeaders }
      );
    }

    const course = new CourseModel({
      iconKey,
      slug,
      title,
      desc,
      details: {
        overview: details.overview,
        whatYouWillLearn: details.whatYouWillLearn,
        whoIsThisFor: details.whoIsThisFor
      }
    });

    const saved = await course.save();

    return NextResponse.json(
      { success: true, message: "Course added successfully", data: saved },
      { headers: corsHeaders }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error?.message || "Failed to add course" },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    if (slug) {
      const course = await CourseModel.findOne({ slug });
      return NextResponse.json(
        { success: true, data: course ? [course] : [] },
        { headers: corsHeaders }
      );
    }

    const courses = await CourseModel.find();
    return NextResponse.json(
      { success: true, data: courses },
      { headers: corsHeaders }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error?.message || "Failed to fetch courses" },
      { status: 500, headers: corsHeaders }
    );
  }
}
