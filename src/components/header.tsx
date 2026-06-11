// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import { Menu, X, ChevronDown, Code2, Laptop2, Megaphone, Palette, BrainCircuit } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { MobileSidebar } from "@/components/mobile-sidebar";
// import React, { useEffect } from "react";
// import { cn } from "@/lib/utils";
// import { useTranslations } from 'next-intl';
// import { usePathname } from "next/navigation";

// const serviceHeadingIcons: Record<string, React.ComponentType<{ className?: string }>> = {
//   "Web Development": Code2,
//   "IT & Tech Services": Laptop2,
//   "Digital Marketing": Megaphone,
//   "Graphic Design": Palette,
//   "AI Services": BrainCircuit,
// };

// const servicesData = [
//   {
//     name: "Our Services",
//     items: [
//       {
//         name: "Web Development",
//         href: "/services/web-development",
//         subItems: [
//           {
//             name: "Website Designing & Development Services",
//             href: "/services/web-development",
//           },
//           {
//             name: "Website Design Services",
//             href: "/services/web-development",
//           },
//           {
//             name: "Website Development Services",
//             href: "/services/web-development",
//           },
//           { name: "E-commerce Development", href: "/services/web-development" },
//           {
//             name: "Web Hosting & Domain Services",
//             href: "/services/web-development",
//           },
//           // {
//           //   name: "SEO & Digital Marketing Integration",
//           //   href: "/services/web-development",
//           // },
//           {
//             name: "Performance & Security Optimization",
//             href: "/services/web-development",
//           },
//           {
//             name: "Website Maintenance & Support",
//             href: "/services/web-development",
//           },
//           // {
//           //   name: "Emerging Web Technologies",
//           //   href: "/services/web-development",
//           // },
//           // {
//           //   name: "Benefits of Website Design & Development Services",
//           //   href: "/services/web-development",
//           // },
//         ],
//       },
//       {
//         name: "IT & Tech Services",
//         href: "/services/it-tech-services",
//         subItems: [
//           {
//             name: "IT & Tech Services - Complete Details",
//             href: "/services/it-tech-services",
//           },
//           {
//             name: "Infrastructure Services",
//             href: "/services/it-tech-services",
//           },
//           { name: "Managed IT Services", href: "/services/it-tech-services" },
//           {
//             name: "Cybersecurity Services",
//             href: "/services/it-tech-services",
//           },
//           {
//             name: "Cloud & DevOps Services",
//             href: "/services/it-tech-services",
//           },
//           {
//             name: "Software Development Services",
//             href: "/services/it-tech-services",
//           },
//           {
//             name: "IT Consulting & Advisory",
//             href: "/services/it-tech-services",
//           },
//           {
//             name: "Data & Analytics Services",
//             href: "/services/it-tech-services",
//           },
//           {
//             name: "Communication & Collaboration Services",
//             href: "/services/it-tech-services",
//           },
//           {
//             name: "IT Support & Helpdesk Services",
//             href: "/services/it-tech-services",
//           },
//           // {
//           //   name: "Emerging Technology Services",
//           //   href: "/services/it-tech-services",
//           // },
//           // {
//           //   name: "Benefits of IT & Tech Services",
//           //   href: "/services/it-tech-services",
//           // },
//         ],
//       },
//      {
//   name: "Digital Marketing",
//   href: "/services/email-whatsapp-sms-marketing",
//   subItems: [
//     {
//       name: "Email Marketing Services",
//       href: "/services/email-marketing-services",
//     },
//     {
//       name: "WhatsApp Marketing Services",
//       href: "/services/whatsapp-marketing-services",
//     },
//     {
//       name: "SMS Marketing Services",
//       href: "/services/sms-marketing-services",
//     },
//     {
//       name: "Omnichannel Integration",
//       href: "/services/omnichannel-integration",
//     },

//     // ✅ New additions
//     {
//       name: "RCS Messaging Services",
//       href: "/services/rcs-messaging-services",
//     },
//     {
//       name: "Push Notification Services",
//       href: "/services/push-notification-services",
//     },
//     {
//       name: "Marketing Automation",
//       href: "/services/marketing-automation",
//     },
//     {
//       name: "Customer Journey & Drip Campaigns",
//       href: "/services/customer-journey-drip-campaigns",
//     },
//     {
//       name: "Chatbot Marketing Services",
//       href: "/services/chatbot-marketing-services",
//     },

//   ],
// },
//       {
//         name: "Graphic Design",
//         href: "/services/branding-graphic-design",
//         subItems: [
//           {
//             name: "Brand Identity Design",
//             href: "/services/branding-graphic-design",
//           },
//           {
//             name: "Marketing & Promotional Design",
//             href: "/services/branding-graphic-design",
//           },
//           {
//             name: "Digital & Social Media Design",
//             href: "/services/branding-graphic-design",
//           },
//           {
//             name: "UI/UX & Web Graphics",
//             href: "/services/branding-graphic-design",
//           },
//           {
//             name: "Corporate & Office Branding",
//             href: "/services/branding-graphic-design",
//           },
//           {
//             name: "Motion Graphics & Multimedia Design",
//             href: "/services/branding-graphic-design",
//           },
//           {
//             name: "Illustration & Creative Art",
//             href: "/services/branding-graphic-design",
//           },
//           {
//             name: "Print & Publishing Design",
//             href: "/services/branding-graphic-design",
//           },
//           {
//             name: "Packaging & Product Branding",
//             href: "/services/branding-graphic-design",
//           },
//           // {
//           //   name: "Emerging Graphic Design Trends",
//           //   href: "/services/branding-graphic-design",
//           // },
//           // {
//           //   name: "Benefits of Branding & Graphic Design Services",
//           //   href: "/services/branding-graphic-design",
//           // },
//         ],
//       },
//       {
//         name: "AI Services",
//         href: "/services/consulting",
//         subItems: [
//           {
//             name: "Machine Learning (ML) Services",
//             href: "/services/consulting",
//           },
//           {
//             name: "Natural Language Processing (NLP) Services",
//             href: "/services/consulting",
//           },
//           { name: "Computer Vision Services", href: "/services/consulting" },
//           { name: "Generative AI Services", href: "/services/consulting" },
//           { name: "AI Automation Services", href: "/services/consulting" },
//           {
//             name: "Data & Analytics AI Services",
//             href: "/services/consulting",
//           },
//           { name: "AI in Cybersecurity", href: "/services/consulting" },
//           {
//             name: "Industry-Specific AI Solutions",
//             href: "/services/consulting",
//           },
//           { name: "AI Infrastructure & MLOps", href: "/services/consulting" },
//           { name: "AI Training & Support", href: "/services/consulting" },
//         ],
//       },
//     ],
//   },
// ];

