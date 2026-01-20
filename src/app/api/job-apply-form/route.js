import { NextResponse } from "next/server";
import { connectDB } from "../libs/db";
import jobApllyModel from "../models/job-apply-schema";
import { v2 as cloudinary } from 'cloudinary';
import { corsHeaders, handleOptions } from "@/lib/cors";

// Handle preflight requests
export async function OPTIONS() {
  return handleOptions();
}

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
  console.log("🔄 Job application API called");
  
  try {
    await connectDB();
    console.log("✅ Database connected");

    const formData = await request.formData();
    const file = formData.get('resume');

    console.log("📁 File info:", {
      name: file?.name,
      type: file?.type,
      size: file?.size
    });

    if (!file) {
      console.log("❌ No file provided");
      return NextResponse.json({
        success: false,
        message: "Resume file is required"
      }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    console.log("🔍 Checking file type:", file.type);
    
    if (!allowedTypes.includes(file.type)) {
      console.log("❌ Invalid file type:", file.type);
      return NextResponse.json({
        success: false,
        message: `File type ${file.type} not allowed. Only PDF and Word documents are accepted.`
      }, { status: 400 });
    }
    
    console.log("✅ File type validated");

    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json({
        success: false,
        message: "File size should not exceed 5MB"
      }, { status: 400 });
    }

    console.log("☁️ Starting Cloudinary upload...");
    
    // Upload to Cloudinary
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: 'raw', // Use 'raw' instead of 'auto' for documents
          folder: 'job-applications',
          public_id: `resume_${Date.now()}`,
          // Remove allowed_formats to be more permissive
        },
        (error, result) => {
          if (error) {
            console.error("❌ Cloudinary upload error:", error);
            reject(new Error(`Cloudinary upload failed: ${error.message}`));
          } else {
            console.log("✅ Cloudinary upload successful:", result.secure_url);
            resolve(result);
          }
        }
      ).end(buffer);
    });

    console.log("📝 Processing form data...");
    
    // Get form data
    const firstName = formData.get('firstName') || formData.get('FirstName');
    const lastName = formData.get('lastName') || formData.get('LastName');
    const emailAddress = formData.get('emailAddress') || formData.get('EmailAddress');
    const phoneNumber = formData.get('phoneNumber') || formData.get('PhoneNumber');
    const yearOfExperience = formData.get('yearOfExperience') || formData.get('YearOfExperience');
    const monthsOfExperience = formData.get('monthsOfExperience') || formData.get('MonthsOfExperience');
    const coverLetter = formData.get('coverLetter') || formData.get('Coverletter') || formData.get('coverletter');

    console.log('📋 Form data received:', {
      firstName,
      lastName,
      emailAddress,
      phoneNumber,
      yearOfExperience,
      coverLetter
    });

    // Validate required fields
    if (!firstName || !lastName || !emailAddress || !phoneNumber || !yearOfExperience || !coverLetter) {
      return NextResponse.json({
        success: false,
        message: "All fields are required",
        received: {
          firstName,
          lastName,
          emailAddress,
          phoneNumber,
          yearOfExperience,
          monthsOfExperience,
          coverLetter
        }
      }, { status: 400 });
    }

    // Create job application data
    const jobApplicationData = {
      FirstName: firstName,
      LastName: lastName,
      EmailAddress: emailAddress,
      PhoneNumber: parseInt(String(phoneNumber), 10),
      YearOfExperience: parseInt(String(yearOfExperience), 10),
      MonthsOfExperience: monthsOfExperience ? parseInt(String(monthsOfExperience), 10) : 0,
      Coverletter: coverLetter,
      ResumeLink: uploadResult.secure_url,
    };

    // Save to database
    const jobApplication = new jobApllyModel(jobApplicationData);
    await jobApplication.save();

    return NextResponse.json({
      success: true,
      message: "Job application submitted successfully",
      data: {
        id: jobApplication._id,
        resumeUrl: uploadResult.secure_url,
        publicId: uploadResult.public_id
      }
    }, { headers: corsHeaders });

  } catch (error) {
    console.error('Job application error:', error);

    return NextResponse.json({
      success: false,
      message: error.message || "Failed to submit job application"
    }, { status: 500, headers: corsHeaders });
  }
}

export async function GET() {
  await connectDB();

  try {
    const applications = await jobApllyModel.find();

    if (applications.length === 0) {
      return NextResponse.json({
        message: "No job applications found"
      }, { headers: corsHeaders });
    }

    return NextResponse.json({
      success: true,
      data: applications
    }, { headers: corsHeaders });

  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message
    }, { status: 500, headers: corsHeaders });
  }
}