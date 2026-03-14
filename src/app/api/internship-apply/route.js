import { NextResponse } from "next/server";
import { connectDB } from "../libs/db";
import InternshipApplyModel from "../models/internship-apply-schema";
import { corsHeaders, handleOptions } from "@/lib/cors";

export async function OPTIONS() {
  return handleOptions();
}

export async function POST(request) {
  try {
    await connectDB();

    const reqBody = await request.json();
    const { fullName, emailAddress, phoneNumber, courseOfInterest, message } =
      reqBody || {};

    if (!fullName || !emailAddress || !phoneNumber || !courseOfInterest) {
      return NextResponse.json(
        {
          success: false,
          message: "All required fields must be provided"
        },
        { status: 400, headers: corsHeaders }
      );
    }

    const app = new InternshipApplyModel({
      fullName,
      emailAddress,
      phoneNumber: parseInt(String(phoneNumber), 10),
      courseOfInterest,
      message: message || ""
    });

    const saved = await app.save();

    return NextResponse.json(
      {
        success: true,
        message: "Internship application submitted successfully",
        data: saved
      },
      { headers: corsHeaders }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Failed to submit internship application"
      },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function GET() {
  await connectDB();

  try {
    const applications = await InternshipApplyModel.find();

    if (applications.length === 0) {
      return NextResponse.json(
        { message: "No internship applications found" },
        { headers: corsHeaders }
      );
    }

    return NextResponse.json(
      { success: true, data: applications },
      { headers: corsHeaders }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error?.message },
      { status: 500, headers: corsHeaders }
    );
  }
}
