"use client";

export const dynamic = 'force-dynamic';

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/components/header";
import FooterSection from "@/components/footer";
import AOSProvider from "@/components/aos-provider";
import { IntlProvider } from "@/components/providers/intl-provider";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useState, useEffect, useRef } from "react";
import { Download, Mail, Phone } from "lucide-react";
import ToastProvider from "@/components/ToastProvider";
import { ThemeProvider } from "@/components/theme-provider";
import { usePathname } from "next/navigation";
import VisitorTracker from "@/components/VisitorTracker";
import { FaWhatsapp, FaLinkedin, FaInstagram, FaFacebook, FaXTwitter, FaShare, FaYoutube } from "react-icons/fa6";

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
  const isAdminRoute = pathname?.startsWith("/admin");

  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSocialOpen, setIsSocialOpen] = useState(false);
  const [isPhoneHovered, setIsPhoneHovered] = useState(false);
  const [isSocialHovered, setIsSocialHovered] = useState(false);
  const dragRef = useRef<HTMLDivElement | null>(null);

  const [dock, setDock] = useState<"left" | "right">("right");
  const [y, setY] = useState(200);
  const [dragging, setDragging] = useState(false);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Drag logic
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
        <title>
          Al Mawa International - Digital Agency Pune | Web Development Company
        </title>
        <meta
          name="description"
          content="Al Mawa International Pune - Leading digital agency offering web development, website design, digital marketing and IT consulting services in Pune Maharashtra"
        />
        <meta
          name="keywords"
          content="Al Mawa International, Al Mawa International Pune, Al Mawa, digital agency Pune, web development company Pune, website design services Pune"
        />
        <meta name="author" content="Al Mawa International" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.al-mawa.international" />

        {/* ✅ Circular Favicon - Multiple formats for better browser support */}
        <link rel="icon" href="/favicon-32x32.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.svg" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Additional favicon sizes for different devices */}
        <link rel="icon" type="image/svg+xml" sizes="32x32" href="/favicon-32x32.svg" />
        <link rel="icon" type="image/svg+xml" sizes="16x16" href="/favicon-32x32.svg" />

        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#ffffff" />
        <meta name="msapplication-TileColor" content="#ffffff" />

        {/* Open Graph Meta Tags */}
        <meta
          property="og:title"
          content="Al Mawa International - Digital Agency Pune"
        />
        <meta
          property="og:description"
          content="Leading digital agency in Pune offering web development, website design, and digital marketing services"
        />
        <meta property="og:url" content="https://www.al-mawa.international" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Al Mawa International" />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:image" content="https://www.al-mawa.international/apple-touch-icon.svg" />
        <meta property="og:image:width" content="180" />
        <meta property="og:image:height" content="180" />
        <meta property="og:image:type" content="image/svg+xml" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Al Mawa International - Digital Agency Pune"
        />
        <meta
          name="twitter:description"
          content="Leading digital agency in Pune offering web development and digital marketing services"
        />
        <meta name="twitter:image" content="https://www.al-mawa.international/apple-touch-icon.svg" />
        <meta name="twitter:image:alt" content="Al Mawa International Logo" />

        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Al Mawa International",
              alternateName: "Al Mawa",
              url: "https://www.al-mawa.international",
              logo: "https://www.al-mawa.international/logo.png",
              description:
                "Leading digital agency in Pune offering web development, website design, and digital marketing services",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Pune",
                addressRegion: "Maharashtra",
                addressCountry: "IN",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+919561179693",
                contactType: "customer service",
                email: "hr@al-mawa.international",
              },
              sameAs: ["https://wa.me/919561179693"],
              services: [
                "Web Development",
                "Website Design",
                "Digital Marketing",
                "Mobile App Development",
                "IT Consulting",
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-base-100 text-base-content`}
        suppressHydrationWarning
      >
        <ThemeProvider
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <IntlProvider>
            <AOSProvider>
              {!isAdminRoute && (
                <>
                  <header className="fixed top-0 z-50">
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
                    [dock]: "0px",
                    transform: `translateY(${y}px)`,
                    transition: dragging ? "none" : "all 0.3s ease",
                    zIndex: 9999,
                    touchAction: "none",
                  }}
                >
                  <div className="fixed right-4 top-20 flex flex-col gap-3">
                    {/* Phone Contact Button */}
                    <span
                      className={`transition-all duration-300 ease-in-out bg-black/55 backdrop-blur-sm text-white w-10 h-10 flex items-center gap-3 px-2 overflow-hidden cursor-pointer
                        ${dock === "right"
                          ? "rounded-tl-2xl rounded-bl-2xl"
                          : "rounded-tr-2xl rounded-br-2xl"
                        }
                        ${!isMobile && isPhoneHovered ? "w-44 h-16" : ""}
                        ${isMobile && isOpen ? "w-44 h-16" : ""}
                      `}
                      onClick={() => isMobile && setIsOpen(!isOpen)}
                      onMouseEnter={() => !isMobile && setIsPhoneHovered(true)}
                      onMouseLeave={() => !isMobile && setIsPhoneHovered(false)}
                    >
                      <Phone
                        className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${isOpen || isPhoneHovered ? "scale-110" : ""
                          }`}
                      />
                      {((isMobile && isOpen) || (!isMobile && isPhoneHovered)) && (
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

                    {/* Social Media Button */}
                    <span
                      className={`transition-all duration-300 ease-in-out bg-black/55 backdrop-blur-sm text-white w-10 h-10 flex items-center gap-3 px-2 overflow-hidden cursor-pointer
                        ${dock === "right"
                          ? "rounded-tl-2xl rounded-bl-2xl"
                          : "rounded-tr-2xl rounded-br-2xl"
                        }
                        ${!isMobile && isSocialHovered ? "w-56 h-16" : ""}
                        ${isMobile && isSocialOpen ? "w-72 h-16" : ""}
                      `}
                      onClick={() => isMobile && setIsSocialOpen(!isSocialOpen)}
                      onMouseEnter={() => !isMobile && setIsSocialHovered(true)}
                      onMouseLeave={() => !isMobile && setIsSocialHovered(false)}
                    >
                      <FaShare
                        className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${isSocialOpen || isSocialHovered ? "scale-110" : ""
                          }`}
                      />
                      {((isMobile && isSocialOpen) || (!isMobile && isSocialHovered)) && (
                        <div className="flex items-center gap-4">
                          <a
                            href="https://www.linkedin.com/in/al-m-international-private-limited-083948381"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FaLinkedin className="w-5 h-5 text-blue-500 hover:scale-110 transition" />
                          </a>
                          <a
                            href="https://www.instagram.com/al_mawainternational/?igsh=MXJkbWt3b3NvOTBmaw%3D%3D#"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FaInstagram className="w-5 h-5 text-pink-500 hover:scale-110 transition" />
                          </a>
                          <a
                            href="https://www.facebook.com/yourpage"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FaFacebook className="w-5 h-5 text-blue-400 hover:scale-110 transition" />
                          </a>
                          <a
                            href="https://x.com/al_mawa__"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FaXTwitter className="w-5 h-5 text-white hover:scale-110 transition" />
                          </a>
                          <a
                            href="https://www.youtube.com/@Al-MawaInternational-k3"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FaYoutube className="w-5 h-5 text-red-500 hover:scale-110 transition" />
                          </a>
                        </div>
                      )}
                    </span>
                  </div>
                </div>
              )}

              {!isAdminRoute && <VisitorTracker />}

              {!isAdminRoute && (
                <div className="fixed bottom-6 right-6 z-[9999]">
                  <div className="relative">
                    {/* Ripple rings */}
                    {[0, 0.8, 1.6].map((delay, i) => (
                      <span
                        key={i}
                        className="absolute inset-0 rounded-full border-2 border-sky-400/50 animate-ping"
                        style={{ animationDelay: `${delay}s`, animationDuration: "2.4s" }}
                      />
                    ))}

                    {/* PDF badge */}
                    <span className="absolute -top-1 -right-1 z-10 bg-amber-400 text-white text-[9px] font-semibold px-1.5 py-0.5 rounded-full leading-tight animate-pulse">
                      PDF
                    </span>

                    <a
                      href={encodeURI("/AL-MAWA INTERNATIONAL COMPANY  PROFILE.pdf")}
                      download
                      aria-label="Download company profile"
                      className="group relative flex w-14 h-14 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-sky-600 shadow-lg shadow-sky-500/40 transition-transform duration-200 hover:scale-110 active:scale-95"
                      style={{ animation: "pulse-glow 2.4s ease-in-out infinite" }}
                    >
                      {/* Bouncing download icon */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 text-white"
                        style={{ animation: "bounce-icon 2.4s ease-in-out infinite" }}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 3v13M7 11l5 5 5-5" />
                        <path d="M5 21h14" />
                      </svg>

                      {/* Auto-showing tooltip */}
                      <span
                        className="pointer-events-none absolute right-16 top-1/2 -translate-y-1/2 rounded-lg bg-slate-900 px-3 py-1.5 text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        style={{ animation: "tooltip-pop 2.4s ease-in-out infinite" }}
                      >
                        Download company profile
                        <span className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-slate-900" />
                      </span>
                    </a>
                  </div>

                  <style>{`
                    @keyframes pulse-glow {
                      0%, 100% { box-shadow: 0 4px 18px rgba(14,165,233,0.45), 0 0 0 0 rgba(14,165,233,0.35); }
                      50% { box-shadow: 0 4px 24px rgba(14,165,233,0.65), 0 0 0 12px rgba(14,165,233,0); }
                    }
                    @keyframes bounce-icon {
                      0%, 100% { transform: translateY(0); }
                      40% { transform: translateY(3px); }
                      60% { transform: translateY(1px); }
                    }
                    @keyframes tooltip-pop {
                      0%, 20% { opacity: 0; transform: translateY(-50%) translateX(4px); }
                      35%, 75% { opacity: 1; transform: translateY(-50%) translateX(0); }
                      90%, 100% { opacity: 0; transform: translateY(-50%) translateX(4px); }
                    }
                  `}</style>
                </div>
              )}

              <div className={isAdminRoute ? "" : "pt-10"}>{children}</div>
              {!isAdminRoute && (
                <>
                  <FooterSection />
                  <LanguageSwitcher variant="fixed" />
                </>
              )}
              <ToastProvider />
            </AOSProvider>
          </IntlProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}