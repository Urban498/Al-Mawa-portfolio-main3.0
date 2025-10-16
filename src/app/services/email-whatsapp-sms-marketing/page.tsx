"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EnquiryModal } from "@/components/enquiry-modal";
import {
  Mail,
  MessageCircle,
  Smartphone,
  Network,
  TrendingUp,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";
import { Inter, Playfair_Display } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const playfair_display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const services = [
  {
    icon: Mail,
    title: "Email Marketing Services",
    description:
      "Professional email campaigns that engage your audience and drive conversions",
    features: [
      "Campaign Design",
      "Automated Sequences",
      "A/B Testing",
      "Performance Analytics",
    ],
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Marketing Services",
    description:
      "Direct customer engagement through WhatsApp Business with personalized messaging",
    features: [
      "Business API Setup",
      "Broadcast Messages",
      "Customer Support",
      "Automated Responses",
    ],
  },
  {
    icon: Smartphone,
    title: "SMS Marketing Services",
    description:
      "Instant reach with targeted SMS campaigns for time-sensitive promotions and updates",
    features: [
      "Bulk SMS Campaigns",
      "Personalized Messages",
      "Delivery Reports",
      "Opt-in Management",
    ],
  },
  {
    icon: Network,
    title: "Omnichannel Integration",
    description:
      "Seamless integration across all marketing channels for consistent customer experience",
    features: [
      "Cross-platform Campaigns",
      "Unified Analytics",
      "Customer Journey Mapping",
      "Synchronized Messaging",
    ],
  },
  {
    icon: CheckCircle,
    title: "Benefits of Email, WhatsApp & SMS Marketing",
    description:
      "Comprehensive advantages of multi-channel marketing approach for business growth",
    features: [
      "Higher Engagement",
      "Direct Communication",
      "Cost-Effective",
      "Measurable Results",
    ],
  },
];

const benefits = [
  "Direct communication with customers through their preferred channels",
  "Higher engagement rates compared to traditional advertising",
  "Cost-effective marketing with measurable ROI",
  "Personalized messaging based on customer behavior and preferences",
  "Real-time delivery and instant customer feedback",
  "Automated campaigns that save time and increase efficiency",
  "Detailed analytics and reporting for campaign optimization",
  "Increased customer retention through regular engagement",
  "Global reach with local personalization capabilities",
  "Integration with existing CRM and marketing tools",
];

const marketingStats = [
  {
    metric: "4.1 Billion",
    description: "Email users worldwide",
    icon: Mail,
  },
  {
    metric: "2+ Billion",
    description: "WhatsApp active users",
    icon: MessageCircle,
  },
  {
    metric: "98%",
    description: "SMS open rate",
    icon: Smartphone,
  },
  {
    metric: "4200%",
    description: "Average ROI for email marketing",
    icon: TrendingUp,
  },
];

export default function DigitalMarketingPage() {
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);

  return (
    <div className="min-h-screen mt-10 bg-gradient-to-b from-background via-muted to-card">
      {/* Hero Section */}
      <motion.section
        className="py-12 md:py-16 lg:py-20 px-4 md:px-6 lg:px-8"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            className={`text-4xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-black uppercase ${inter.className}`}
            variants={fadeInUp}
          >
            Digital Marketing
            <br />
          </motion.h1>
          <motion.p
            className={`text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mt-6 ${playfair_display.className}`}
            variants={fadeInUp}
          >
            Connect with your customers through powerful email, WhatsApp, and
            SMS marketing campaigns. Drive engagement and boost conversions with
            our integrated digital marketing solutions.
          </motion.p>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        className="py-16 px-4 md:px-6 lg:px-8 bg-card/30"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-12 -mt-15" variants={fadeInUp}>
            <h2
              className={`text-3xl md:text-4xl font-bold text-black mb-4 ${inter.className}`}
            >
              Marketing That Delivers Results
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {marketingStats.map((stat, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="text-center p-6 hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="pt-6">
                    <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
                      <stat.icon className="w-6 h-6 text-[#0ea5e9]" />
                    </div>
                    <h3
                      className={`text-3xl font-bold text-black mb-2 ${inter.className}`}
                    >
                      {stat.metric}
                    </h3>
                    <p
                      className={`text-gray-600 ${playfair_display.className}`}
                    >
                      {stat.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Services Grid */}
      <motion.section
        className="py-16 px-4 md:px-6 lg:px-8"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <h2
              className={`text-3xl md:text-4xl font-bold text-black mb-4 ${inter.className}`}
            >
              Our Digital Marketing Services
            </h2>
            <p
              className={`text-lg text-gray-600 max-w-2xl mx-auto ${playfair_display.className}`}
            >
              Comprehensive marketing solutions across multiple channels
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 flex flex-col">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <service.icon className="w-6 h-6 text-[#0ea5e9]" />
                      </div>
                      <Badge
                        variant="secondary"
                        className="bg-[#0ea5e9] text-white"
                      >
                        Marketing
                      </Badge>
                    </div>
                    <CardTitle
                      className={`text-xl font-semibold text-black ${inter.className}`}
                    >
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <p
                      className={`text-gray-600 mb-4 ${playfair_display.className}`}
                    >
                      {service.description}
                    </p>
                    <div className="space-y-2 mb-6 flex-1">
                      {service.features.map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className="flex items-center gap-2"
                        >
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-gray-600">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="flex w-full">
                      <Button
                        onClick={() => setIsEnquiryModalOpen(true)}
                        className="mx-auto w-[80%] cursor-pointer bg-[#0ea5e9] hover:bg-[#13a5e9cc]  mt-auto text-white"
                        size="sm"
                      >
                        Enquire
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Benefits Section */}
      <motion.section
        className="py-16 px-4 md:px-6 lg:px-8 bg-card/50"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <h2
              className={`text-3xl md:text-4xl font-bold text-black mb-4 ${inter.className}`}
            >
              Benefits of Email, WhatsApp & SMS Marketing
            </h2>
            <p
              className={`text-lg text-gray-600 max-w-2xl mx-auto ${playfair_display.className}`}
            >
              Why multi-channel marketing is essential for your business growth
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm"
              >
                <CheckCircle className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                <p className={`text-gray-700 ${playfair_display.className}`}>
                  {benefit}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="py-16 px-4 md:px-6 lg:px-8"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className={`text-3xl md:text-4xl font-bold text-black mb-6 ${inter.className}`}
          >
            Ready to Boost Your Marketing Results?
          </h2>
          <p
            className={`text-lg text-gray-600 mb-8 ${playfair_display.className}`}
          >
            Start connecting with your customers through powerful email,
            WhatsApp, and SMS campaigns. Let&apos;s create a marketing strategy
            that drives real results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => setIsEnquiryModalOpen(true)}
              size="lg"
              className="hover:bg-[#0ea5e9] bg-white text-black border hover:text-white"
            >
              <span> Start Marketing Campaign </span>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/about">Learn More About Us</Link>
            </Button>
          </div>
        </div>
      </motion.section>

      {/* Enquiry Modal */}
      <EnquiryModal
        isOpen={isEnquiryModalOpen}
        onClose={() => setIsEnquiryModalOpen(false)}
        serviceName="Digital Marketing"
      />
    </div>
  );
}
