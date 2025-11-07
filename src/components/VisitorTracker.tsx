"use client";

import { useEffect } from "react";

export default function VisitorTracker() {
  useEffect(() => {
    const trackVisitor = async () => {
      try {
        // Check if visitor was already tracked in this session
        const sessionId = sessionStorage.getItem("visitorSessionId");
        
        if (sessionId) {
          console.log("ℹ️ Already tracked in this session");
          return;
        }

        console.log("🚀 Starting visitor tracking...");
        const response = await fetch("/api/get-location");
        const data = await response.json();

        console.log("📡 API Response:", data);

        if (data.success && data.visitor?.sessionId) {
          // Store session ID to prevent duplicate tracking
          sessionStorage.setItem("visitorSessionId", data.visitor.sessionId);
          console.log("✅ Visitor tracked successfully:", data.visitor);
        } else {
          console.error("⚠️ Tracking failed:", data);
        }
      } catch (error) {
        console.error("❌ Visitor tracking error:", error);
      }
    };

    // Track visitor after a short delay to not block page load
    const timer = setTimeout(trackVisitor, 1000);

    return () => clearTimeout(timer);
  }, []);

  // This component doesn't render anything
  return null;
}
