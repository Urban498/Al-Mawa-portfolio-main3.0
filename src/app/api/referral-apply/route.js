import { NextResponse } from "next/server";
import { connectDB } from "../libs/db";
import ReferralModel from "../models/referral-schema";
import { corsHeaders, handleOptions } from "@/lib/cors";

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
      companyName, 
      designationPosition, 
      referralSource, 
      interestedServices, 
      clientDetails,
      message 
    } = reqBody || {};

    if (!fullName || !emailAddress || !phoneNumber || !companyName || !designationPosition || !referralSource || !interestedServices) {
      return NextResponse.json(
        {
          success: false,
          message: "All required fields must be provided"
        },
        { status: 400, headers: corsHeaders }
      );
    }

    const app = new ReferralModel({
      fullName,
      emailAddress,
      phoneNumber: parseInt(String(phoneNumber), 10),
      companyName,
      designationPosition,
      referralSource,
      interestedServices,
      clientDetails: clientDetails || "",
      message: message || ""
    });

    const saved = await app.save();

    return NextResponse.json(
      {
        success: true,
        message: "Referral application submitted successfully",
        data: saved
      },
      { headers: corsHeaders }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Failed to submit referral application"
      },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function GET() {
  await connectDB();

  try {
    const applications = await ReferralModel.find().sort({ createdAt: -1 });
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
        message: error?.message || "Failed to fetch referral applications"
      },
      { status: 500, headers: corsHeaders }
    );
  }
}
