//route for jobs POST , GET and DELETE

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { connectDB } from "@/app/api/libs/db";
import { OptModel } from "../models/opt-schema";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || "465"),
  secure: String(process.env.EMAIL_USE_SSL).toLowerCase() === "true",
  auth: {
    user: process.env.EMAIL_HOST_USER,
    pass: process.env.EMAIL_HOST_PASSWORD,
  },
});

async function sendLeadNotification(leadData) {
  const toEmail = process.env.DIRECTOR_EMAIL || "business@al-mawa.international";

  await transporter.sendMail({
    from: process.env.EMAIL_HOST_USER,
    to: toEmail,
    subject: `New Lead Submission - ${leadData.company}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f8fafc; border-radius: 12px;">
        <h2 style="color: #0f172a; margin-bottom: 20px;">New Lead Form Submission</h2>
        <p><strong>Name:</strong> ${leadData.name || "N/A"}</p>
        <p><strong>Phone:</strong> ${leadData.number || "N/A"}</p>
        <p><strong>Company:</strong> ${leadData.company || "N/A"}</p>
        <p><strong>Has website:</strong> ${leadData.hasWebsite || "N/A"}</p>
        <p><strong>Location:</strong> ${leadData.location || "N/A"}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap; background: #ffffff; padding: 12px; border-radius: 8px; border: 1px solid #e2e8f0;">${leadData.message || "N/A"}</p>
        <p style="margin-top: 20px; color: #475569; font-size: 12px;">Submitted on: ${new Date().toLocaleString()}</p>
      </div>
    `,
  });
}

export async function POST(request) {
    try {
        await connectDB();
        const body = await request.json();

        const { name, number, company, hasWebsite, location, message } = body;

        if (!name || !number || !company || !hasWebsite || !location || !message) {
            return NextResponse.json({
                success: false,
                message: "All required fields are required"
            }, { status: 400 });
        }

        const lead = new OptModel({
            name,
            number,
            company,
            hasWebsite,
            location,
            message,
        });

        await lead.save();
        await sendLeadNotification({ name, number, company, hasWebsite, location, message });

        return NextResponse.json({
            success: true,
            message: "Submitted successfully"
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "Failed to add"
        }, { status: 500 });
    }
}

