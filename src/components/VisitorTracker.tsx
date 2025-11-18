"use client";

import { useEffect } from "react";

export default function VisitorTracker() {
  useEffect(() => {
    const trackVisitor = async () => {
      try {
        // Check if visitor was already tracked in this session
        const sessionId = sessionStorage.getItem("visitorSessionId");
        
        if (sessionId) {
          console.log("ℹ️ Already tracked in this session:", sessionId);
          return;
        }

        // Development mode info
        if (process.env.NODE_ENV === "development") {
          console.log("🔧 Development mode - visitor tracking enabled");
        }

        console.log("🚀 Starting visitor tracking...");
        const response = await fetch("/api/get-location");
        
        if (!response.ok) {
          console.error("❌ HTTP Error:", response.status, response.statusText);
          
          // Try to get the error details from the response
          try {
            const errorData = await response.json();
            console.error("❌ Error details:", errorData);
          } catch {
            console.error("❌ Could not parse error response");
          }
          return;
        }
        
        const data = await response.json();

        console.log("📡 API Response:", data);

        if (data.success && data.visitor) {
          // Store session ID or IP to prevent duplicate tracking
          const trackingId = data.visitor.sessionId || data.visitor.ip;
          if (trackingId) {
            sessionStorage.setItem("visitorSessionId", trackingId);
          }
          console.log("✅ Visitor tracked successfully:", data.message, data.visitor);
        } else {
          console.error("⚠️ Tracking failed:", {
            success: data.success,
            error: data.error,
            message: data.message,
            details: data.details,
            detectedIP: data.detectedIP,
            hasVisitor: !!data.visitor,
            fullResponse: data
          });
        }
      } catch (error) {
        console.error("❌ Visitor tracking error:", error);
      }
    };

    // Track visitor after a short delay to not block page load
    const timer = setTimeout(trackVisitor, 1000);

    // Development mode: Add manual trigger
    if (process.env.NODE_ENV === "development") {
      // @ts-expect-error - Adding to window for debugging
      window.debugVisitorTracker = trackVisitor;
      console.log("🔧 Debug: Call window.debugVisitorTracker() to manually trigger tracking");
    }

    return () => clearTimeout(timer);
  }, []);

  // This component doesn't render anything
  return null;
}
