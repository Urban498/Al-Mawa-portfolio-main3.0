"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/components/header";
import FooterSection from "@/components/footer";
import AOSProvider from "@/components/aos-provider";
import { useState, useEffect, useRef } from "react";
import { MessageSquare, Mail, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import ToastProvider from "@/components/ToastProvider";
import { ThemeProvider } from "@/components/theme-provider";
import { usePathname } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');
  
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const dragRef = useRef<HTMLDivElement | null>(null);

  // initial docked state
  const [dock, setDock] = useState<"left" | "right">("right");
  const [y, setY] = useState(200); // vertical pos
  const [dragging, setDragging] = useState(false);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Drag Logic (vertical only)
  useEffect(() => {
    const dragEl = dragRef.current;
    if (!dragEl) return;

    let offsetY = 0;

    const onMouseDown = (e: MouseEvent | TouchEvent) => {
      setDragging(true);
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      offsetY = clientY - y;
    };

    const onMouseMove = (e: MouseEvent | TouchEvent) => {
      if (!dragging) return;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      setY(Math.max(60, Math.min(window.innerHeight - 100, clientY - offsetY)));
    };

    const onMouseUp = (e: MouseEvent | TouchEvent) => {
      if (!dragging) return;
      setDragging(false);

      // Snap to nearest edge
      const clientX =
        "touches" in e
          ? e.changedTouches[0].clientX
          : (e as MouseEvent).clientX;
      const middle = window.innerWidth / 2;
      setDock(clientX < middle ? "left" : "right");
    };

    dragEl.addEventListener("mousedown", onMouseDown);
    dragEl.addEventListener("touchstart", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("touchend", onMouseUp);

    return () => {
      dragEl.removeEventListener("mousedown", onMouseDown);
      dragEl.removeEventListener("touchstart", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchend", onMouseUp);
    };
  }, [y, dragging]);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Al Mawa International - Digital Agency Pune | Web Development Company</title>
        <meta name="description" content="Al Mawa International Pune - Leading digital agency offering web development, website design, digital marketing and IT consulting services in Pune Maharashtra" />
        <meta name="keywords" content="Al Mawa International, Al Mawa International Pune, Al Mawa, digital agency Pune, web development company Pune, website design services Pune" />
        <meta name="author" content="Al Mawa International" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.al-mawa.international" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Al Mawa International - Digital Agency Pune" />
        <meta property="og:description" content="Leading digital agency in Pune offering web development, website design, and digital marketing services" />
        <meta property="og:url" content="https://www.al-mawa.international" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Al Mawa International" />
        <meta property="og:locale" content="en_IN" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Al Mawa International - Digital Agency Pune" />
        <meta name="twitter:description" content="Leading digital agency in Pune offering web development and digital marketing services" />
        
        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Al Mawa International",
              "alternateName": "Al Mawa",
              "url": "https://www.al-mawa.international",
              "logo": "https://www.al-mawa.international/logo.png",
              "description": "Leading digital agency in Pune offering web development, website design, and digital marketing services",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Pune",
                "addressRegion": "Maharashtra",
                "addressCountry": "IN"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+919561179693",
                "contactType": "customer service",
                "email": "hr@al-mawa.international"
              },
              "sameAs": [
                "https://wa.me/919561179693"
              ],
              "services": [
                "Web Development",
                "Website Design",
                "Digital Marketing",
                "Mobile App Development",
                "IT Consulting"
              ]
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-base-100 text-base-content`}
      >
        <ThemeProvider
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <AOSProvider>
          {!isAdminRoute && (
            <>
              {/* Banner */}
              <div className="fixed top-0 left-0 right-0 z-[100] bg-orange-500 text-white text-center py-2 px-4 shadow-lg construction-banner">
                <div className="flex items-center justify-center gap-2 text-sm font-medium">
                  <span className="animate-pulse">🚧</span>
                  <span className="hidden sm:inline">
                   this website is under Maintenance some features may not work as expected
                  </span>
                  <span className="sm:hidden">Website is under Maintenance.</span>
                  <span className="animate-pulse">🚧</span>
                </div>
              </div>

              <header className="fixed top-10 z-50">
                <NavBar />
              </header>
            </>
          )}

          {!isAdminRoute && (
            <div
              ref={dragRef}
              style={{
                position: "fixed",
                top: 0,
                [dock]: "0px", // only left or right
                transform: `translateY(${y}px)`,
                transition: dragging ? "none" : "all 0.3s ease", // smooth snap
                zIndex: 9999,
                touchAction: "none",
              }}
            >
              <span
                className={`transition-all duration-300 ease-in-out bg-black/55 backdrop-blur-sm text-white w-10 h-10 flex items-center gap-3 px-2 overflow-hidden cursor-pointer
                  ${
                    dock === "right"
                      ? "rounded-tl-2xl rounded-bl-2xl"
                      : "rounded-tr-2xl rounded-br-2xl"
                  }
                  ${!isMobile ? "hover:w-44 hover:h-16" : ""}
                  ${isMobile && isOpen ? "w-44 h-16" : ""}
                `}
                onClick={() => isMobile && setIsOpen(!isOpen)}
              >
                <MessageSquare
                  className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${
                    isOpen ? "scale-110" : ""
                  }`}
                />
                {(isOpen || !isMobile) && (
                  <div className="flex items-center gap-4">
                    <a
                      href="https://wa.me/919561179693"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaWhatsapp className="w-5 h-5 text-green-400 hover:scale-110 transition" />
                    </a>
                    <a href="mailto:hr@al-mawa.international">
                      <Mail className="w-5 h-5 text-blue-400 hover:scale-110 transition" />
                    </a>
                    <a href="tel:+919561179693">
                      <Phone className="w-5 h-5 text-yellow-400 hover:scale-110 transition" />
                    </a>
                  </div>
                )}
              </span>
            </div>
          )}

          <div className={isAdminRoute ? "" : "pt-10"}>{children}</div>
          {!isAdminRoute && <FooterSection />}
          <ToastProvider />
          </AOSProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
