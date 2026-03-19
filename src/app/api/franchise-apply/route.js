import { NextResponse } from "next/server";
import { connectDB } from "../libs/db";
import FranchiseModel from "../models/franchise-schema";
import { corsHeaders, handleOptions } from "@/lib/cors";
import { sendFranchiseApplicationEmail } from "../libs/applicationEmailService";

export async function OPTIONS() {
  return handleOptions();
}

export async function POST(request) {
  try {
    await connectDB();

    const reqBody = await request.json();
    const { 
      fullName, 
      emailAddress, 
      phoneNumber, 
      businessName, 
      location, 
      yearsOfExperience, 
      investmentCapacity, 
      businessBackground,
      message 
    } = reqBody || {};

    if (!fullName || !emailAddress || !phoneNumber || !businessName || !location || yearsOfExperience === undefined || !investmentCapacity) {
      return NextResponse.json(
        {
          success: false,
          message: "All required fields must be provided"
        },
        { status: 400, headers: corsHeaders }
      );
    }

    const app = new FranchiseModel({
      fullName,
      emailAddress,
      phoneNumber: parseInt(String(phoneNumber), 10),
      businessName,
      location,
      yearsOfExperience: parseInt(String(yearsOfExperience), 10),
      investmentCapacity,
      businessBackground: businessBackground || "",
      message: message || ""
    });

    const saved = await app.save();

    // Send emails to user and director
    await sendFranchiseApplicationEmail(
      emailAddress,
      fullName,
      businessName,
      location,
      investmentCapacity
    );

    return NextResponse.json(
      {
        success: true,
        message: "Franchise application submitted successfully",
        data: saved
      },
      { headers: corsHeaders }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Failed to submit franchise application"
      },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function GET() {
  await connectDB();

  try {
    const applications = await FranchiseModel.find().sort({ createdAt: -1 });
    return NextResponse.json(
      {
        success: true,
        data: applications
      },
      { headers: corsHeaders }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Failed to fetch franchise applications"
      },
      { status: 500, headers: corsHeaders }
    );
  }
}
