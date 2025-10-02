//cards
import CardsModel from "@/app/api/models/cards_schema";
import {connectDB} from "@/app/api/libs/db";

export async function POST(request){
    try {
        await connectDB()
        const body = await request.json()
        const card = new CardsModel(body)
        await card.save()
        return Response.json({success: true,message: "Card added successfully"})
    } catch (error) {
        console.log(error);
        return Response.json({success: false,message: "Failed to add card"})
    }
}
export async function GET(){
    try {
        await connectDB()
        const cards = await CardsModel.find()
        return Response.json({success: true,data: cards})

    } catch (error) {
        console.log(error);
        return Response.json({success: false,message: "Failed to fetch cards"})
    }
}

export async function PUT(request,{params}){
    try {
        await connectDB()
        const body = await request.json()
        const {id} = await params
        const card = await CardsModel.findByIdAndUpdate(id,body,{new:true})
        return Response.json({success:true,data:card})
    } catch (error) {
        console.log(error);
        return Response.json({success:false,message:"Failed to update card"})
    }
}
export async function DELETE(request,{params}){
    try {
        await connectDB()
        const {id} = await params
        const card = await CardsModel.findByIdAndDelete(id)
        return Response.json({success:true,data:card})
    } catch (error) {
        console.log(error);
        return Response.json({success:false,message:"Failed to delete card"})
    }
}
