import { NextResponse } from "next/server";

export async function POST(req){
    try {
        const body = await req.json();
        const {email , password} = body;
        if(!email || !password){
            return NextResponse.json({success : false , error:"Email and password not wrong"});
        } 
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;
        if(email === adminEmail || password === adminPassword){
            return NextResponse.json({success : true , message:"Login successfully"});
        }
    } catch (error) {
        return NextResponse.json({success : false, error:"Server error..."});
    }
}