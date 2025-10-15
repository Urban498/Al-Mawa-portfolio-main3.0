"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MobileSidebar } from "@/components/mobile-sidebar";
import React, { useEffect } from "react";
import { cn } from "@/lib/utils";

const menuItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
];

const servicesData = [
  {
    name: "Our Services",
    items: [
      {
        name: "Web Development",
        href: "/services/web-development",
        subItems: [
          {
            name: "Website Designing & Development Services",
            href: "/services/web-development",
          },
          {
            name: "Website Design Services",
            href: "/services/web-development",
          },
          {
            name: "Website Development Services",
            href: "/services/web-development",
          },
          { name: "E-commerce Development", href: "/services/web-development" },
          {
            name: "Web Hosting & Domain Services",
            href: "/services/web-development",
          },
          {
            name: "SEO & Digital Marketing Integration",
            href: "/services/web-development",
          },
          {
            name: "Performance & Security Optimization",
            href: "/services/web-development",
          },
          {
            name: "Website Maintenance & Support",
            href: "/services/web-development",
          },
          {
            name: "Emerging Web Technologies",
            href: "/services/web-development",
          },
          {
            name: "Benefits of Website Design & Development Services",
            href: "/services/web-development",
          },
        ],
      },
      {
        name: "IT & Tech Services",
        href: "/services/it-tech-services",
        subItems: [
          {
            name: "IT & Tech Services - Complete Details",
            href: "/services/it-tech-services",
          },
          {
            name: "Infrastructure Services",
            href: "/services/it-tech-services",
          },
          { name: "Managed IT Services", href: "/services/it-tech-services" },
          {
            name: "Cybersecurity Services",
            href: "/services/it-tech-services",
          },
          {
            name: "Cloud & DevOps Services",
            href: "/services/it-tech-services",
          },
          {
            name: "Software Development Services",
            href: "/services/it-tech-services",
          },
          {
            name: "IT Consulting & Advisory",
            href: "/services/it-tech-services",
          },
          {
            name: "Data & Analytics Services",
            href: "/services/it-tech-services",
          },
          {
            name: "Communication & Collaboration Services",
            href: "/services/it-tech-services",
          },
          {
            name: "IT Support & Helpdesk Services",
            href: "/services/it-tech-services",
          },
          {
            name: "Emerging Technology Services",
            href: "/services/it-tech-services",
          },
          {
            name: "Benefits of IT & Tech Services",
            href: "/services/it-tech-services",
          },
        ],
      },
      {
        name: "Digital Marketing",
        href: "/services/email-whatsapp-sms-marketing",
        subItems: [
          {
            name: "Email Marketing Services",
            href: "/services/email-whatsapp-sms-marketing",
          },
          {
            name: "WhatsApp Marketing Services",
            href: "/services/email-whatsapp-sms-marketing",
          },
          {
            name: "SMS Marketing Services",
            href: "/services/email-whatsapp-sms-marketing",
          },
          {
            name: "Omnichannel Integration",
            href: "/services/email-whatsapp-sms-marketing",
          },
          {
            name: "Benefits of Email, WhatsApp & SMS Marketing",
            href: "/services/email-whatsapp-sms-marketing",
          },
        ],
      },
      {
        name: "Graphic Design",
        href: "/services/branding-graphic-design",
        subItems: [
          {
            name: "Brand Identity Design",
            href: "/services/branding-graphic-design",
          },
          {
            name: "Marketing & Promotional Design",
            href: "/services/branding-graphic-design",
          },
          {
            name: "Digital & Social Media Design",
            href: "/services/branding-graphic-design",
          },
          {
            name: "UI/UX & Web Graphics",
            href: "/services/branding-graphic-design",
          },
          {
            name: "Corporate & Office Branding",
            href: "/services/branding-graphic-design",
          },
          {
            name: "Motion Graphics & Multimedia Design",
            href: "/services/branding-graphic-design",
          },
          {
            name: "Illustration & Creative Art",
            href: "/services/branding-graphic-design",
          },
          {
            name: "Print & Publishing Design",
            href: "/services/branding-graphic-design",
          },
          {
            name: "Packaging & Product Branding",
            href: "/services/branding-graphic-design",
          },
          {
            name: "Emerging Graphic Design Trends",
            href: "/services/branding-graphic-design",
          },
          {
            name: "Benefits of Branding & Graphic Design Services",
            href: "/services/branding-graphic-design",
          },
        ],
      },
      {
        name: "AI Services",
        href: "/services/consulting",
        subItems: [
          {
            name: "Machine Learning (ML) Services",
            href: "/services/consulting",
          },
          {
            name: "Natural Language Processing (NLP) Services",
            href: "/services/consulting",
          },
          { name: "Computer Vision Services", href: "/services/consulting" },
          { name: "Generative AI Services", href: "/services/consulting" },
          { name: "AI Automation Services", href: "/services/consulting" },
          {
            name: "Data & Analytics AI Services",
            href: "/services/consulting",
          },
          { name: "AI in Cybersecurity", href: "/services/consulting" },
          {
            name: "Industry-Specific AI Solutions",
            href: "/services/consulting",
          },
          { name: "AI Infrastructure & MLOps", href: "/services/consulting" },
          { name: "AI Training & Support", href: "/services/consulting" },
        ],
      },
    ],
  },
];

