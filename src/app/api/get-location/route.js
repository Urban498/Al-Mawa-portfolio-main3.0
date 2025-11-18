import axios from "axios";
import { connectDB } from "../libs/db";
import Visitor from "../models/Visitor";
import { v4 as uuidv4 } from "uuid";

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
    console.log("🚀 Starting visitor tracking process...");
    await connectDB();
    console.log("✅ Database connected successfully");

    // Get client IP (now async to fetch public IP if needed)
    const ip = await getClientIP(request);
    
    console.log("🔍 Detected IP:", ip);
    
    // Get user agent and referrer BEFORE they're used
    const userAgent = request.headers.get("user-agent") || "Unknown";
    const referrer = request.headers.get("referer") || request.headers.get("referrer") || "Direct";
    
    if (!ip || !isValidIP(ip)) {
      console.error("❌ Invalid IP detected:", ip);
      
      // In development, use a fallback IP to prevent errors
      if (process.env.NODE_ENV === "development") {
        console.log("🔧 Development mode: Using fallback IP");
        const fallbackIP = "127.0.0.1";
        
        // Create a minimal visitor record for development
        const visitor = await Visitor.create({
          ip: fallbackIP,
          city: "Development",
          region: "Local",
          country: "Development",
          countryCode: "DEV",
          userAgent,
          referrer,
          sessionId: uuidv4(),
        });

        return Response.json({
          success: true,
          message: "Development mode visitor tracked",
          visitor: {
            ip: visitor.ip,
            city: visitor.city,
            country: visitor.country,
            sessionId: visitor.sessionId,
          },
        });
      }
      
      return Response.json({
        success: false,
        error: "Unable to determine valid IP address",
        message: "Your IP address could not be detected. This might be due to network configuration.",
        detectedIP: ip,
      }, { status: 400 });
    }
    
    console.log("✅ Valid IP confirmed:", ip);

    // Check if visitor already exists (within last 24 hours)
    console.log("🔍 Checking for existing visitor with IP:", ip);
    const existingVisitor = await Visitor.findOne({
      ip,
      createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }
    }).sort({ createdAt: -1 });

    if (existingVisitor) {
      console.log("👤 Found existing visitor, updating visit count");
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
          sessionId: existingVisitor.sessionId,
        },
      });
    }

    console.log("👤 No existing visitor found, creating new record");

    // Fetch location data from ip-api.com (more accurate and reliable)
    let locationData;
    try {
      const { data } = await axios.get(`http://ip-api.com/json/${ip}?fields=status,message,country,countryCode,region,regionName,city,lat,lon,timezone,isp,query`, {
        timeout: 5000, // 5 second timeout
      });
      
      console.log("🌍 Geolocation API Response:", data);
      
      // Check if API returned error
      if (data.status === "fail") {
        throw new Error(data.message || "IP geolocation service error");
      }
      
      locationData = data;
    } catch (apiError) {
      console.error("IP Geolocation API Error:", apiError.message);
      
      // Fallback: Try ipapi.co as backup
      try {
        console.log("🔄 Trying backup API (ipapi.co)...");
        const { data: backupData } = await axios.get(`https://ipapi.co/${ip}/json/`, {
          timeout: 5000,
        });
        
        if (!backupData.error) {
          locationData = {
            status: "success",
            country: backupData.country_name,
            countryCode: backupData.country_code,
            regionName: backupData.region,
            city: backupData.city,
            lat: backupData.latitude,
            lon: backupData.longitude,
            timezone: backupData.timezone,
            query: ip,
          };
          console.log("✅ Backup API succeeded:", locationData);
        } else {
          throw new Error("Backup API also failed");
        }
      } catch (backupError) {
        console.error("❌ Both APIs failed:", backupError.message);
        
        // Save visitor with minimal data if both APIs fail
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
    }

    // Save complete visitor info to DB
    console.log("💾 Creating new visitor record in database");
    const visitorData = {
      ip,
      city: locationData.city || "Unknown",
      region: locationData.regionName || locationData.region || "Unknown",
      country: locationData.country || "Unknown",
      countryCode: locationData.countryCode || "Unknown",
      latitude: locationData.lat || locationData.latitude || null,
      longitude: locationData.lon || locationData.longitude || null,
      timezone: locationData.timezone || "Unknown",
      userAgent,
      referrer,
      sessionId: uuidv4(),
    };
    
    console.log("📝 Visitor data to save:", visitorData);
    const visitor = await Visitor.create(visitorData);
    console.log("✅ Visitor record created successfully:", visitor._id);

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
