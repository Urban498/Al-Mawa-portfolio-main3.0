"use client";

import React, { useState } from "react";
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

import { PinContainer } from "@/components/ui/3D-pin";
import "../globals.css";
import { Inter, Playfair_Display, Work_Sans } from "next/font/google";
import api from "@/lib/api";
import { toast } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const playfair_display = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const work_sans = Work_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});
const contactInfo = [
  {
    icon: <Mail className="w-6 h-6" />,
    title: "Email",
    value: ["business@al-mawa.international", "hr@al-mawa.international"],
    description: "Send us an email anytime",
  },
  {
    icon: <Phone className="w-6 h-6" />,
    title: "Phone",
    value: ["+91 9561179693", "+91 9561186693", "+91 9561106693"],
    description: "Mon – Sat: 9:00 AM – 7:00 PM",
  },
  {
    icon: <MapPin className="w-6 h-6" />,
    title: "Office",
    value: "AL- MAWA INTERNATIONAL Office No. 102-103, ( Nexus Work Spaces)",
    description:
      "1st Floor, Pride icon Building, Above Athithi Restaurant, Kharadi, Pune , Maharashtra- India 411014",
  },
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
    tellUSAboutYou: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      selecetCountry: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("📤 Submitting form data:", formData);

      const response = await api.post("/contact-us", {
        ...formData,
        phoneNumber: parseInt(formData.phoneNumber, 10),
      });

      console.log("✅ Form submitted successfully:", response.data);

      toast.success("Message sent successfully!", {
        description:
          "Thank you for reaching out. We'll get back to you within 24 hours.",
      });

      // Reset form
      setFormData({
        firstname: "",
        lastName: "",
        emailAddress: "",
        phoneNumber: "",
        selecetCountry: "",
        subject: "",
        tellUSAboutYou: "",
      });
    } catch (error: unknown) {
      console.error("❌ Form submission error:", error);

      toast.error("Failed to send message", {
        description:
          error instanceof Error ? error.message : "Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="background-img relative w-full bg-cover bg-center bg-no-repeat min-h-screen -mt-20 pt-20">
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

      <div className="container mx-auto px-4 pt-6 pb-16 relative z-10">
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
            </h1>
          </motion.div>
          <motion.p
            className="text-lg md:text-xl text-white max-w-3xl mx-auto leading-relaxed text-center mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          ></motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 py-6 sm:py-10 w-[95%] sm:w-[90%] mx-auto gap-6 sm:gap-8">
          {/* Contact Form - Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="order-2 lg:order-2"
          >
            <Card className="bg-[#ffffff8b] px-3 sm:px-4 py-8 sm:py-16 rounded-md shadow-lg shadow-black ">
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
                    <Select
                      value={formData.selecetCountry}
                      onValueChange={handleSelectChange}
                    >
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
                      {loading ? "Sending..." : "Submit"}
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* 3D Pin Map - Left Side */}
          <motion.div
            className="flex justify-center items-center order-1 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="w-full h-[400px] sm:h-[450px] md:h-[500px] lg:w-[50vw] lg:h-[80vh] flex items-center justify-center relative overflow-hidden">
              <PinContainer
                title="AL-MAWA INTERNATIONAL - Pune, India"
                href="  https://www.google.com/maps/dir/''/1st+Floor,+Pride+Icon,+Office+No,+102,103,+Nexus+Work+Spaces,+Mundhwa+-+Kharadi+Rd,+above+Athithi+Restaurant,+Kharadi,+Pune,+Maharashtra+411014/@18.5437685,73.9317181,1168m/data=!3m1!1e3!4m13!4m12!1m5!1m1!1s0x6094c0903e247dfd:0xb0a873dfffda5192!2m2!1d73.9359362!2d18.5434425!1m5!1m1!1s0x6094c0903e247dfd:0xb0a873dfffda5192!2m2!1d73.9359362!2d18.5434425?entry=ttu&g_ep=EgoyMDI1MTAwNy4wIKXMDSoASAFQAw%3D%3D "
                className="w-full h-full min-w-[320px] min-h-[350px] sm:min-w-[400px] sm:min-h-[400px] lg:w-[40vw] lg:h-[60vh]"
                containerClassName="w-full h-full"
                imageUrl="/mapdark.png"
              >
                <div className="text-base !p-6 !m-0 h-full w-full text-white rounded-lg flex flex-col justify-center items-center">
                  <h3 className="max-w-xs !pb-2 !m-0 font-bold text-base text-slate-100"></h3>
                  <div className="text-base !m-0 !p-0 font-normal">
                    <span className="text-slate-200 text-sm">
                      <br />

                      <br />
                    </span>
                  </div>
                  <div className="flex items-center mt-4 space-x-2"></div>
                </div>
              </PinContainer>
            </div>
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

          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 shadow-lg ">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 2.2 + index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group h-full"
              >
                <Card className=" border border-white/20 bg-gray-200 backdrop-blur-xl hover:bg-gray-300 transition-all duration-500 h-full min-h-[180px] sm:min-h-[200px]">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-start space-x-3 sm:space-x-4">
                      <motion.div
                        className="p-3 sm:p-4 rounded-xl bg-[#0ea5e9] text-white group-hover:scale-110 transition-transform duration-300"
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
                              <div
                                key={idx}
                                className="mb-1 text-sm sm:text-base leading-tight break-words"
                              >
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