export const NavBar = () => {
  const [menuState, setMenuState] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [openDropdown, setOpenDropdown] = React.useState<number | null>(null);

  // ✅ AOS Initialization (Dynamic import to avoid SSR issues)
  useEffect(() => {
    const initAOS = async () => {
      const AOS = (await import("aos")).default;
      AOS.init({
        duration: 600,
        easing: "ease-out-cubic",
        once: false,
      });
    };
    initAOS();
  }, []);

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    // Use passive listener for better performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuState) {
        setMenuState(false);
      }
    };

    if (menuState) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [menuState]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setOpenDropdown(null);
    };

    if (openDropdown !== null) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [openDropdown]);


  return (
    <header>
      <nav
        data-state={menuState && "active"}
        className={` fixed z-50 w-full px-5`}
      >
        <div
          className={cn(
            "mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12",
            isScrolled &&
              !menuState &&
              "bg-background/80 max-w-5xl rounded-2xl border backdrop-blur-lg lg:px-6 mt-4 shadow-lg"
          )}
        >
          <div
            className={`${
              !isScrolled && "border-b border-black/20"
            } relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4`}
          >
            {/* Left Logo */}
            <div className="flex w-full justify-between lg:w-auto">
              <Link
                href="/"
                aria-label="home"
                className="flex items-center space-x-2"
              >
                <Image
                  src="/logoblack.png"
                  alt="Logo"
                  width={100}
                  height={100}
                  className="h-10 w-auto"
                />
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState ? "Close Menu" : "Open Menu"}
                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
              >
                <Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
              </button>
            </div>

            {/* Desktop Menu */}
            <div className="absolute inset-0 m-auto hidden size-fit lg:block">
              <ul className="flex gap-8 text-sm items-center">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className="text-black hover:text-black block duration-150"
                    >
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}

                {/* Dropdown Menus */}
                {servicesData.map((service, index) => (
                  <li
                    key={`service-${index}`}
                    className="relative"
                    onMouseEnter={async () => {
                      setOpenDropdown(index);
                      // ✅ Refresh AOS on hover (dynamic import)
                      const AOS = (await import("aos")).default;
                      AOS.refresh();
                    }}
                    onMouseLeave={(e) => {
                      // Only close if we're not moving to the dropdown
                      const rect = e.currentTarget.getBoundingClientRect();
                      if (e.clientY > rect.bottom + 24) {
                        setOpenDropdown(null);
                      }
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center gap-1 duration-150 cursor-pointer">
                      <span>{service.name}</span>
                      <ChevronDown className={cn(
                        "w-3 h-3 transition-transform",
                        openDropdown === index && "rotate-180"
                      )} />
                    </div>
                    <div 
                      className={cn(
                        "absolute top-full left-2 overflow-y-scroll transform -translate-x-1/2 pt-6 transition-all duration-300 z-[110] w-screen",
                        openDropdown === index ? "opacity-100 visible" : "opacity-0 invisible"
                      )}
                      onMouseEnter={() => setOpenDropdown(index)}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                            <div 
                              className="bg-gray-50 border border-gray-300 shadow-[inset_0_0_0.5px_rgba(255,255,255,0.3)] py-8 transition-all duration-500 transform origin-top w-full min-h-[80vh] h-auto rounded-3xl"
                            >
                              <div className="max-w-7xl mx-auto px-2 lg:px-4">
                                <div className="flex justify-center gap-12 flex-wrap">
                                  {service.items.map((item, itemIndex) => (
                                    <div
                                      key={itemIndex}
                                      className="space-y-4 min-w-[180px] max-w-[220px] flex-1"
                                    >
                                <Link
                                  href={item.href}
                                  className="block text-xl font-bold text-black hover:text-gray-800 transition-colors duration-200 border-b-2 border-black/20 pb-2"
                                >
                                  {item.name}
                                </Link>
                                <div className="space-y-2">
                                  {item.subItems?.map((subItem, subIndex) => (
                                    <div
                                      key={subIndex}
                                      className="flex items-center justify-between group/item hover:bg-[#0ea5e9]/30 rounded px-2 py-1 transition-all duration-200"
                                    >
                                      <Link
                                        href={subItem.href}
                                        className="flex-1 text-sm text-black/80 hover:text-black transition-all duration-200 hover:transform hover:translate-x-1"
                                      >
                                        {subItem.name}
                                      </Link>
                                    </div>
                                  ))}
                                </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                    </div>
                  </li>
                ))}

                {/* Careers Link */}
                <li>
                  <Link
                    href="/careers"
                    className="text-black hover:text-black block duration-150"
                  >
                    <span>Careers</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Mobile Sidebar */}
            <MobileSidebar
              isOpen={menuState}
              onClose={() => setMenuState(false)}
            />

            {/* Desktop Contact Butto */}
            <div className="hidden lg:flex">
              <Button asChild size="sm" className="animated-border-button">
                <Link href="/contact" className="hover:text-white">
                  <span>Contact US</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};