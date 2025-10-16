"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EnquiryModal } from "@/components/enquiry-modal";
import {
  Brain,
  Bot,
  Eye,
  Cpu,
  Zap,
  BarChart3,
  Shield,
  Building,
  Server,
  GraduationCap,
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
    icon: Brain,
    title: "Machine Learning (ML) Services",
    description:
      "Advanced machine learning solutions to automate processes and extract insights from your data",
    features: [
      "Predictive Analytics",
      "Classification Models",
      "Recommendation Systems",
      "Anomaly Detection",
    ],
  },
  {
    icon: Bot,
    title: "Natural Language Processing (NLP) Services",
    description:
      "Intelligent text processing and language understanding capabilities for your applications",
    features: [
      "Text Analysis",
      "Chatbots & Virtual Assistants",
      "Sentiment Analysis",
      "Language Translation",
    ],
  },
  {
    icon: Eye,
    title: "Computer Vision Services",
    description:
      "Advanced image and video analysis capabilities to automate visual tasks and extract insights",
    features: [
      "Object Detection",
      "Image Classification",
      "Facial Recognition",
      "Quality Inspection",
    ],
  },
  {
    icon: Cpu,
    title: "Generative AI Services",
    description:
      "Cutting-edge generative AI solutions to create content, code, and innovative applications",
    features: [
      "Content Generation",
      "Code Automation",
      "Creative Design",
      "Synthetic Data",
    ],
  },
  {
    icon: Zap,
    title: "AI Automation Services",
    description:
      "Intelligent automation solutions to streamline workflows and increase operational efficiency",
    features: [
      "Process Automation",
      "Intelligent Document Processing",
      "Workflow Optimization",
      "RPA Integration",
    ],
  },
  {
    icon: BarChart3,
    title: "Data & Analytics AI Services",
    description:
      "AI-powered analytics and insights to drive data-driven decision making across your organization",
    features: [
      "Predictive Analytics",
      "Business Intelligence",
      "Data Visualization",
      "Real-time Insights",
    ],
  },
  {
    icon: Shield,
    title: "AI in Cybersecurity",
    description:
      "Advanced AI-driven security solutions to protect your digital assets and detect threats",
    features: [
      "Threat Detection",
      "Behavioral Analysis",
      "Security Automation",
      "Risk Assessment",
    ],
  },
  {
    icon: Building,
    title: "Industry-Specific AI Solutions",
    description:
      "Tailored AI solutions designed for specific industries and business verticals",
    features: [
      "Healthcare AI",
      "Financial Services",
      "Manufacturing",
      "Retail & E-commerce",
    ],
  },
  {
    icon: Server,
    title: "AI Infrastructure & MLOps",
    description:
      "Robust AI infrastructure and MLOps practices to deploy and manage AI models at scale",
    features: [
      "Model Deployment",
      "Pipeline Automation",
      "Monitoring & Maintenance",
      "Scalable Infrastructure",
    ],
  },
  {
    icon: GraduationCap,
    title: "AI Training & Support",
    description:
      "Comprehensive training and ongoing support to help your team leverage AI technologies effectively",
    features: [
      "Team Training",
      "Best Practices",
      "Technical Support",
      "Knowledge Transfer",
    ],
  },
];

const benefits = [
  "Expert AI guidance from experienced industry professionals",
  "Customized AI solutions tailored to your specific business needs",
  "Reduced implementation risks through proven AI methodologies",
  "Faster AI deployment with structured project management",
  "Cost optimization through strategic AI planning and resource allocation",
  "Access to latest AI trends and emerging technologies",
  "Scalable AI infrastructure designed for growth",
  "Strategic alignment between AI initiatives and business objectives",
  "Ongoing AI support and knowledge transfer to your team",
  "Measurable AI results with clear KPIs and success metrics",
];

export default function AIServicesPage() {
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
            AI Services
            <br />
          </motion.h1>
          <motion.p
            className={`text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mt-7 ${playfair_display.className}`}
            variants={fadeInUp}
          >
            Harness the power of artificial intelligence to transform your
            business operations and drive innovation. Our comprehensive AI
            services help you leverage cutting-edge technology for competitive
            advantage.
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
              Our AI Services
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
                      <Badge variant="secondary" className="bg-[#0ea5e9] text-white ">AI Service</Badge>
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
          <motion.div className="text-center mb-12" variants={fadeInUp}>
            <h2
              className={`text-3xl md:text-4xl font-bold text-black mb-4 ${inter.className}`}
            >
              Why Choose Our AI Services?
            </h2>
            <p
              className={`text-lg text-gray-600 max-w-2xl mx-auto ${playfair_display.className}`}
            >
              Transform your business with intelligent solutions designed for
              the future
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
            Ready to Transform Your Business with AI?
          </h2>
          <p
            className={`text-lg text-gray-600 mb-8 ${playfair_display.className}`}
          >
            Let our AI experts help you harness the power of artificial
            intelligence to drive innovation and growth. Start your AI
            transformation today and unlock new possibilities for your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => setIsEnquiryModalOpen(true)}
              size="lg"
              className="hover:bg-[#0ea5e9] bg-white text-black border hover:text-white"
            >
              Start AI Project
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/about">Learn More About Us</Link>
            </Button>
          </div>
        </div>
      </motion.section>

      <EnquiryModal
        isOpen={isEnquiryModalOpen}
        onClose={() => setIsEnquiryModalOpen(false)}
        serviceName="AI Services"
      />
    </div>
  );
}
