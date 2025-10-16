"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EnquiryModal } from "@/components/enquiry-modal";
import {
  Server,
  Shield,
  Cloud,
  Code,
  Users,
  BarChart3,
  MessageSquare,
  HeadphonesIcon,
  Zap,
  Settings,
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
    icon: CheckCircle,
    title: "IT & Tech Services - Complete Details",
    description:
      "Comprehensive overview of all our IT and technology service offerings",
    features: [
      "Service Portfolio",
      "Technology Stack",
      "Implementation Process",
      "Support Structure",
    ],
  },
  {
    icon: Server,
    title: "Infrastructure Services",
    description:
      "Robust IT infrastructure solutions for scalable and reliable business operations",
    features: [
      "Network Setup",
      "Server Management",
      "Hardware Installation",
      "System Architecture",
    ],
  },
  {
    icon: Settings,
    title: "Managed IT Services",
    description:
      "Complete IT management and monitoring to keep your systems running smoothly",
    features: [
      "24/7 Monitoring",
      "Proactive Maintenance",
      "System Updates",
      "Performance Optimization",
    ],
  },
  {
    icon: Shield,
    title: "Cybersecurity Services",
    description:
      "Advanced security solutions to protect your business from cyber threats",
    features: [
      "Security Audits",
      "Threat Detection",
      "Data Protection",
      "Compliance Management",
    ],
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps Services",
    description:
      "Modern cloud solutions and DevOps practices for efficient development and deployment",
    features: [
      "Cloud Migration",
      "DevOps Implementation",
      "CI/CD Pipelines",
      "Container Management",
    ],
  },
  {
    icon: Code,
    title: "Software Development Services",
    description:
      "Custom software solutions tailored to your specific business requirements",
    features: [
      "Custom Applications",
      "System Integration",
      "API Development",
      "Legacy Modernization",
    ],
  },
  {
    icon: Users,
    title: "IT Consulting & Advisory",
    description:
      "Strategic IT guidance to align technology with your business objectives",
    features: [
      "Technology Strategy",
      "Digital Transformation",
      "IT Planning",
      "Risk Assessment",
    ],
  },
  {
    icon: BarChart3,
    title: "Data & Analytics Services",
    description:
      "Transform your data into actionable insights for better business decisions",
    features: [
      "Data Analysis",
      "Business Intelligence",
      "Reporting Solutions",
      "Data Visualization",
    ],
  },
  {
    icon: MessageSquare,
    title: "Communication & Collaboration Services",
    description:
      "Modern communication tools and collaboration platforms for remote teams",
    features: [
      "Video Conferencing",
      "Team Collaboration",
      "Document Sharing",
      "Remote Access",
    ],
  },
  {
    icon: HeadphonesIcon,
    title: "IT Support & Helpdesk Services",
    description:
      "Comprehensive technical support and helpdesk services for your IT needs",
    features: [
      "Technical Support",
      "Issue Resolution",
      "User Training",
      "Documentation",
    ],
  },
  {
    icon: Zap,
    title: "Emerging Technology Services",
    description:
      "Cutting-edge technology solutions including AI, IoT, and blockchain implementations",
    features: [
      "AI Integration",
      "IoT Solutions",
      "Blockchain Development",
      "Automation Tools",
    ],
  },
  {
    icon: CheckCircle,
    title: "Benefits of IT & Tech Services",
    description:
      "Key advantages and benefits of implementing our IT and technology services",
    features: [
      "Cost Reduction",
      "Enhanced Security",
      "Improved Productivity",
      "Strategic Growth",
    ],
  },
];

const benefits = [
  "Reduced IT costs through efficient managed services",
  "Enhanced security with advanced cybersecurity measures",
  "Improved productivity with reliable IT infrastructure",
  "24/7 technical support and monitoring",
  "Scalable solutions that grow with your business",
  "Access to latest technologies and best practices",
  "Compliance with industry standards and regulations",
  "Strategic IT planning aligned with business goals",
  "Faster issue resolution and minimal downtime",
  "Expert guidance from certified IT professionals",
];

export default function ITTechServicesPage() {
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
            IT & Tech
            <br />
          </motion.h1>
          <motion.p
            className={`text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mt-6 ${playfair_display.className}`}
            variants={fadeInUp}
          >
            Comprehensive IT solutions and technology services to power your
            business forward. From infrastructure to emerging technologies,
            we&apos;ve got you covered.
          </motion.p>
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
          <motion.div className="text-center mb-16 -mt-15" variants={fadeInUp}>
            <h2
              className={`text-3xl md:text-4xl font-bold text-black mb-4 ${inter.className}`}
            >
              Complete IT & Technology Solutions
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                        IT Service
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
              Benefits of Our IT & Tech Services
            </h2>
            <p
              className={`text-lg text-gray-600 max-w-2xl mx-auto ${playfair_display.className}`}
            >
              Transform your business with our comprehensive IT solutions
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
            Ready to Upgrade Your IT Infrastructure?
          </h2>
          <p
            className={`text-lg text-gray-600 mb-8 ${playfair_display.className}`}
          >
            Let our IT experts help you build a robust, secure, and scalable
            technology foundation. Contact us today for a comprehensive IT
            assessment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => setIsEnquiryModalOpen(true)}
              size="lg"
              className="hover:bg-[#0ea5e9] bg-white text-black border hover:text-white"
            >
              Get IT Consultation
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
        serviceName="IT & Tech Services"
      />
    </div>
  );
}
