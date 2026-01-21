import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import { Inter } from "next/font/google";
import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';

const inter = Inter({ subsets: ["latin"] });

// const quickLinks = [
//     { title: 'About', href: '/about' },
//     { title: 'Services', href: '/services' },
//     { title: 'Testimonials', href: '/testimonials' },
//     { title: 'Contact', href: '/contact' },
// ]

const contactInfo = [
  { icon: Mail, text: "business@al-mawa.international", href: "mailto:business@al-mawa.international" },
  { icon: Phone, text: "+91 9561179693", href: "tel:+91 9561179693" },
  { icon: MapPin, text: "AL-MAWA INTERNATIONAL Location", href: "https://www.google.com/maps/search/?api=1&query=AL-MAWA+INTERNATIONAL+Office+No.+102-103,+%28+Nexus+Work+Spaces%29+1st+Floor,+Pride+icon+Building,+Above+Athithi+Restaurant,+Kharadi+Bypass+Road,+Kharadi,+Pune,+Maharashtra,+India+411014" },
];

export default function FooterSection() {
  const t = useTranslations('footer');
  const [year, setYear] = useState(2025);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-black text-white border-t border-border/50">
      <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Side - Logo and Company Info */}
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-4">
              <Image
                src="/logowhite.svg"
                alt="Al Mawa Logo"
                width={40}
                height={40}
                className="h-16 w-auto"
              />
            </div>
            <p className={` text-gray-300 text-sm leading-relaxed max-w-md`}>
              {t('description')}
            </p>
          </div>

          {/* Middle - Quick Links */}
          {/* <div>
                        <h3 className="text-foreground font-semibold text-lg mb-4">Quick Links</h3>
                        <ul className="space-y-3">
                            {quickLinks.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        href={link.href}
                                        className="text-white hover:text-primary transition-colors duration-200 text-sm"
                                    >
                                        {link.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div> */}

          {/* Right Side - Contact Info */}
          <div className="flex flex-col gap-6">
            {/* Contact Info */}
            <div>
              <h3
                className={`${inter.className} font-semibold  mb-4 text-left md:text-right text-2xl text-white uppercase`}
              >
                {t('contactInfo')}
              </h3>
              <ul className="space-y-3">
                {contactInfo.map((contact, index) => {
                  const Icon = contact.icon;
                  return (
                    <li key={index}>
                      <Link
                        href={contact.href}
                        className="text-gray-300 flex items-center space-x-3 hover:text-[#0ea5e9] transition-colors duration-200 text-sm group md:flex-row-reverse md:space-x-reverse "
                        target="_blank"
                      >
                        <Icon className="size-4 flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
                        <span>{contact.text}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Social Links */}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/50 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col items-center md:items-start gap-1">
              <p className="text-white text-sm font-semibold">
                © {year} {t('companyName')}. {t('allRightsReserved')}
              </p>
              <div className="flex flex-col md:flex-row gap-3">
                <Link
                  href="/our-work"
                  className="text-xs text-gray-300 hover:text-[#0ea5e9] underline-offset-4 hover:underline"
                >
                  Our Work
                </Link>
                <span className="text-xs text-gray-300 hidden md:inline">|</span>
                <Link
                  href="/policy"
                  className="text-xs text-gray-300 hover:text-[#0ea5e9] underline-offset-4 hover:underline"
                >
                  Terms &amp; Conditions / Policy
                </Link>
              </div>
            </div>
            <div className="flex space-x-4">
              <Link
                href="https://x.com/al_mawa__"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X/Twitter"
                className="text-white hover:text-[#0ea5e9] transition-colors duration-200 p-2 rounded-lg hover:bg-accent/10"
              >
                <svg
                  className="size-7"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M10.488 14.651L15.25 21h7l-7.858-10.478L20.93 3h-2.65l-5.117 5.886L8.75 3h-7l7.51 10.015L2.32 21h2.65zM16.25 19L5.75 5h2l10.5 14z"
                  />
                </svg>
              </Link>
              <Link
                href="https://www.linkedin.com/company/108440677/admin/dashboard/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-white hover:text-[#0ea5e9] transition-colors duration-200 p-2 rounded-lg hover:bg-accent/10"
              >
                <svg
                  className="size-7"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z"
                  />
                </svg>
              </Link>
              <Link
                href="https://www.instagram.com/al_mawainternational?igsh=MXJkbWt3b3NvOTBmaw=="
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-white hover:text-[#0ea5e9] transition-colors duration-200 p-2 rounded-lg hover:bg-accent/10"
              >
                <svg
                  className="size-7"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3"
                  />
                </svg>
              </Link>
            </div>
            {/* <div className="flex space-x-6 text-sm">
                            <Link href="#" className="text-white hover:text-primary transition-colors duration-200">
                                Privacy Policy
                            </Link>
                            <Link href="#" className="text-white hover:text-primary transition-colors duration-200">
                                Terms of Service
                            </Link>
                            <Link href="#" className="text-white hover:text-primary transition-colors duration-200">
                                Cookie Policy
                            </Link>
                        </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
}
