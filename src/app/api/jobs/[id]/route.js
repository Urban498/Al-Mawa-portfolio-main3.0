//route for individual job operations (DELETE by ID)

import {NextResponse} from "next/server"
import {connectDB} from "@/app/api/libs/db"
import JobsModel from "@/app/api/models/jobs_shema"

export async function DELETE(request, {params}){
    try {
        await connectDB()
        const {id} = await params
        const job = await JobsModel.findByIdAndDelete(id)
        
        if (!job) {
            return NextResponse.json({success:false, message:"Job not found"}, {status: 404})
        }
        
        return NextResponse.json({success:true, data:job, message:"Job deleted successfully"})
    } catch (error) {
        console.log(error)
        return NextResponse.json({success:false, message:"Failed to delete job"}, {status: 500})
    }
}

export async function GET(request, {params}){
    try {
        await connectDB()
        const {id} = await params
        const job = await JobsModel.findById(id)
        
        if (!job) {
            return NextResponse.json({success:false, message:"Job not found"}, {status: 404})
        }
        
        return NextResponse.json({success:true, data:job})
    } catch (error) {
        console.log(error)
        return NextResponse.json({success:false, message:"Failed to fetch job"}, {status: 500})
    }
}