// export const NavBar = () => {
//   const t = useTranslations('nav');
//   const pathname = usePathname();
//   const [menuState, setMenuState] = React.useState(false);
//   const [isScrolled, setIsScrolled] = React.useState(false);

//   // Get the current path without locale prefix
//   const currentPath = pathname.split("/").slice(1).join("/") || "/";

//   // Handle scroll effect
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Close mobile menu on escape key
//   useEffect(() => {
//     const handleEscape = (e: KeyboardEvent) => {
//       if (e.key === "Escape" && menuState) {
//         setMenuState(false);
//       }
//     };

//     if (menuState) {
//       document.addEventListener("keydown", handleEscape);
//     }

//     return () => {
//       document.removeEventListener("keydown", handleEscape);
//     };
//   }, [menuState]);

//   // Helper function to check if a link is active
//   const isActive = (href: string) => {
//     if (href === "/") {
//       return currentPath === "/" || currentPath === "";
//     }
//     return currentPath.startsWith(href.replace("/", ""));
//   };

//   return (
//     <header>
//       <nav
//         data-state={menuState && "active"}
//         className={` fixed z-50 w-full px-5`}
//       >
//         <div
//           className={cn(
//             "mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12",
//             isScrolled &&
//               !menuState &&
//               "bg-background/80 max-w-5xl rounded-2xl border backdrop-blur-lg lg:px-6 mt-4 shadow-lg"
//           )}
//         >
//           <div
//             className={`${
//               !isScrolled && "border-b border-black/20"
//             } relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4`}
//           >
//             {/* Left Logo */}
//             <div className="flex w-full justify-between lg:w-auto">
//               <Link
//                 href="/"
//                 aria-label="home"
//                 className="flex items-center space-x-2"
//               >
//                 <Image
//                   src="/logoblack.png"
//                   alt="Logo"
//                   width={100}
//                   height={100}
//                   priority
//                   className="h-16 w-auto"
//                 />
//               </Link>

//               {/* Mobile Menu Toggle */}
//               <button
//                 onClick={() => setMenuState(!menuState)}
//                 aria-label={menuState ? "Close Menu" : "Open Menu"}
//                 className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
//               >
//                 <Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
//                 <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
//               </button>
//             </div>

//             {/* Desktop Menu */}
//             <div className="absolute inset-0 m-auto hidden size-fit lg:block">
//               <ul className="flex gap-8 text-sm items-center">
//                 <li>
//                   <Link
//                     href="/"
//                     className={cn(
//                       "text-black hover:text-[#0ea5e9] block relative pb-2 px-2 transition-all duration-300 font-medium rounded-lg",
//                       "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:bg-gradient-to-r after:from-[#0ea5e9] after:to-cyan-400 after:rounded-full after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left",
//                       isActive("/") && "text-[#0ea5e9] after:scale-x-100 shadow-md shadow-[#0ea5e9]/20"
//                     )}
//                   >
//                     <span>{t('home')}</span>
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="/about"
//                     className={cn(
//                       "text-black hover:text-[#0ea5e9] block relative pb-2 px-2 transition-all duration-300 font-medium rounded-lg",
//                       "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:bg-gradient-to-r after:from-[#0ea5e9] after:to-cyan-400 after:rounded-full after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left",
//                       isActive("/about") && "text-[#0ea5e9] after:scale-x-100 shadow-md shadow-[#0ea5e9]/20"
//                     )}
//                   >
//                     <span>{t('about')}</span>
//                   </Link>
//                 </li>

//                 {/* Our Work Dropdown */}
//                 <li className="relative group">
//                   <div className={cn(
//                     "flex items-center gap-1 cursor-pointer text-black hover:text-[#0ea5e9] py-2 px-2 relative pb-2 transition-all duration-300 font-medium rounded-lg",
//                     "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:bg-gradient-to-r after:from-[#0ea5e9] after:to-cyan-400 after:rounded-full after:scale-x-0 group-hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left",
//                     isActive("/our-work") && "text-[#0ea5e9] after:scale-x-100 shadow-md shadow-[#0ea5e9]/20"
//                   )}>
//                     <span>Our Work</span>
//                     <ChevronDown className="w-3 h-3 transition-transform duration-300 group-hover:rotate-180" />
//                   </div>

//                   {/* Our Work Dropdown */}
//                   <div
//                     className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible 
//                    group-hover:opacity-100 group-hover:visible z-[110] pointer-events-none group-hover:pointer-events-auto transition-all duration-300"
//                   >
//                     <div className="bg-white border border-[#0ea5e9]/20 shadow-2xl shadow-[#0ea5e9]/10 py-3 rounded-xl w-fit min-w-[200px] backdrop-blur-sm">
//                       <Link
//                         href="/our-work"
//                         className={cn(
//                           "block px-4 py-2 text-sm transition-all duration-200 rounded-lg margin-1",
//                           isActive("/our-work") ? "text-[#0ea5e9] bg-[#0ea5e9]/10 font-semibold" : "text-gray-700 hover:text-[#0ea5e9] hover:bg-[#0ea5e9]/10"
//                         )}
//                       >
//                         Our Work
//                       </Link>
//                       <Link
//                         href="/demo-websites"
//                         className={cn(
//                           "block px-4 py-2 text-sm transition-all duration-200 rounded-lg",
//                           isActive("/demo-websites") ? "text-[#0ea5e9] bg-[#0ea5e9]/10 font-semibold" : "text-gray-700 hover:text-[#0ea5e9] hover:bg-[#0ea5e9]/10"
//                         )}
//                       >
//                         Demo Websites
//                       </Link>
//                     </div>
//                   </div>
//                 </li>

