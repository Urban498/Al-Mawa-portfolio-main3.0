import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { generateOTP, sendOTPEmail } from "../libs/emailService";
import { generateBackupCodes } from "../libs/backupCodes";
import AdminOTP from "../models/AdminOTP";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password, otp, backupCode, step } = body;

    // STEP 1: Initial login with credentials
    if (step === 1) {
      if (!email || !password) {
        return NextResponse.json({
          success: false,
          error: "Email and password are required",
        });
      }

      const adminEmail = process.env.ADMIN_EMAIL;
      const adminPassword = "$2b$10$qdK3pem8bhAWyj0Q45UxfuWcxir7HORQDwFiFiSBSe7jkgdTReBJO";

      // Verify email
      if (email !== adminEmail) {
        return NextResponse.json({ success: false, error: "Email is wrong" });
      }

      // Verify password
      const isMatch = await bcrypt.compare(password, adminPassword);
      if (!isMatch) {
        return NextResponse.json({ success: false, error: "Password is wrong" });
      }

      // Connect to MongoDB
      if (mongoose.connection.readyState === 0) {
        await mongoose.connect(process.env.MONGODB_URI);
      }

      // Generate OTP & Backup Codes
      const newOTP = generateOTP();
      const backupCodes = generateBackupCodes();

      // Format backup codes for storage
      const formattedBackupCodes = backupCodes.map((code) => ({
        code: code.replace(/[-\s]/g, "").toUpperCase(),
        used: false,
      }));

      // Clear existing OTP records
      await AdminOTP.deleteOne({ email });

      // Create new OTP record
      await AdminOTP.create({
        email,
        otp: newOTP,
        backupCodes: formattedBackupCodes,
        attempts: 0,
      });

      // Send OTP email
      const emailSent = await sendOTPEmail(email, newOTP);

      if (!emailSent) {
        return NextResponse.json({
          success: false,
          error: "Failed to send OTP email. Please try again.",
        });
      }

      return NextResponse.json({
        success: true,
        message: "OTP sent to your email",
        step: 2,
        requiresOTP: true,
        backupCodesGenerated: true,
      });
    }

    // STEP 2: Verify OTP
    if (step === 2) {
      if (!email || !otp) {
        return NextResponse.json({
          success: false,
          error: "Email and OTP are required",
        });
      }

      // Connect to MongoDB
      if (mongoose.connection.readyState === 0) {
        await mongoose.connect(process.env.MONGODB_URI);
      }

      // Find OTP record
      const otpRecord = await AdminOTP.findOne({ email });

      if (!otpRecord) {
        return NextResponse.json({
          success: false,
          error: "OTP expired or invalid. Please login again.",
        });
      }

      // Check attempts
      if (otpRecord.attempts >= otpRecord.maxAttempts) {
        await AdminOTP.deleteOne({ email });
        return NextResponse.json({
          success: false,
          error: "Maximum OTP attempts exceeded. Please login again.",
        });
      }

      // Verify OTP
      if (otpRecord.otp !== otp) {
        otpRecord.attempts += 1;
        await otpRecord.save();

        const attemptsLeft = otpRecord.maxAttempts - otpRecord.attempts;
        return NextResponse.json({
          success: false,
          error: `Invalid OTP. ${attemptsLeft} attempts remaining.`,
        });
      }

      // OTP verified
      otpRecord.isVerified = true;
      await otpRecord.save();

      // Set cookie for authentication
      const res = NextResponse.json({
        success: true,
        message: "Login successful",
        step: 3,
      });

      res.cookies.set("admin", "true", {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 24,
      });

      return res;
    }

    // STEP 3: Verify with Backup Code (if OTP is lost)
    if (step === "backup") {
      if (!email || !backupCode) {
        return NextResponse.json({
          success: false,
          error: "Email and backup code are required",
        });
      }

      // Connect to MongoDB
      if (mongoose.connection.readyState === 0) {
        await mongoose.connect(process.env.MONGODB_URI);
      }

      // Find OTP record
      const otpRecord = await AdminOTP.findOne({ email });

      if (!otpRecord) {
        return NextResponse.json({
          success: false,
          error: "No backup codes found. Please login again.",
        });
      }

      // Find and verify backup code
      const backupCodeObj = otpRecord.backupCodes.find(
        (bc) => bc.code === backupCode.replace(/[-\s]/g, "").toUpperCase() && !bc.used
      );

      if (!backupCodeObj) {
        return NextResponse.json({
          success: false,
          error: "Invalid or already used backup code",
        });
      }

      // Mark backup code as used
      backupCodeObj.used = true;
      await otpRecord.save();

      // Set authentication cookie
      const res = NextResponse.json({
        success: true,
        message: "Login successful with backup code",
      });

      res.cookies.set("admin", "true", {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 24,
      });

      return res;
    }

    return NextResponse.json({
      success: false,
      error: "Invalid request",
    });
  } catch (error) {
    console.error("❌ Login error:", error);
    return NextResponse.json({
      success: false,
      error: "Server error. Please try again.",
    });
  }
}