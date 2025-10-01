"use client";

import React, { useState, lazy, Suspense } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, ArrowRight } from "lucide-react";

const WorldMap = lazy(() => import("@/components/ui/world-map"));
import "../globals.css";
import { Inter, Playfair_Display, Work_Sans } from "next/font/google";
import api from "@/lib/api";
import { toast } from "sonner";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const playfair_display = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const work_sans = Work_Sans({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });
const contactInfo = [
  {
    icon: <Mail className="w-6 h-6" />,
    title: "Email",
    value: [
      "business@al-mawa.international",
      "hr@al-mawa.international",
      
    ],
    description: "Send us an email anytime",
  },
  {
    icon: <Phone className="w-6 h-6" />,
    title: "Phone",
    value: [
      "+91 9561179693",
      "+91 9561186693",
      "+91 9561106693"
    ],
    description: "Mon – Sat: 9:00 AM – 7:00 PM",
  },
  {
    icon: <MapPin className="w-6 h-6" />,
    title: "Office",
    value: "AL- MAWA INTERNATIONAL Office No. 102-103, ( Nexus Work Spaces)",
    description: "1st Floor, Pride icon Building, Above Athithi Restaurant, Kharadi, Pune , Maharashtra- India 411014",
  },
  // AL- MAWA INTERNATIONAL Office No. 102-103, ( Nexus Work Spaces) 1st Floor, Pride icon Building, Above Athithi Restaurant, Kharadi, Pune , Maharshtra- India 411014
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Working Hours",
    value: "Mon – Sat: 9:00 AM – 7:00 PM",
    description: "* Closed on 1st & 3rd Saturdays",
  },
];