//                 {/* Simple Hover Dropdown */}
//                 {servicesData.map((service, index) => (
//                   <li key={index} className="relative group">
//                     <div className={cn(
//                       "flex items-center gap-1 cursor-pointer text-black hover:text-[#0ea5e9] py-2 px-2 relative pb-2 transition-all duration-300 font-medium rounded-lg",
//                       "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:bg-gradient-to-r after:from-[#0ea5e9] after:to-cyan-400 after:rounded-full after:scale-x-0 group-hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left",
//                       isActive("/services") && "text-[#0ea5e9] after:scale-x-100 shadow-md shadow-[#0ea5e9]/20"
//                     )}>
//                       <span>{t('services')}</span>
//                       <ChevronDown className="w-3 h-3 transition-transform duration-300 group-hover:rotate-180" />
//                     </div>

//                     {/* Dropdown Box */}
//                     <div
//                       className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible 
//                      group-hover:opacity-100 group-hover:visible z-[110] pointer-events-none group-hover:pointer-events-auto transition-all duration-300"
//                     >
//                       <div className="bg-white border border-[#0ea5e9]/20 shadow-2xl shadow-[#0ea5e9]/10 py-6 rounded-xl w-[80vw] max-w-6xl max-h-[80vh] overflow-y-auto scrollbar-hide backdrop-blur-sm">
//                         <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
//                           {service.items.map((item, itemIndex) => (
//                             <div key={itemIndex} className="space-y-4">
//                               <Link
//                                 href={item.href}
//                                 className={cn(
//                                   "flex items-center gap-2 text-lg font-semibold transition-colors duration-200 pb-2",
//                                   isActive(item.href) ? "text-[#0ea5e9]" : "text-black hover:text-[#0ea5e9]"
//                                 )}
//                               >
//                                 {(() => {
//                                   const Icon = serviceHeadingIcons[item.name];
//                                   return Icon ? <Icon className={cn("w-4 h-4", isActive(item.href) ? "text-[#0ea5e9]" : "text-[#0ea5e9]")} /> : null;
//                                 })()}
//                                 <span>{item.name}</span>
//                               </Link>
//                               <div className="space-y-2">
//                                 {item.subItems?.map((subItem, subIndex) => (
//                                   <Link
//                                     key={subIndex}
//                                     href={subItem.href}
//                                     className={cn(
//                                       "block text-xs rounded-xl pl-2 transition-colors duration-200 py-1.5 leading-relaxed",
//                                       isActive(subItem.href) ? "text-[#0ea5e9] bg-[#0ea5e9]/15 font-semibold" : "text-gray-700 hover:text-[#0ea5e9] hover:bg-[#0ea5e9]/15"
//                                     )}
//                                   >
//                                     {subItem.name}
//                                   </Link>
//                                 ))}
//                               </div>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     </div>
//                   </li>
//                 ))}

//                 {/* Our Programs Dropdown */}
//                 <li className="relative group">
//                   <div className={cn(
//                     "flex items-center gap-1 cursor-pointer text-black hover:text-[#0ea5e9] py-2 px-2 relative pb-2 transition-all duration-300 font-medium rounded-lg",
//                     "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:bg-gradient-to-r after:from-[#0ea5e9] after:to-cyan-400 after:rounded-full after:scale-x-0 group-hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left",
//                     (isActive("/franchise") || isActive("/referral") || isActive("/training-internship")) && "text-[#0ea5e9] after:scale-x-100 shadow-md shadow-[#0ea5e9]/20"
//                   )}>
//                     <span>Our Programs</span>
//                     <ChevronDown className="w-3 h-3 transition-transform duration-300 group-hover:rotate-180" />
//                   </div>

//                   {/* Our Programs Dropdown */}
//                   <div
//                     className="absolute top-full left-1/2 -translate-x-1/2 pt-6 opacity-0 invisible 
//                    group-hover:opacity-100 group-hover:visible z-[110] pointer-events-none group-hover:pointer-events-auto transition-all duration-500"
//                   >
//                     <div className="bg-white border border-[#0ea5e9]/20 shadow-2xl shadow-[#0ea5e9]/10 p-8 rounded-2xl w-[900px] backdrop-blur-sm">
//                       <div className="grid grid-cols-3 gap-6">
//                         {/* Franchise Section */}
//                         <div className="group relative overflow-hidden rounded-xl border border-gray-200/50 hover:border-[#0ea5e9]/60 transition-all duration-500 hover:shadow-xl hover:shadow-[#0ea5e9]/20 hover:scale-[1.02]">
//                           <div className="absolute inset-0 bg-gradient-to-r from-[#0ea5e9]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//                           <div className="relative p-6 flex flex-col h-full">
//                             <div className="w-full h-32 rounded-lg overflow-hidden mb-4 group-hover:scale-110 transition-transform duration-500">
//                               <Image 
//                                 src="/franchise.png"
//                                 alt="Franchise Business"
//                                 width={200}
//                                 height={128}
//                                 className="w-full h-full object-cover"
//                               />
//                             </div>
//                             <div className="flex-1 flex flex-col">
//                               <div className="flex items-center mb-3">
//                                 <div className="w-2 h-2 bg-[#0ea5e9] rounded-full mr-2 animate-pulse"></div>
//                                 <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#0ea5e9] transition-colors duration-300">Franchise Opportunity</h3>
//                               </div>
//                               <p className="text-gray-600 text-sm mb-4 leading-relaxed flex-1">
//                                 Join our successful franchise network and build your own business with the backing of an established brand.
//                               </p>
//                               <div className="space-y-3">
//                                 <div className="flex flex-wrap gap-2 text-xs">
//                                   <span className="inline-flex items-center text-gray-500">
//                                     <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
//                                     Low Investment
//                                   </span>
//                                   <span className="inline-flex items-center text-gray-500">
//                                     <span className="w-2 h-2 bg-blue-500 rounded-full mr-1"></span>
//                                     High Returns
//                                   </span>
//                                 </div>
//                                 <Button
//                                   asChild
//                                   size="sm"
//                                   className="w-full bg-[#0ea5e9] hover:bg-[#0284c7] text-white hover:shadow-lg hover:shadow-[#0ea5e9]/30 transition-all duration-300 hover:scale-105"
//                                 >
//                                   <Link href="/franchise">
//                                     Explore Now
//                                   </Link>
//                                 </Button>
//                               </div>
//                             </div>
//                           </div>
//                         </div>

