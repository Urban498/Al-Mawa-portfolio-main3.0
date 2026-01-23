"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MobileSidebar } from "@/components/mobile-sidebar";
import { LanguageSwitcher } from "@/components/language-switcher";
import React, { useEffect } from "react";
import { cn } from "@/lib/utils";
import { useTranslations } from 'next-intl';
import { usePathname } from "next/navigation";

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
          // {
          //   name: "SEO & Digital Marketing Integration",
          //   href: "/services/web-development",
          // },
          {
            name: "Performance & Security Optimization",
            href: "/services/web-development",
          },
          {
            name: "Website Maintenance & Support",
            href: "/services/web-development",
          },
          // {
          //   name: "Emerging Web Technologies",
          //   href: "/services/web-development",
          // },
          // {
          //   name: "Benefits of Website Design & Development Services",
          //   href: "/services/web-development",
          // },
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
          // {
          //   name: "Emerging Technology Services",
          //   href: "/services/it-tech-services",
          // },
          // {
          //   name: "Benefits of IT & Tech Services",
          //   href: "/services/it-tech-services",
          // },
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
          // {
          //   name: "Benefits of Email, WhatsApp & SMS Marketing",
          //   href: "/services/email-whatsapp-sms-marketing",
          // },
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
          // {
          //   name: "Emerging Graphic Design Trends",
          //   href: "/services/branding-graphic-design",
          // },
          // {
          //   name: "Benefits of Branding & Graphic Design Services",
          //   href: "/services/branding-graphic-design",
          // },
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
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [menuState, setMenuState] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  const navLinkBaseClass =
    "relative inline-block text-black transition-colors duration-200 hover:text-[#0ea5e9] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-[#0ea5e9] after:transition-all after:duration-200 hover:after:w-full";

  const navLinkActiveClass = "text-[#0ea5e9] after:w-full";

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
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

  return (
    <header>
      <nav
        data-state={menuState && "active"}
        className={` fixed z-50 lg:z-[100] w-full px-5`}
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
                  src="/logoblack.svg"
                  alt="Logo"
                  width={100}
                  height={100}
                  priority
                  className="h-12 w-auto"
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
                <li>
                  <Link
                    href="/"
                    aria-current={pathname === "/" ? "page" : undefined}
                    className={cn(
                      navLinkBaseClass,
                      pathname === "/" && navLinkActiveClass
                    )}
                  >
                    <span>{t('home')}</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    aria-current={pathname === "/about" ? "page" : undefined}
                    className={cn(
                      navLinkBaseClass,
                      pathname === "/about" && navLinkActiveClass
                    )}
                  >
                    <span>{t('about')}</span>
                  </Link>
                </li>

                <li>
                  <Link
                    href="/our-work"
                    aria-current={pathname === "/our-work" ? "page" : undefined}
                    className={cn(
                      navLinkBaseClass,
                      pathname === "/our-work" && navLinkActiveClass
                    )}
                  >
                    <span>Our Work</span>
                  </Link>
                </li>

                {/* Simple Hover Dropdown */}
                {servicesData.map((service, index) => (
                  <li key={index} className="relative group">
                    <div
                      className={cn(
                        "relative inline-flex items-center gap-1 cursor-pointer",
                        navLinkBaseClass,
                        pathname?.startsWith("/services") && navLinkActiveClass,
                        "group-hover:after:w-full"
                      )}
                    >
                      <span className="flex gap-1">{t('services')} <ChevronDown className="w-3 h-3 my-auto transition-transform group-hover:rotate-180" /></span>
                      
                    </div>

                    {/* Dropdown Box */}
                    <div
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible 
                     group-hover:opacity-100 group-hover:visible z-[110] pointer-events-none group-hover:pointer-events-auto transition-opacity duration-200"
                    >
                      <div className="bg-white border border-white/20 shadow-2xl py-6 rounded-xl w-[80vw] max-w-6xl max-h-[80vh] overflow-y-auto scrollbar-hide">
                        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                          {service.items.map((item, itemIndex) => (
                            <div key={itemIndex} className="space-y-4">
                              <Link
                                href={item.href}
                                className="block text-lg font-semibold text-black  transition-colors duration-200 pb-2"
                              >
                                {item.name}
                              </Link>
                              <div className="space-y-2">
                                {item.subItems?.map((subItem, subIndex) => (
                                  <Link
                                    key={subIndex}
                                    href={subItem.href}
                                    className="block text-xs text-gray-700 hover:bg-[#0ea5e9]/15 rounded-xl pl-2 transition-colors duration-200 py-1.5 leading-relaxed"
                                  >
                                    {subItem.name}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}

                {/* Careers Link */}
                <li>
                  <Link
                    href="/careers"
                    aria-current={pathname === "/careers" ? "page" : undefined}
                    className={cn(
                      navLinkBaseClass,
                      pathname === "/careers" && navLinkActiveClass
                    )}
                  >
                    <span>{t('careers')}</span>
                  </Link>
                </li>

                {/* Testimonials Link with Dropdown */}
                <li className="relative group">
                  <div
                    className={cn(
                      "relative inline-flex items-center gap-1 cursor-pointer",
                      navLinkBaseClass,
                      (pathname === "/testimonials" || pathname === "/share-feedback") && navLinkActiveClass,
                      "group-hover:after:w-full"
                    )}
                  >
                    <span className="flex gap-1">{t('testimonials')} <ChevronDown className="w-3 h-3 my-auto transition-transform group-hover:rotate-180" /></span>
                  </div>

                  {/* Testimonials Dropdown */}
                  <div
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible 
                   group-hover:opacity-100 group-hover:visible z-[110] pointer-events-none group-hover:pointer-events-auto transition-opacity duration-200"
                  >
                    <div className="bg-white border border-white/20 shadow-2xl py-3 rounded-xl w-fit min-w-[200px]">
                      <Link
                        href="/testimonials"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#0ea5e9]/15 transition-colors duration-200"
                      >
                        Testimonials
                      </Link>
                      <Link
                        href="/share-feedback"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#0ea5e9]/15 transition-colors duration-200"
                      >
                        Director&apos;s Desk
                      </Link>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            {/* Mobile Sidebar */}
            <MobileSidebar
              isOpen={menuState}
              onClose={() => setMenuState(false)}
            />

            {/* Desktop Contact Button & Language Switcher */}
            <div className="hidden lg:flex items-center gap-2">
              <LanguageSwitcher />
              <Button
                asChild
                size="sm"
                className="animated-border-button no-animated-hover"
              >
                <Link href="/contact">
                  <span>{t('contact')}</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
