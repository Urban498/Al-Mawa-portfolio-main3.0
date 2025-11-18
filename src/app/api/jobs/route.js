//route for jobs POST , GET and DELETE

import {NextResponse} from "next/server"
import {connectDB} from "@/app/api/libs/db"
import JobsModel from "@/app/api/models/jobs_shema"

export async function POST(request){
    try {
        await connectDB()
        const body = await request.json()
        const job = new JobsModel(body)
        await job.save()
        return NextResponse.json({success:true,message:"Job added successfully"})
    } catch (error) {
        console.log(error)
        return NextResponse.json({success:false,message:"Failed to add job"})
    }
}

export async function GET(){
    try {
        await connectDB()
        const jobs = await JobsModel.find()
        
        // Debug: Log what we're getting from database
        console.log("📋 Database jobs count:", jobs.length)
        jobs.forEach((job, index) => {
            console.log(`Job ${index + 1} from DB:`, {
                id: job._id,
                title: job.jobTitle,
                salary: job.jobSalary,
                hasSalary: job.jobSalary !== undefined,
                salaryType: typeof job.jobSalary,
                allFields: Object.keys(job.toObject())
            })
        })
        
        // Ensure all jobs have salary field (migration-like fix)
        const jobsWithSalary = jobs.map(job => {
            const jobObj = job.toObject()
            if (!jobObj.hasOwnProperty('jobSalary')) {
                jobObj.jobSalary = null
                console.log(`🔧 Added missing jobSalary field to: ${job.jobTitle}`)
            }
            return jobObj
        })
        
        return NextResponse.json({success:true,data:jobsWithSalary})
    } catch (error) {
        console.log(error)
        return NextResponse.json({success:false,message:"Failed to fetch jobs"})
    }
}

export async function DELETE(request,{params}){
    try {
        await connectDB()
        const {id} = await params
        const job = await JobsModel.findByIdAndDelete(id)
        return NextResponse.json({success:true,data:job})
    } catch (error) {
        console.log(error)
        return NextResponse.json({success:false,message:"Failed to delete job"})
    }
}