//                         {/* Referral Section */}
//                         <div className="group relative overflow-hidden rounded-xl border border-gray-200/50 hover:border-[#0ea5e9]/60 transition-all duration-500 hover:shadow-xl hover:shadow-[#0ea5e9]/20 hover:scale-[1.02]">
//                           <div className="absolute inset-0 bg-gradient-to-r from-[#0ea5e9]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//                           <div className="relative p-6 flex flex-col h-full">
//                             <div className="w-full h-32 rounded-lg overflow-hidden mb-4 group-hover:scale-110 transition-transform duration-500">
//                               <Image 
//                                 src="/referral.png"
//                                 alt="Referral Commission"
//                                 width={200}
//                                 height={128}
//                                 className="w-full h-full object-cover"
//                               />
//                             </div>
//                             <div className="flex-1 flex flex-col">
//                               <div className="flex items-center mb-3">
//                                 <div className="w-2 h-2 bg-[#0ea5e9] rounded-full mr-2 animate-pulse"></div>
//                                 <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#0ea5e9] transition-colors duration-300">Referral & Commission</h3>
//                               </div>
//                               <p className="text-gray-600 text-sm mb-4 leading-relaxed flex-1">
//                                 Turn your network into income! Earn attractive commissions up to 15% by referring clients to our premium services.
//                               </p>
//                               <div className="space-y-3">
//                                 <div className="flex flex-wrap gap-2 text-xs">
//                                   <span className="inline-flex items-center text-gray-500">
//                                     <span className="w-2 h-2 bg-yellow-500 rounded-full mr-1"></span>
//                                     Up to 15% Commission
//                                   </span>
//                                   <span className="inline-flex items-center text-gray-500">
//                                     <span className="w-2 h-2 bg-purple-500 rounded-full mr-1"></span>
//                                     Instant Payouts
//                                   </span>
//                                 </div>
//                                 <Button
//                                   asChild
//                                   size="sm"
//                                   className="w-full bg-[#0ea5e9] hover:bg-[#0284c7] text-white hover:shadow-lg hover:shadow-[#0ea5e9]/30 transition-all duration-300 hover:scale-105"
//                                 >
//                                   <Link href="/referral">
//                                     Explore Now
//                                   </Link>
//                                 </Button>
//                               </div>
//                             </div>
//                           </div>
//                         </div>

//                         {/* Training & Internship Section */}
//                         <div className="group relative overflow-hidden rounded-xl border border-gray-200/50 hover:border-[#0ea5e9]/60 transition-all duration-500 hover:shadow-xl hover:shadow-[#0ea5e9]/20 hover:scale-[1.02]">
//                           <div className="absolute inset-0 bg-gradient-to-r from-[#0ea5e9]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//                           <div className="relative p-6 flex flex-col h-full">
//                             <div className="w-full h-32 rounded-lg overflow-hidden mb-4 group-hover:scale-110 transition-transform duration-500">
//                               <Image 
//                                 src="/intern.png"
//                                 alt="Training Internship"
//                                 width={200}
//                                 height={128}
//                                 className="w-full h-full object-cover"
//                               />
//                             </div>
//                             <div className="flex-1 flex flex-col">
//                               <div className="flex items-center mb-3">
//                                 <div className="w-2 h-2 bg-[#0ea5e9] rounded-full mr-2 animate-pulse"></div>
//                                 <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#0ea5e9] transition-colors duration-300">Training & Internship</h3>
//                               </div>
//                               <p className="text-gray-600 text-sm mb-4 leading-relaxed flex-1">
//                                 Launch your career with our comprehensive training programs and hands-on internships with 85% success rate.
//                               </p>
//                               <div className="space-y-3">
//                                 <div className="flex flex-wrap gap-2 text-xs">
//                                   <span className="inline-flex items-center text-gray-500">
//                                     <span className="w-2 h-2 bg-orange-500 rounded-full mr-1"></span>
//                                     Expert Training
//                                   </span>
//                                   <span className="inline-flex items-center text-gray-500">
//                                     <span className="w-2 h-2 bg-red-500 rounded-full mr-1"></span>
//                                     Job Placement
//                                   </span>
//                                 </div>
//                                 <Button
//                                   asChild
//                                   size="sm"
//                                   className="w-full bg-[#0ea5e9] hover:bg-[#0284c7] text-white hover:shadow-lg hover:shadow-[#0ea5e9]/30 transition-all duration-300 hover:scale-105"
//                                 >
//                                   <Link href="/it-courses">
//                                     Explore Now
//                                   </Link>
//                                 </Button>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </li>

//                 {/* Testimonials Link with Dropdown */}
//                 <li className="relative group">
//                   <div className={cn(
//                     "flex items-center gap-1 cursor-pointer text-black hover:text-[#0ea5e9] py-2 px-2 relative pb-2 transition-all duration-300 font-medium rounded-lg",
//                     "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:bg-gradient-to-r after:from-[#0ea5e9] after:to-cyan-400 after:rounded-full after:scale-x-0 group-hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left",
//                     isActive("/testimonials") && "text-[#0ea5e9] after:scale-x-100 shadow-md shadow-[#0ea5e9]/20"
//                   )}>
//                     <span>{t('testimonials')}</span>
//                     <ChevronDown className="w-3 h-3 transition-transform duration-300 group-hover:rotate-180" />
//                   </div>