const countries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Cape Verde",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Korea",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Korea",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastName: "",
    emailAddress: "",
    phoneNumber: "",
    selecetCountry: "",
    subject: "",
    tellUSAboutYou: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      selecetCountry: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("📤 Submitting form data:", formData);
      
      const response = await api.post('/contact-us', {
        ...formData,
        phoneNumber: parseInt(formData.phoneNumber, 10)
      });

      console.log("✅ Form submitted successfully:", response.data);
      
      toast.success('Message sent successfully!', {
        description: 'Thank you for reaching out. We\'ll get back to you within 24 hours.',
      });

      // Reset form
      setFormData({
        firstname: "",
        lastName: "",
        emailAddress: "",
        phoneNumber: "",
        selecetCountry: "",
        subject: "",
        tellUSAboutYou: ""
      });

    } catch (error: unknown) {
      console.error("❌ Form submission error:", error);
      
      toast.error('Failed to send message', {
        description: error instanceof Error ? error.message : 'Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="background-img relative w-full bg-cover bg-center bg-no-repeat min-h-screen">
      <div className="absolute inset-0 bg-gray-300 opacity-85 z-0" />

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-emerald-400/10 to-cyan-400/10 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-pink-400/5 to-orange-400/5 rounded-full blur-3xl"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <div className="container mx-auto px-4 pt-26 pb-16 relative z-10">
        {/* Page Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative inline-block"
          >
            <h1
              className={`text-5xl md:text-7xl text-center font-normal leading-tight text-black uppercase ${work_sans.className} `}
            >
              reach out to us
              <br />
              {/* <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500">Our Expert Team</span> */}
            </h1>
          </motion.div>
          <motion.p
            className="text-lg md:text-xl text-white max-w-3xl mx-auto leading-relaxed text-center mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          ></motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 py-10 w-[90%] mx-auto gap-8">
          {/* Contact Form - Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="order-2 lg:order-2"
          >
            <Card className="bg-[#ffffff8b] px-4 py-16 rounded-md shadow-lg shadow-black ">
              <CardHeader className="relative">
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <CardTitle
                    className={`text-3xl font-bold text-center text-black uppercase ${inter.className}`}
                  >
                    Send us a message
                  </CardTitle>
                  <CardDescription
                    className={`text-center text-black mt-2 ${playfair_display.className}`}
                  >
                    Fill out the form below and we&apos;ll get back to you
                    within 24 hours.
                  </CardDescription>
                </motion.div>
              </CardHeader>

              <CardContent className="relative">
                <form
                  onSubmit={handleSubmit}
                  className="space-y-6 w-[100%] mx-auto"
                >
                  <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1 }}
                  >
                    <Input
                      name="firstname"
                      placeholder="First Name"
                      type="text"
                      value={formData.firstname}
                      onChange={handleInputChange}
                      required
                      className="w-full p-4 border-b text-black placeholder:text-gray-400 hover:border-b-2 border-black focus:outline-none focus:ring-b-2 focus:ring-black"
                    />
                    <Input
                      name="lastName"
                      placeholder="Last Name"
                      type="text"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full p-4 border-b text-black placeholder:text-gray-400 hover:border-b-2 border-black focus:outline-none focus:ring-b-2 focus:ring-black"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 1.1 }}
                  >
                    <Input
                      name="emailAddress"
                      placeholder="Email Address"
                      type="email"
                      value={formData.emailAddress}
                      onChange={handleInputChange}
                      required
                      className="w-full p-4 border-b text-black placeholder:text-gray-400 hover:border-b-2 border-black focus:outline-none focus:ring-b-2 focus:ring-black"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 1.1 }}
                  >
                    <Input
                      name="phoneNumber"
                      placeholder="Phone Number"
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      required
                      className="w-full p-4 border-b text-black placeholder:text-gray-400 hover:border-b-2 border-black focus:outline-none focus:ring-b-2 focus:ring-black"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                  >
                    <Select value={formData.selecetCountry} onValueChange={handleSelectChange}>
                      <SelectTrigger className="w-full p-4 border-b text-black placeholder:text-black hover:border-b-2 border-black focus:outline-none focus:ring-b-2 focus:ring-black bg-transparent ">
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-100 border-gray-600 text-black max-h-60">
                        {countries.map((country) => (
                          <SelectItem
                            key={country}
                            value={country}
                            className="text-black  focus:bg-gray-200"
                          >
                            {country}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 1.3 }}
                  >
                    <Input
                      name="subject"
                      placeholder="Subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full p-4 border-b text-black placeholder:text-gray-400 hover:border-b-2 border-black focus:outline-none focus:ring-b-2 focus:ring-black"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.4 }}
                  >
                    <Textarea
                      name="tellUSAboutYou"
                      placeholder="Tell us about your project and how we can help bring your vision to life..."
                      rows={6}
                      value={formData.tellUSAboutYou}
                      onChange={handleInputChange}
                      required
                      className="w-full p-4 border-b text-black placeholder:text-gray-400 hover:border-b-2 border-black focus:outline-none focus:ring-b-2 focus:ring-black"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 1.5 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-8 py-3 cursor-pointer rounded-full bg-black w-full text-center text-white text-lg font-semibold hover:bg-white hover:text-black border border-black transition-all duration-500 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Sending...' : 'Submit'}
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* World Map - Left Side */}
          <motion.div
            className="flex justify-center items-center order-1 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* <Image
              src={<WorldMap />}
              alt="worldmap"
              width={600}
              height={600}
              className="rounded-lg"
              loading="lazy"
            /> */}
            <Suspense fallback={
              <div className="w-full aspect-[2/1] bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-gray-500">Loading map...</div>
              </div>
            }>
              <WorldMap 
                dots={[
                  {
                    // All animations start from India (AL-MAWA INTERNATIONAL office in Pune)
                    start: { lat: 18.5204, lng: 73.8567 }, // Pune, India (Your office) - Central Hub
                    end: { lat: 40.7128, lng: -74.0060 },   // New York, USA
                  },
                  {
                    start: { lat: 18.5204, lng: 73.8567 }, // Pune, India - Central Hub
                    end: { lat: 51.5074, lng: -0.1278 },    // London, UK
                  },
                  {
                    start: { lat: 18.5204, lng: 73.8567 }, // Pune, India - Central Hub
                    end: { lat: 55.6762, lng: 139.6503 },   // Tokyo, Japan
                  },
                  {
                    start: { lat: 18.5204, lng: 73.8567 }, // Pune, India - Central Hub
                    end: { lat: -33.8688, lng: 120.2093 },  // Sydney, Australia
                  },
                  {
                    start: { lat: 18.5204, lng: 73.8567 }, // Pune, India - Central Hub
                    end: { lat: 25.2048, lng: 55.2708 },    // Dubai, UAE
                  },
                ]}
                lineColor="#b5ff08"
              />
            </Suspense>
          </motion.div>
        </div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="space-y-8 max-w-4xl mx-auto"
        >
          <div className="text-center ">
            <motion.h2
              className={`text-3xl font-bold mb-4 text-black uppercase ${inter.className}`}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 1.8 }}
            >
              Other Ways to Reach Us
            </motion.h2>
            <motion.p
              className={`text-black mb-8 ${playfair_display.className}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 2 }}
            >
              Choose the method that works best for you. We&apos;re always here
              to help!
            </motion.p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 shadow-lg ">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 2.2 + index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group h-full"
              >
                <Card className=" border border-white/20 bg-gray-200 backdrop-blur-xl hover:bg-gray-300 transition-all duration-500 h-full min-h-[200px]">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <motion.div
                        className="p-4 rounded-xl bg-[#cfff32] text-black group-hover:scale-110 transition-transform duration-300"
                        whileHover={{ rotate: 5 }}
                      >
                        {info.icon}
                      </motion.div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-black mb-1 transition-colors duration-300">
                          {info.title}
                        </h3>
                        <div className="text-[black] font-semibold mb-1">
                          {Array.isArray(info.value) ? (
                            info.value.map((item, idx) => (
                              <div key={idx} className="mb-1 text-sm sm:text-base leading-tight break-words">
                                {item}
                              </div>
                            ))
                          ) : (
                            <div className="text-sm sm:text-base leading-tight break-words">
                              {info.value}
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-black/80 transition-colors duration-300">
                          {info.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// "use client";

// import React from "react";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { motion } from "framer-motion";
// import {
//   ArrowRight,
//   Mail,
//   Phone,
//   MapPin,
//   Clock,
//   Send,
//   Sparkles
// } from "lucide-react";
// import { cn } from "@/lib/utils";

// const contactInfo = [
//   {
//     icon: <Mail className="w-6 h-6" />,
//     title: "Email",
//     value: "hello@almawa.com",
//     description: "Send us an email anytime"
//   },
//   {
//     icon: <Phone className="w-6 h-6" />,
//     title: "Phone",
//     value: "+1 (555) 123-4567",
//     description: "Mon-Fri from 8am to 5pm"
//   },
//   {
//     icon: <MapPin className="w-6 h-6" />,
//     title: "Office",
//     value: "123 Business Street",
//     description: "San Francisco, CA 94102"
//   },
//   {
//     icon: <Clock className="w-6 h-6" />,
//     title: "Working Hours",
//     value: "Mon-Fri 8AM-5PM",
//     description: "Weekend support available"
//   }
// ];

// export default function ContactPage() {
//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     console.log("Form submitted");
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 relative overflow-hidden">
//       {/* Animated Background Elements */}
//       <div className="absolute inset-0 overflow-hidden">
//         <motion.div
//           className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"
//           animate={{
//             x: [0, 100, 0],
//             y: [0, -50, 0],
//             scale: [1, 1.1, 1]
//           }}
//           transition={{
//             duration: 20,
//             repeat: Infinity,
//             ease: "easeInOut"
//           }}
//         />
//         <motion.div
//           className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-emerald-400/10 to-cyan-400/10 rounded-full blur-3xl"
//           animate={{
//             x: [0, -80, 0],
//             y: [0, 60, 0],
//             scale: [1, 0.9, 1]
//           }}
//           transition={{
//             duration: 25,
//             repeat: Infinity,
//             ease: "easeInOut"
//           }}
//         />
//         <motion.div
//           className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-pink-400/5 to-orange-400/5 rounded-full blur-3xl"
//           animate={{
//             rotate: [0, 360],
//             scale: [1, 1.2, 1]
//           }}
//           transition={{
//             duration: 30,
//             repeat: Infinity,
//             ease: "linear"
//           }}
//         />
//       </div>

//       <div className="container mx-auto px-4 py-16 relative z-10">
//         {/* Page Header */}
//         <motion.div
//           className="text-center mb-16"
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//         >
//           <motion.div
//             initial={{ scale: 0.9 }}
//             animate={{ scale: 1 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             className="relative inline-block"
//           >
//             <Sparkles className="absolute -top-6 -right-6 w-8 h-8 text-yellow-400 animate-pulse" />
//             <h1 className="text-4xl md:text-6xl font-bold pb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
//               Let&apos;s Connect
//             </h1>
//           </motion.div>
//           <motion.p
//             className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.8, delay: 0.4 }}
//           >
//             Ready to transform your ideas into reality?
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 font-semibold"> Let&apos;s create something extraordinary together!</span>
//           </motion.p>
//         </motion.div>

//         <div className="flex flex-col gap-12 max-w-4xl mx-auto">
//           {/* Contact Form */}
//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.6 }}
//             whileHover={{ y: -5 }}
//             className="group"
//           >
//             <Card className="border border-slate-700/50 bg-slate-800/40 backdrop-blur-xl shadow-2xl hover:shadow-cyan-500/10 transition-all duration-500 relative overflow-hidden">
//               {/* Card Glow Effect */}
//               <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

//               <CardHeader className="relative">
//                 <motion.div
//                   initial={{ scale: 0.9 }}
//                   animate={{ scale: 1 }}
//                   transition={{ duration: 0.5, delay: 0.8 }}
//                 >
//                   <CardTitle className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
//                     Send us a message
//                   </CardTitle>
//                   <CardDescription className="text-center text-slate-300 mt-2">
//                     Fill out the form below and we&apos;ll get back to you within 24 hours.
//                   </CardDescription>
//                 </motion.div>
//               </CardHeader>

//               <CardContent className="relative">
//                 <form onSubmit={handleSubmit} className="space-y-6">
//                   <motion.div
//                     className="grid grid-cols-1 md:grid-cols-2 gap-4"
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ duration: 0.6, delay: 1 }}
//                   >
//                     <LabelInputContainer>
//                       <Label htmlFor="firstname" className="text-slate-200 font-medium">First name</Label>
//                       <Input
//                         id="firstname"
//                         placeholder="John"
//                         type="text"
//                         required
//                         className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-cyan-400 focus:ring-cyan-400/20 transition-all duration-300"
//                       />
//                     </LabelInputContainer>
//                     <LabelInputContainer>
//                       <Label htmlFor="lastname" className="text-slate-200 font-medium">Last name</Label>
//                       <Input
//                         id="lastname"
//                         placeholder="Doe"
//                         type="text"
//                         required
//                         className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-cyan-400 focus:ring-cyan-400/20 transition-all duration-300"
//                       />
//                     </LabelInputContainer>
//                   </motion.div>

//                   <motion.div
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ duration: 0.6, delay: 1.1 }}
//                   >
//                     <LabelInputContainer>
//                       <Label htmlFor="email" className="text-slate-200 font-medium">Email Address</Label>
//                       <Input
//                         id="email"
//                         placeholder="john.doe@example.com"
//                         type="email"
//                         required
//                         className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-emerald-400 focus:ring-emerald-400/20 transition-all duration-300"
//                       />
//                     </LabelInputContainer>
//                   </motion.div>

//                   <motion.div
//                     initial={{ opacity: 0, x: 20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ duration: 0.6, delay: 1.2 }}
//                   >
//                     <LabelInputContainer>
//                       <Label htmlFor="company" className="text-slate-200 font-medium">Company (Optional)</Label>
//                       <Input
//                         id="company"
//                         placeholder="Your Company"
//                         type="text"
//                         className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-400 focus:ring-purple-400/20 transition-all duration-300"
//                       />
//                     </LabelInputContainer>
//                   </motion.div>

//                   <motion.div
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ duration: 0.6, delay: 1.3 }}
//                   >
//                     <LabelInputContainer>
//                       <Label htmlFor="subject" className="text-slate-200 font-medium">Subject</Label>
//                       <Input
//                         id="subject"
//                         placeholder="How can we help you?"
//                         type="text"
//                         required
//                         className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-pink-400 focus:ring-pink-400/20 transition-all duration-300"
//                       />
//                     </LabelInputContainer>
//                   </motion.div>

//                   <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.6, delay: 1.4 }}
//                   >
//                     <LabelInputContainer>
//                       <Label htmlFor="message" className="text-slate-200 font-medium">Message</Label>
//                       <Textarea
//                         id="message"
//                         placeholder="Tell us about your project and how we can help bring your vision to life..."
//                         rows={6}
//                         required
//                         className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-cyan-400 focus:ring-cyan-400/20 transition-all duration-300 resize-none"
//                       />
//                     </LabelInputContainer>
//                   </motion.div>

//                   <motion.div
//                     initial={{ opacity: 0, scale: 0.9 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     transition={{ duration: 0.6, delay: 1.5 }}
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                   >
//                     <Button
//                       type="submit"
//                       size="lg"
//                       className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-semibold py-4 rounded-lg shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 group"
//                     >
//                       <Send className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
//                       Send Message
//                       <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
//                     </Button>
//                   </motion.div>
//                 </form>
//               </CardContent>
//             </Card>
//           </motion.div>

//           {/* Contact Information */}
//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 1.6 }}
//             className="space-y-8"
//           >
//             <div className="text-center">
//               <motion.h2
//                 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-400"
//                 initial={{ scale: 0.9 }}
//                 animate={{ scale: 1 }}
//                 transition={{ duration: 0.6, delay: 1.8 }}
//               >
//                 Other Ways to Reach Us
//               </motion.h2>
//               <motion.p
//                 className="text-slate-300 mb-8"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ duration: 0.6, delay: 2 }}
//               >
//                 Choose the method that works best for you. We&apos;re always here to help!
//               </motion.p>
//             </div>

//             <div className="grid gap-6 sm:grid-cols-2">
//               {contactInfo.map((info, index) => (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, y: 30, scale: 0.9 }}
//                   animate={{ opacity: 1, y: 0, scale: 1 }}
//                   transition={{ duration: 0.6, delay: 2.2 + index * 0.1 }}
//                   whileHover={{ y: -8, scale: 1.02 }}
//                   className="group"
//                 >
//                   <Card className="border border-slate-700/50 bg-slate-800/30 backdrop-blur-xl hover:bg-slate-800/50 transition-all duration-500 relative overflow-hidden">
//                     {/* Animated border gradient */}
//                     <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />

//                     <CardContent className="p-6 relative">
//                       <div className="flex items-start space-x-4">
//                         <motion.div
//                           className="p-4 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 text-cyan-400 group-hover:scale-110 transition-transform duration-300"
//                           whileHover={{ rotate: 5 }}
//                         >
//                           {info.icon}
//                         </motion.div>
//                         <div className="flex-1">
//                           <h3 className="font-bold text-lg text-white mb-1 group-hover:text-cyan-400 transition-colors duration-300">
//                             {info.title}
//                           </h3>
//                           <p className="text-emerald-400 font-semibold mb-1">
//                             {info.value}
//                           </p>
//                           <p className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
//                             {info.description}
//                           </p>
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </motion.div>
//               ))}
//             </div>

//             {/* Enhanced CTA Section */}
//             <motion.div
//               className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-8 rounded-2xl border border-slate-700/50 text-center backdrop-blur-xl overflow-hidden group"
//               initial={{ opacity: 0, y: 30, scale: 0.95 }}
//               animate={{ opacity: 1, y: 0, scale: 1 }}
//               transition={{ duration: 0.8, delay: 2.6 }}
//               whileHover={{ scale: 1.02, y: -5 }}
//             >
//               {/* Animated background gradient */}
//               <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

//               <motion.div
//                 initial={{ scale: 0.9 }}
//                 animate={{ scale: 1 }}
//                 transition={{ duration: 0.6, delay: 2.8 }}
//                 className="relative"
//               >
//                 <Sparkles className="w-8 h-8 text-yellow-400 mx-auto mb-4 animate-pulse" />
//                 <h3 className="text-2xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
//                   Ready to get started?
//                 </h3>
//                 <p className="text-slate-300 mb-6 max-w-md mx-auto">
//                   Let&apos;s discuss your project and see how we can help bring your vision to life with cutting-edge solutions.
//                 </p>
//                 <motion.div
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   <Button className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 group">
//                     <Sparkles className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform duration-300" />
//                     Schedule a Call
//                     <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
//                   </Button>
//                 </motion.div>
//               </motion.div>
//             </motion.div>
//           </motion.div>
//         </div>

//       </div>
//     </div>
//   );
// }

// const LabelInputContainer = ({
//   children,
//   className,
// }: {
//   children: React.ReactNode;
//   className?: string;
// }) => {
//   return (
//     <div className={cn("flex w-full flex-col space-y-2", className)}>
//       {children}
//     </div>
//   );
// };
