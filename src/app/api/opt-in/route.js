//route for jobs POST , GET and DELETE

import {NextResponse} from "next/server"
import {connectDB} from "@/app/api/libs/db"
import { OptModel } from "../models/opt-schema"

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