//                   {/* Testimonials Dropdown */}
//                   <div
//                     className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible 
//                    group-hover:opacity-100 group-hover:visible z-[110] pointer-events-none group-hover:pointer-events-auto transition-all duration-300"
//                   >
//                     <div className="bg-white border border-[#0ea5e9]/20 shadow-2xl shadow-[#0ea5e9]/10 py-3 rounded-xl w-fit min-w-[200px] backdrop-blur-sm">
//                       <Link
//                         href="/testimonials"
//                         className={cn(
//                           "block px-4 py-2 text-sm transition-all duration-200 rounded-lg",
//                           isActive("/testimonials") ? "text-[#0ea5e9] bg-[#0ea5e9]/10 font-semibold" : "text-gray-700 hover:text-[#0ea5e9] hover:bg-[#0ea5e9]/10"
//                         )}
//                       >
//                         Testimonials
//                       </Link>
//                       <Link
//                         href="/share-feedback"
//                         className={cn(
//                           "block px-4 py-2 text-sm transition-all duration-200 rounded-lg",
//                           isActive("/share-feedback") ? "text-[#0ea5e9] bg-[#0ea5e9]/10 font-semibold" : "text-gray-700 hover:text-[#0ea5e9] hover:bg-[#0ea5e9]/10"
//                         )}
//                       >
//                         Director&apos; Desk
//                       </Link>
//                     </div>
//                   </div>
//                 </li>
//               </ul>
//             </div>

//             {/* Mobile Sidebar */}
//             <MobileSidebar
//               isOpen={menuState}
//               onClose={() => setMenuState(false)}
//             />

//             {/* Desktop Contact Button */}
//             <div className="hidden lg:flex items-center gap-2">
//               <Button
//                 asChild
//                 size="sm"
//                 className="animated-border-button no-animated-hover"
//               >
//                 <Link href="/contact">
//                   <span>{t('contact')}</span>
//                 </Link>
//               </Button>
//             </div>
//           </div>
//         </div>
//       </nav>
//     </header>
//   );
// };





"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, Code2, Laptop2, Megaphone, Palette, BrainCircuit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MobileSidebar } from "@/components/mobile-sidebar";
import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { useTranslations } from 'next-intl';
import { usePathname } from "next/navigation";

const serviceHeadingIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "Web Development": Code2,
  "IT & Tech Services": Laptop2,
  "Digital Marketing": Megaphone,
  "Graphic Design": Palette,
  "AI Services": BrainCircuit,
};

const servicesData = [
  {
    name: "Our Services",
    items: [
      {
        name: "Web Development",
        href: "/services/web-development",
        subItems: [
          { name: "Website Designing & Development Services", href: "/services/web-development" },
          { name: "Website Design Services", href: "/services/web-development" },
          { name: "Website Development Services", href: "/services/web-development" },
          { name: "E-commerce Development", href: "/services/web-development" },
          { name: "Web Hosting & Domain Services", href: "/services/web-development" },
          { name: "Performance & Security Optimization", href: "/services/web-development" },
          { name: "Website Maintenance & Support", href: "/services/web-development" },
        ],
      },
      {
        name: "IT & Tech Services",
        href: "/services/it-tech-services",
        subItems: [
          { name: "IT & Tech Services - Complete Details", href: "/services/it-tech-services" },
          { name: "Infrastructure Services", href: "/services/it-tech-services" },
          { name: "Managed IT Services", href: "/services/it-tech-services" },
          { name: "Cybersecurity Services", href: "/services/it-tech-services" },
          { name: "Cloud & DevOps Services", href: "/services/it-tech-services" },
          { name: "Software Development Services", href: "/services/it-tech-services" },
          { name: "IT Consulting & Advisory", href: "/services/it-tech-services" },
          { name: "Data & Analytics Services", href: "/services/it-tech-services" },
          { name: "Communication & Collaboration Services", href: "/services/it-tech-services" },
          { name: "IT Support & Helpdesk Services", href: "/services/it-tech-services" },
        ],
      },
      {
        name: "Digital Marketing",
        href: "/services/email-whatsapp-sms-marketing",
        subItems: [
          { name: "Email Marketing Services", href: "/services/email-marketing-services" },
          { name: "WhatsApp Marketing Services", href: "/services/whatsapp-marketing-services" },
          { name: "SMS Marketing Services", href: "/services/sms-marketing-services" },
          { name: "Omnichannel Integration", href: "/services/omnichannel-integration" },
          { name: "RCS Messaging Services", href: "/services/rcs-messaging-services" },
          { name: "Push Notification Services", href: "/services/push-notification-services" },
          { name: "Marketing Automation", href: "/services/marketing-automation" },
          { name: "Customer Journey & Drip Campaigns", href: "/services/customer-journey-drip-campaigns" },
          { name: "Chatbot Marketing Services", href: "/services/chatbot-marketing-services" },
        ],
      },
      {
        name: "Graphic Design",
        href: "/services/branding-graphic-design",
        subItems: [
          { name: "Brand Identity Design", href: "/services/branding-graphic-design" },
          { name: "Marketing & Promotional Design", href: "/services/branding-graphic-design" },
          { name: "Digital & Social Media Design", href: "/services/branding-graphic-design" },
          { name: "UI/UX & Web Graphics", href: "/services/branding-graphic-design" },
          { name: "Corporate & Office Branding", href: "/services/branding-graphic-design" },
          { name: "Motion Graphics & Multimedia Design", href: "/services/branding-graphic-design" },
          { name: "Illustration & Creative Art", href: "/services/branding-graphic-design" },
          { name: "Print & Publishing Design", href: "/services/branding-graphic-design" },
          { name: "Packaging & Product Branding", href: "/services/branding-graphic-design" },
        ],
      },
      {
        name: "AI Services",
        href: "/services/consulting",
        subItems: [
          { name: "Machine Learning (ML) Services", href: "/services/consulting" },
          { name: "Natural Language Processing (NLP) Services", href: "/services/consulting" },
          { name: "Computer Vision Services", href: "/services/consulting" },
          { name: "Generative AI Services", href: "/services/consulting" },
          { name: "AI Automation Services", href: "/services/consulting" },
          { name: "Data & Analytics AI Services", href: "/services/consulting" },
          { name: "AI in Cybersecurity", href: "/services/consulting" },
          { name: "Industry-Specific AI Solutions", href: "/services/consulting" },
          { name: "AI Infrastructure & MLOps", href: "/services/consulting" },
          { name: "AI Training & Support", href: "/services/consulting" },
        ],
      },
    ],
  },
];

