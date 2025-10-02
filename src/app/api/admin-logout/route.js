import { NextResponse } from "next/server";

export async function POST(req){
    try {
        const res = NextResponse.json({success : true , message : "Logout successfully"})
        res.cookies.set("admin", "false", {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 0,
            expires : new Date(0)
          });
        return res;
    } catch (error) {
        console.log(error);
        return NextResponse.json({success : false , error : "Server error..."})
    }
}