import mongoose from "mongoose";

export const connectDB = async() => {
    try {
        if (!process.env.MONGODB_URI) {
            console.error(" MONGODB_URI not found in environment variables");
            throw new Error("MONGODB_URI is required");
        }
        
        // Check if already connected
        if (mongoose.connections[0].readyState) {
            console.log(" Already connected to MongoDB");
            return;
        }
        
        await mongoose.connect(process.env.MONGODB_URI);
        console.log(" MongoDB connection successful");
    } catch (error) {
        console.error(" MongoDB connection error:", error);
        throw error;
    }
}