type DropdownKey = "services" | "ourWork" | "ourPrograms" | "testimonials" | null;

export const NavBar = () => {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [menuState, setMenuState] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [openDropdown, setOpenDropdown] = React.useState<DropdownKey>(null);
  const navRef = useRef<HTMLDivElement>(null);

  const currentPath = pathname.split("/").slice(1).join("/") || "/";

  // Close all dropdowns on route change
  useEffect(() => {
    setOpenDropdown(null);
    setMenuState(false);
  }, [pathname]);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenDropdown(null);
        setMenuState(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (key: DropdownKey) => {
    setOpenDropdown(prev => prev === key ? null : key);
  };

  const closeDropdown = () => setOpenDropdown(null);

  const isActive = (href: string) => {
    if (href === "/") return currentPath === "/" || currentPath === "";
    return currentPath.startsWith(href.replace("/", ""));
  };

  return (
    <header>
      <nav
        data-state={menuState && "active"}
        className="fixed z-50 w-full px-5"
      >
        <div
          ref={navRef}
          className={cn(
            "mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12",
            isScrolled && !menuState &&
              "bg-background/80 max-w-5xl rounded-2xl border backdrop-blur-lg lg:px-6 mt-4 shadow-lg"
          )}
        >
          <div
            className={`${!isScrolled && "border-b border-black/20"
              } relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4`}
          >
            {/* Logo */}
            <div className="flex w-full justify-between lg:w-auto">
              <Link href="/" aria-label="home" className="flex items-center space-x-2">
                <Image src="/logoblack.png" alt="Logo" width={100} height={100} priority className="h-16 w-auto" />
              </Link>

              {/* Mobile toggle */}
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

                {/* Home */}
                <li>
                  <Link
                    href="/"
                    onClick={closeDropdown}
                    className={cn(
                      "text-black hover:text-[#0ea5e9] block relative pb-2 px-2 transition-all duration-300 font-medium rounded-lg",
                      "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:bg-gradient-to-r after:from-[#0ea5e9] after:to-cyan-400 after:rounded-full after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left",
                      isActive("/") && "text-[#0ea5e9] after:scale-x-100 shadow-md shadow-[#0ea5e9]/20"
                    )}
                  >
                    <span>{t('home')}</span>
                  </Link>
                </li>

                {/* About */}
                <li>
                  <Link
                    href="/about"
                    onClick={closeDropdown}
                    className={cn(
                      "text-black hover:text-[#0ea5e9] block relative pb-2 px-2 transition-all duration-300 font-medium rounded-lg",
                      "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:bg-gradient-to-r after:from-[#0ea5e9] after:to-cyan-400 after:rounded-full after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left",
                      isActive("/about") && "text-[#0ea5e9] after:scale-x-100 shadow-md shadow-[#0ea5e9]/20"
                    )}
                  >
                    <span>{t('about')}</span>
                  </Link>
                </li>

                {/* Our Work */}
                <li className="relative">
                  <button
                    onClick={() => toggleDropdown("ourWork")}
                    className={cn(
                      "flex items-center gap-1 cursor-pointer text-black hover:text-[#0ea5e9] py-2 px-2 relative pb-2 transition-all duration-300 font-medium rounded-lg",
                      "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:bg-gradient-to-r after:from-[#0ea5e9] after:to-cyan-400 after:rounded-full after:transition-transform after:duration-300 after:origin-left",
                      openDropdown === "ourWork" ? "after:scale-x-100 text-[#0ea5e9]" : "after:scale-x-0",
                      isActive("/our-work") && "text-[#0ea5e9] after:scale-x-100 shadow-md shadow-[#0ea5e9]/20"
                    )}
                  >
                    <span>Our Work</span>
                    <ChevronDown className={cn("w-3 h-3 transition-transform duration-300", openDropdown === "ourWork" && "rotate-180")} />
                  </button>

                  {openDropdown === "ourWork" && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 z-[110]">
                      <div className="bg-white border border-[#0ea5e9]/20 shadow-2xl shadow-[#0ea5e9]/10 py-3 rounded-xl w-fit min-w-[200px] backdrop-blur-sm">
                        <Link
                          href="/our-work"
                          onClick={closeDropdown}
                          className={cn(
                            "block px-4 py-2 text-sm transition-all duration-200 rounded-lg",
                            isActive("/our-work") ? "text-[#0ea5e9] bg-[#0ea5e9]/10 font-semibold" : "text-gray-700 hover:text-[#0ea5e9] hover:bg-[#0ea5e9]/10"
                          )}
                        >
                          Our Work
                        </Link>
                        <Link
                          href="/demo-websites"
                          onClick={closeDropdown}
                          className={cn(
                            "block px-4 py-2 text-sm transition-all duration-200 rounded-lg",
                            isActive("/demo-websites") ? "text-[#0ea5e9] bg-[#0ea5e9]/10 font-semibold" : "text-gray-700 hover:text-[#0ea5e9] hover:bg-[#0ea5e9]/10"
                          )}
                        >
                          Demo Websites
                        </Link>
                      </div>
                    </div>
                  )}
                </li>

                {/* Services */}
                {servicesData.map((service, index) => (
                  <li key={index} className="relative">
                    <button
                      onClick={() => toggleDropdown("services")}
                      className={cn(
                        "flex items-center gap-1 cursor-pointer text-black hover:text-[#0ea5e9] py-2 px-2 relative pb-2 transition-all duration-300 font-medium rounded-lg",
                        "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:bg-gradient-to-r after:from-[#0ea5e9] after:to-cyan-400 after:rounded-full after:transition-transform after:duration-300 after:origin-left",
                        openDropdown === "services" ? "after:scale-x-100 text-[#0ea5e9]" : "after:scale-x-0",
                        isActive("/services") && "text-[#0ea5e9] after:scale-x-100 shadow-md shadow-[#0ea5e9]/20"
                      )}
                    >
                      <span>{t('services')}</span>
                      <ChevronDown className={cn("w-3 h-3 transition-transform duration-300", openDropdown === "services" && "rotate-180")} />
                    </button>

                    {openDropdown === "services" && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 z-[110]">
                        <div className="bg-white border border-[#0ea5e9]/20 shadow-2xl shadow-[#0ea5e9]/10 py-6 rounded-xl w-[80vw] max-w-6xl max-h-[80vh] overflow-y-auto scrollbar-hide backdrop-blur-sm">
                          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                            {service.items.map((item, itemIndex) => (
                              <div key={itemIndex} className="space-y-4">
                                <Link
                                  href={item.href}
                                  onClick={closeDropdown}
                                  className={cn(
                                    "flex items-center gap-2 text-lg font-semibold transition-colors duration-200 pb-2",
                                    isActive(item.href) ? "text-[#0ea5e9]" : "text-black hover:text-[#0ea5e9]"
                                  )}
                                >
                                  {(() => {
                                    const Icon = serviceHeadingIcons[item.name];
                                    return Icon ? <Icon className="w-4 h-4 text-[#0ea5e9]" /> : null;
                                  })()}
                                  <span>{item.name}</span>
                                </Link>
                                <div className="space-y-2">
                                  {item.subItems?.map((subItem, subIndex) => (
                                    <Link
                                      key={subIndex}
                                      href={subItem.href}
                                      onClick={closeDropdown}
                                      className={cn(
                                        "block text-xs rounded-xl pl-2 transition-colors duration-200 py-1.5 leading-relaxed",
                                        isActive(subItem.href) ? "text-[#0ea5e9] bg-[#0ea5e9]/15 font-semibold" : "text-gray-700 hover:text-[#0ea5e9] hover:bg-[#0ea5e9]/15"
                                      )}
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
                    )}
                  </li>
                ))}

                {/* Our Programs */}
                <li className="relative">
                  <button
                    onClick={() => toggleDropdown("ourPrograms")}
                    className={cn(
                      "flex items-center gap-1 cursor-pointer text-black hover:text-[#0ea5e9] py-2 px-2 relative pb-2 transition-all duration-300 font-medium rounded-lg",
                      "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:bg-gradient-to-r after:from-[#0ea5e9] after:to-cyan-400 after:rounded-full after:transition-transform after:duration-300 after:origin-left",
                      openDropdown === "ourPrograms" ? "after:scale-x-100 text-[#0ea5e9]" : "after:scale-x-0",
                      (isActive("/franchise") || isActive("/referral") || isActive("/training-internship")) && "text-[#0ea5e9] after:scale-x-100 shadow-md shadow-[#0ea5e9]/20"
                    )}
                  >
                    <span>Our Programs</span>
                    <ChevronDown className={cn("w-3 h-3 transition-transform duration-300", openDropdown === "ourPrograms" && "rotate-180")} />
                  </button>

                  {openDropdown === "ourPrograms" && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-6 z-[110]">
                      <div className="bg-white border border-[#0ea5e9]/20 shadow-2xl shadow-[#0ea5e9]/10 p-8 rounded-2xl w-[900px] backdrop-blur-sm">
                        <div className="grid grid-cols-3 gap-6">
                          {/* Franchise */}
                          <div className="group relative overflow-hidden rounded-xl border border-gray-200/50 hover:border-[#0ea5e9]/60 transition-all duration-500 hover:shadow-xl hover:shadow-[#0ea5e9]/20 hover:scale-[1.02]">
                            <div className="absolute inset-0 bg-gradient-to-r from-[#0ea5e9]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative p-6 flex flex-col h-full">
                              <div className="w-full h-32 rounded-lg overflow-hidden mb-4 group-hover:scale-110 transition-transform duration-500">
                                <Image src="/franchise.png" alt="Franchise Business" width={200} height={128} className="w-full h-full object-cover" />
                              </div>
                              <div className="flex-1 flex flex-col">
                                <div className="flex items-center mb-3">
                                  <div className="w-2 h-2 bg-[#0ea5e9] rounded-full mr-2 animate-pulse" />
                                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#0ea5e9] transition-colors duration-300">Franchise Opportunity</h3>
                                </div>
                                <p className="text-gray-600 text-sm mb-4 leading-relaxed flex-1">
                                  Join our successful franchise network and build your own business with the backing of an established brand.
                                </p>
                                <div className="space-y-3">
                                  <div className="flex flex-wrap gap-2 text-xs">
                                    <span className="inline-flex items-center text-gray-500"><span className="w-2 h-2 bg-green-500 rounded-full mr-1" />Low Investment</span>
                                    <span className="inline-flex items-center text-gray-500"><span className="w-2 h-2 bg-blue-500 rounded-full mr-1" />High Returns</span>
                                  </div>
                                  <Button asChild size="sm" className="w-full bg-[#0ea5e9] hover:bg-[#0284c7] text-white hover:shadow-lg hover:shadow-[#0ea5e9]/30 transition-all duration-300 hover:scale-105">
                                    <Link href="/franchise" onClick={closeDropdown}>Explore Now</Link>
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Referral */}
                          <div className="group relative overflow-hidden rounded-xl border border-gray-200/50 hover:border-[#0ea5e9]/60 transition-all duration-500 hover:shadow-xl hover:shadow-[#0ea5e9]/20 hover:scale-[1.02]">
                            <div className="absolute inset-0 bg-gradient-to-r from-[#0ea5e9]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative p-6 flex flex-col h-full">
                              <div className="w-full h-32 rounded-lg overflow-hidden mb-4 group-hover:scale-110 transition-transform duration-500">
                                <Image src="/referral.png" alt="Referral Commission" width={200} height={128} className="w-full h-full object-cover" />
                              </div>
                              <div className="flex-1 flex flex-col">
                                <div className="flex items-center mb-3">
                                  <div className="w-2 h-2 bg-[#0ea5e9] rounded-full mr-2 animate-pulse" />
                                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#0ea5e9] transition-colors duration-300">Referral & Commission</h3>
                                </div>
                                <p className="text-gray-600 text-sm mb-4 leading-relaxed flex-1">
                                  Turn your network into income! Earn attractive commissions up to 15% by referring clients to our premium services.
                                </p>
                                <div className="space-y-3">
                                  <div className="flex flex-wrap gap-2 text-xs">
                                    <span className="inline-flex items-center text-gray-500"><span className="w-2 h-2 bg-yellow-500 rounded-full mr-1" />Up to 15% Commission</span>
                                    <span className="inline-flex items-center text-gray-500"><span className="w-2 h-2 bg-purple-500 rounded-full mr-1" />Instant Payouts</span>
                                  </div>
                                  <Button asChild size="sm" className="w-full bg-[#0ea5e9] hover:bg-[#0284c7] text-white hover:shadow-lg hover:shadow-[#0ea5e9]/30 transition-all duration-300 hover:scale-105">
                                    <Link href="/referral" onClick={closeDropdown}>Explore Now</Link>
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Training & Internship */}
                          <div className="group relative overflow-hidden rounded-xl border border-gray-200/50 hover:border-[#0ea5e9]/60 transition-all duration-500 hover:shadow-xl hover:shadow-[#0ea5e9]/20 hover:scale-[1.02]">
                            <div className="absolute inset-0 bg-gradient-to-r from-[#0ea5e9]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative p-6 flex flex-col h-full">
                              <div className="w-full h-32 rounded-lg overflow-hidden mb-4 group-hover:scale-110 transition-transform duration-500">
                                <Image src="/intern.png" alt="Training Internship" width={200} height={128} className="w-full h-full object-cover" />
                              </div>
                              <div className="flex-1 flex flex-col">
                                <div className="flex items-center mb-3">
                                  <div className="w-2 h-2 bg-[#0ea5e9] rounded-full mr-2 animate-pulse" />
                                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#0ea5e9] transition-colors duration-300">Training & Internship</h3>
                                </div>
                                <p className="text-gray-600 text-sm mb-4 leading-relaxed flex-1">
                                  Launch your career with our comprehensive training programs and hands-on internships with 85% success rate.
                                </p>
                                <div className="space-y-3">
                                  <div className="flex flex-wrap gap-2 text-xs">
                                    <span className="inline-flex items-center text-gray-500"><span className="w-2 h-2 bg-orange-500 rounded-full mr-1" />Expert Training</span>
                                    <span className="inline-flex items-center text-gray-500"><span className="w-2 h-2 bg-red-500 rounded-full mr-1" />Job Placement</span>
                                  </div>
                                  <Button asChild size="sm" className="w-full bg-[#0ea5e9] hover:bg-[#0284c7] text-white hover:shadow-lg hover:shadow-[#0ea5e9]/30 transition-all duration-300 hover:scale-105">
                                    <Link href="/it-courses" onClick={closeDropdown}>Explore Now</Link>
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </li>

                {/* Testimonials */}
                <li className="relative">
                  <button
                    onClick={() => toggleDropdown("testimonials")}
                    className={cn(
                      "flex items-center gap-1 cursor-pointer text-black hover:text-[#0ea5e9] py-2 px-2 relative pb-2 transition-all duration-300 font-medium rounded-lg",
                      "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:bg-gradient-to-r after:from-[#0ea5e9] after:to-cyan-400 after:rounded-full after:transition-transform after:duration-300 after:origin-left",
                      openDropdown === "testimonials" ? "after:scale-x-100 text-[#0ea5e9]" : "after:scale-x-0",
                      isActive("/testimonials") && "text-[#0ea5e9] after:scale-x-100 shadow-md shadow-[#0ea5e9]/20"
                    )}
                  >
                    <span>{t('testimonials')}</span>
                    <ChevronDown className={cn("w-3 h-3 transition-transform duration-300", openDropdown === "testimonials" && "rotate-180")} />
                  </button>

                  {openDropdown === "testimonials" && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 z-[110]">
                      <div className="bg-white border border-[#0ea5e9]/20 shadow-2xl shadow-[#0ea5e9]/10 py-3 rounded-xl w-fit min-w-[200px] backdrop-blur-sm">
                        <Link
                          href="/testimonials"
                          onClick={closeDropdown}
                          className={cn(
                            "block px-4 py-2 text-sm transition-all duration-200 rounded-lg",
                            isActive("/testimonials") ? "text-[#0ea5e9] bg-[#0ea5e9]/10 font-semibold" : "text-gray-700 hover:text-[#0ea5e9] hover:bg-[#0ea5e9]/10"
                          )}
                        >
                          Testimonials
                        </Link>
                        <Link
                          href="/share-feedback"
                          onClick={closeDropdown}
                          className={cn(
                            "block px-4 py-2 text-sm transition-all duration-200 rounded-lg",
                            isActive("/share-feedback") ? "text-[#0ea5e9] bg-[#0ea5e9]/10 font-semibold" : "text-gray-700 hover:text-[#0ea5e9] hover:bg-[#0ea5e9]/10"
                          )}
                        >
                          Director&apos;s Desk
                        </Link>
                      </div>
                    </div>
                  )}
                </li>

              </ul>
            </div>

            {/* Mobile Sidebar */}
            <MobileSidebar isOpen={menuState} onClose={() => setMenuState(false)} />

            {/* Contact Button */}
            <div className="hidden lg:flex items-center gap-2">
              <Button asChild size="sm" className="animated-border-button no-animated-hover">
                <Link href="/contact" onClick={closeDropdown}>
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