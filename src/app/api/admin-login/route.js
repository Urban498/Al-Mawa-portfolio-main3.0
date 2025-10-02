import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req){
    try {
        const body = await req.json();
        const {email , password} = body;
        if(!email || !password){
            return NextResponse.json({success : false , error:"all fields are required"});
        } 
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = "$2b$10$lbQI5oOEHF7LNFNsXw9tG.r.eNQjIn9m8ibrDYWjRc9FwmsVOnrxq";
        if(email !== adminEmail ){
            return NextResponse.json({success : false , error:"Email is wrong"});
        }
        const isMatch = await bcrypt.compare(password , adminPassword);
        if(!isMatch){
            return NextResponse.json({success :false , error:" password is wrong"})
        }
        const Res =  NextResponse.json({success :true,message:"Login successfully"})
        Res.cookies.set("admin", "true",{
            httpOnly : true,
            secure :true,
            sameSite : "strict",
            maxAge : 60 * 60 * 24 
        })
        return Res;

    } catch (error) {
        console.log(error);
        return NextResponse.json({success : false, error:"Server error..."});

    }
}