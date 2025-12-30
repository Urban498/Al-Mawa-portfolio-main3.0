//route for jobs POST , GET and DELETE

import {NextResponse} from "next/server"
import {connectDB} from "@/app/api/libs/db"
import { OptModel } from "../models/opt-schema"

export async function POST(request){
    try {
        await connectDB()
        const body = await request.json()
        const job = new OptModel(body)
        await job.save()
        return NextResponse.json({success:true,message:"Submitted successfully"})
    } catch (error) {
        console.log(error)
        return NextResponse.json({success:false,message:"Failed to add"})
    }
}

