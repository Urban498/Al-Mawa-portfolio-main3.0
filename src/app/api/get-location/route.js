import { connectDB } from "../libs/db";
import Visitor from "../models/Visitor";
import { v4 as uuidv4 } from "uuid";
import { getLocationData } from "../libs/geo";

// Helper to check if IP is localhost
function isLocalhostIP(ip) {
  if (!ip) return true;
  return ip === "::1" || 
         ip === "127.0.0.1" || 
         ip.startsWith("::ffff:127.0.0.1") ||
         ip === "localhost";
}

// Helper function to get real IP address
async function getClientIP(request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIP = request.headers.get("x-real-ip");
  const cfConnectingIP = request.headers.get("cf-connecting-ip");
  
  // Check each header IP and skip if it's localhost
  if (cfConnectingIP && !isLocalhostIP(cfConnectingIP)) return cfConnectingIP;
  if (realIP && !isLocalhostIP(realIP)) return realIP;
  if (forwardedFor) {
    const ip = forwardedFor.split(",")[0].trim();
    if (!isLocalhostIP(ip)) return ip;
  }
  
  // If no valid IP from headers or it's localhost, get public IP
  console.log("🔄 No valid IP from headers, fetching public IP...");
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    const response = await fetch("https://api.ipify.org?format=json", {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    
    const data = await response.json();
    if (data.ip) {
      console.log("🌐 Using public IP from ipify:", data.ip);
      return data.ip;
    }
  } catch (error) {
    console.log("⚠️ Could not fetch public IP:", error.message);
  }
  
  return null;
}

// Helper function to validate IP
function isValidIP(ip) {
  if (!ip) return false;
  
  // IPv4 validation
  const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
  if (ipv4Regex.test(ip)) {
    const parts = ip.split(".");
    return parts.every(part => parseInt(part) >= 0 && parseInt(part) <= 255);
  }
  
  // IPv6 validation (basic)
  const ipv6Regex = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
  return ipv6Regex.test(ip);
}

export async function GET(request) {
  try {
    await connectDB();

    // Get client IP (now async to fetch public IP if needed)
    const ip = await getClientIP(request);
    
    console.log("🔍 Detected IP:", ip);
    
    if (!ip || !isValidIP(ip)) {
      console.error("❌ Invalid IP detected:", ip);
      return Response.json({
        success: false,
        error: "Unable to determine valid IP address",
        message: "Your IP address could not be detected. This might be due to network configuration.",
        detectedIP: ip,
      }, { status: 400 });
    }
    
    console.log("✅ Valid IP confirmed:", ip);

    // Get user agent and referrer
    const userAgent = request.headers.get("user-agent") || "Unknown";
    const referrer = request.headers.get("referer") || request.headers.get("referrer") || "Direct";

    // Check if visitor already exists (within last 24 hours)
    const existingVisitor = await Visitor.findOne({
      ip,
      createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }
    }).sort({ createdAt: -1 });

    if (existingVisitor) {
      // Update existing visitor
      await existingVisitor.incrementVisit();
      
      return Response.json({
        success: true,
        message: "Welcome back!",
        visitor: {
          ip: existingVisitor.ip,
          city: existingVisitor.city,
          country: existingVisitor.country,
          visitCount: existingVisitor.visitCount,
        },
      });
    }

    // Fetch location data using the improved geolocation service
    const locationData = await getLocationData(ip);
    
    if (!locationData) {
      // Save visitor with minimal data if geolocation fails
      const visitor = await Visitor.create({
        ip,
        city: "Unknown",
        region: "Unknown",
        country: "Unknown",
        countryCode: "Unknown",
        userAgent,
        referrer,
        sessionId: uuidv4(),
      });

      return Response.json({
        success: true,
        message: "Visitor tracked (location unavailable)",
        visitor: {
          ip: visitor.ip,
          sessionId: visitor.sessionId,
        },
      });
    }

    // Save complete visitor info to DB
    const visitor = await Visitor.create({
      ip,
      city: locationData.city,
      region: locationData.region,
      country: locationData.country,
      countryCode: locationData.countryCode,
      latitude: locationData.latitude,
      longitude: locationData.longitude,
      timezone: locationData.timezone,
      userAgent,
      referrer,
      sessionId: uuidv4(),
    });

    return Response.json({
      success: true,
      message: "Visitor tracked successfully",
      visitor: {
        ip: visitor.ip,
        city: visitor.city,
        region: visitor.region,
        country: visitor.country,
        timezone: visitor.timezone,
        sessionId: visitor.sessionId,
      },
    });
  } catch (error) {
    console.error("Get Location Error:", error);
    
    return Response.json({
      success: false,
      error: "Internal server error",
      message: "Failed to track visitor location",
      details: process.env.NODE_ENV === "development" ? error.message : undefined,
    }, { status: 500 });
  }
}
