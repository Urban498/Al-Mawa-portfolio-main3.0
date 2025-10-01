"use client";

import { useEffect } from "react";

export default function AOSProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Dynamic import to avoid SSR issues
    const initAOS = async () => {
      const AOS = (await import("aos")).default;
      
      AOS.init({
        duration: 800,
        easing: "ease-in-out",
        once: true,
        offset: 100,
        delay: 0,
      });

      // Refresh AOS when component mounts to ensure all elements are detected
      AOS.refresh();
    };

    initAOS();
  }, []);

  return <>{children}</>;
}
