"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useTranslations } from 'next-intl';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const servicesData = [
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
];

export const MobileSidebar: React.FC<MobileSidebarProps> = ({ isOpen, onClose }) => {
  const t = useTranslations('nav');
  const [expandedServices, setExpandedServices] = useState<number[]>([]);
  const [servicesMenuOpen, setServicesMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize component to prevent glitch
  useEffect(() => {
    setIsInitialized(true);
  }, []);

  // Prevent body scroll and horizontal overflow when sidebar is open
  useEffect(() => {
    if (isOpen || servicesMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflowX = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflowX = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflowX = 'unset';
    };
  }, [isOpen, servicesMenuOpen]);

  // Close services menu when main sidebar closes
  useEffect(() => {
    if (!isOpen && servicesMenuOpen) {
      setServicesMenuOpen(false);
    }
  }, [isOpen, servicesMenuOpen]);

  const toggleServiceExpansion = (index: number) => {
    setExpandedServices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleLinkClick = () => {
    onClose();
    setExpandedServices([]);
    setServicesMenuOpen(false);
  };

  const openServicesMenu = () => {
    setServicesMenuOpen(true);
  };

  const closeServicesMenu = () => {
    setServicesMenuOpen(false);
    setExpandedServices([]);
  };

  const handleServicesLinkClick = () => {
    onClose();
    setServicesMenuOpen(false);
    setExpandedServices([]);
  };

  return (
    <>
      {/* Background Overlay for Main Sidebar */}
      {isOpen && !servicesMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Background Overlay for Services Sidebar */}
      {servicesMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[55] lg:hidden"
          onClick={closeServicesMenu}
        />
      )}

      {/* Sidebar */}
      <div
        className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-50 lg:hidden"
        style={{ 
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: isInitialized ? 'transform 300ms ease-in-out' : 'none',
          willChange: 'transform',
          visibility: isOpen ? 'visible' : 'hidden',
          pointerEvents: isOpen ? 'auto' : 'none'
        }}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <Image
              src="/logoblack.svg"
              alt="Al-Mawa Logo"
              width={80}
              height={80}
              priority
              className="h-16 w-auto"
            />
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close sidebar"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Sidebar Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <ul className="space-y-6" style={{ opacity: isOpen ? 1 : 0, transition: isInitialized ? 'opacity 200ms ease-in-out' : 'none' }}>
              {/* Main Menu Items */}
              <li>
                <Link
                  href="/"
                  onClick={handleLinkClick}
                  className="text-black hover:text-gray-600 block duration-150 text-xl  py-2"
                >
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  onClick={handleLinkClick}
                  className="text-black hover:text-gray-600 block duration-150 text-xl  py-2"
                >
                  {t('about')}
                </Link>
              </li>

              {/* Our Work with Dropdown */}
              <li className="pt-6">
                <button
                  onClick={() => {
                    if (activeMenu === 'our-work') {
                      setActiveMenu(null);
                    } else {
                      setActiveMenu('our-work');
                    }
                  }}
                  className="flex items-center justify-between w-full text-black text-xl  hover:text-gray-600 transition-colors duration-300"
                >
                  <span className="text-left">Our Work</span>
                  <ChevronDown className={`w-6 h-6 transition-transform duration-200 ${activeMenu === 'our-work' ? 'rotate-0' : '-rotate-90'}`} />
                </button>
                {activeMenu === 'our-work' && (
                  <div className="pl-4 pt-2 space-y-2">
                    <Link
                      href="/our-work"
                      onClick={handleLinkClick}
                      className="text-black hover:text-gray-600 block duration-150 text-lg  py-1"
                    >
                      Our Work
                    </Link>
                    <Link
                      href="/demo-websites"
                      onClick={handleLinkClick}
                      className="text-black hover:text-gray-600 block duration-150 text-lg  py-1"
                    >
                      Demo Websites
                    </Link>
                  </div>
                )}
              </li>

              {/* Services Section */}
              <li className="pt-6">
                <button
                  onClick={openServicesMenu}
                  className="flex items-center justify-between w-full text-black text-xl  hover:text-gray-600 transition-colors duration-300"
                >
                  <span className="text-left">{t('services')}</span>
                  <ChevronDown className="w-6 h-6 transition-transform duration-200 -rotate-90" />
                </button>
              </li>

              {/* Careers Link */}
              <li className=" pt-6">
                <Link
                  href="/careers"
                  onClick={handleLinkClick}
                  className="text-black hover:text-gray-600 block duration-150 text-xl  py-2"
                >
                  {t('careers')}
                </Link>
              </li>

              {/* Testimonials with Dropdown */}
              <li className="pt-6">
                <button
                  onClick={() => {
                    if (activeMenu === 'testimonials') {
                      setActiveMenu(null);
                    } else {
                      setActiveMenu('testimonials');
                    }
                  }}
                  className="flex items-center justify-between w-full text-black text-xl  hover:text-gray-600 transition-colors duration-300"
                >
                  <span className="text-left">{t('testimonials')}</span>
                  <ChevronDown className={`w-6 h-6 transition-transform duration-200 ${activeMenu === 'testimonials' ? 'rotate-0' : '-rotate-90'}`} />
                </button>
                {activeMenu === 'testimonials' && (
                  <div className="pl-4 pt-2 space-y-2">
                    <Link
                      href="/testimonials"
                      onClick={handleLinkClick}
                      className="text-black hover:text-gray-600 block duration-150 text-lg  py-1"
                    >
                      Testimonials
                    </Link>
                    <Link
                      href="/share-feedback"
                      onClick={handleLinkClick}
                      className="text-black hover:text-gray-600 block duration-150 text-lg  py-1"
                    >
                      Share Feedback
                    </Link>
                  </div>
                )}
              </li>
            </ul>
          </div>

          {/* Sidebar Footer */}
          <div className="p-6 border-t space-y-4" style={{ opacity: isOpen ? 1 : 0, transition: isInitialized ? 'opacity 200ms ease-in-out 100ms' : 'none' }}>
            <LanguageSwitcher variant="mobile" />
            <Button
              asChild
              size="lg"
              className="w-full animated-border-button text-lg"
            >
              <Link href="/contact" onClick={handleLinkClick}>
                {t('contact')}
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Services Sidebar */}
      <div
        className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-[60] lg:hidden"
        style={{ 
          transform: servicesMenuOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: isInitialized ? 'transform 300ms ease-in-out' : 'none',
          willChange: 'transform',
          visibility: servicesMenuOpen ? 'visible' : 'hidden',
          pointerEvents: servicesMenuOpen ? 'auto' : 'none'
        }}
      >
        <div className="flex flex-col h-full">
          {/* Services Sidebar Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl  text-black">Our Services</h2>
            <button
              onClick={closeServicesMenu}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close services sidebar"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Back Button */}
          <div className="p-4 border-b">
            <button
              onClick={closeServicesMenu}
              className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
            >
              <ChevronDown className="w-5 h-5 rotate-90" />
              <span>Back to Menu</span>
            </button>
          </div>

          {/* Services Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <ul className="space-y-6" style={{ opacity: servicesMenuOpen ? 1 : 0, transition: isInitialized ? 'opacity 200ms ease-in-out' : 'none' }}>
              {servicesData.map((service, serviceIndex) => (
                <li
                  key={`nested-service-${serviceIndex}`}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <Link
                      href={service.href}
                      onClick={handleServicesLinkClick}
                      className="text-black hover:text-gray-600 text-lg transition-colors duration-200"
                    >
                      {service.name}
                    </Link>
                    <button
                      onClick={() => toggleServiceExpansion(serviceIndex)}
                      className="p-1 hover:bg-gray-100 rounded transition-colors"
                      aria-label={`Toggle ${service.name} submenu`}
                    >
                      <ChevronDown
                        className={`w-5 h-5 transition-transform duration-200 ${
                          expandedServices.includes(serviceIndex)
                            ? "rotate-180"
                            : ""
                        }`}
                      />
                    </button>
                  </div>

                  {/* Service Sub-items */}
                  <div
                    className="overflow-hidden"
                    style={{
                      maxHeight: expandedServices.includes(serviceIndex) ? '384px' : '0px',
                      opacity: expandedServices.includes(serviceIndex) ? 1 : 0,
                      transition: isInitialized ? 'max-height 300ms ease-in-out, opacity 200ms ease-in-out' : 'none'
                    }}
                  >
                    <ul className="space-y-2 pl-4 pt-2">
                      {service.subItems?.map((subItem, subIndex) => (
                        <li
                          key={subIndex}
                          className="transform"
                          style={{
                            transform: expandedServices.includes(serviceIndex) ? 'translateY(0)' : 'translateY(-8px)',
                            opacity: expandedServices.includes(serviceIndex) ? 1 : 0,
                            transition: isInitialized ? `transform 200ms ease-in-out ${subIndex * 30}ms, opacity 200ms ease-in-out ${subIndex * 30}ms` : 'none'
                          }}
                        >
                          <Link
                            href={subItem.href}
                            onClick={handleServicesLinkClick}
                            className="text-gray-600 hover:text-black transition-colors duration-200 text-sm py-1 hover:translate-x-1 transform block"
                          >
                            • {subItem.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
