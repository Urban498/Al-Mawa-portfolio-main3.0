"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EnquiryModal } from "@/components/enquiry-modal";
import { 
  Code, 
  Globe, 
  ShoppingCart, 
  Server, 
  Search,
  Shield,
  Wrench,
  Zap,
  CheckCircle
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
    icon: Globe,
    title: "Website Designing & Development Services",
    description: "Complete end-to-end website solutions from concept to deployment with modern design principles",
    features: ["Custom Design", "Responsive Layout", "Modern UI/UX", "Cross-browser Compatible"]
  },
  {
    icon: Code,
    title: "Website Design Services",
    description: "Creative and user-focused website designs that convert visitors into customers",
    features: ["Visual Design", "User Experience", "Brand Integration", "Mobile-first Design"]
  },
  {
    icon: Server,
    title: "Website Development Services",
    description: "Robust backend development and frontend implementation for scalable websites",
    features: ["Frontend Development", "Backend Systems", "Database Integration", "API Development"]
  },
  {
    icon: ShoppingCart,
    title: "E-commerce Development",
    description: "Full-featured online stores with secure payment processing and inventory management",
    features: ["Shopping Cart", "Payment Gateway", "Inventory Management", "Order Processing"]
  },
  {
    icon: Server,
    title: "Web Hosting & Domain Services",
    description: "Reliable hosting solutions and domain management for optimal website performance",
    features: ["Domain Registration", "SSL Certificates", "Cloud Hosting", "24/7 Support"]
  },
  {
    icon: Search,
    title: "SEO & Digital Marketing Integration",
    description: "Built-in SEO optimization and marketing tools to boost your online presence",
    features: ["On-page SEO", "Analytics Setup", "Social Integration", "Performance Tracking"]
  },
  {
    icon: Shield,
    title: "Performance & Security Optimization",
    description: "Advanced security measures and performance optimization for fast, secure websites",
    features: ["Security Audits", "Speed Optimization", "SSL Implementation", "Backup Solutions"]
  },
  {
    icon: Wrench,
    title: "Website Maintenance & Support",
    description: "Ongoing maintenance and technical support to keep your website running smoothly",
    features: ["Regular Updates", "Bug Fixes", "Content Updates", "Technical Support"]
  },
  {
    icon: Zap,
    title: "Emerging Web Technologies",
    description: "Cutting-edge web technologies and frameworks for future-ready websites",
    features: ["Progressive Web Apps", "AI Integration", "Modern Frameworks", "Cloud Solutions"]
  },
  {
    icon: CheckCircle,
    title: "Benefits of Website Design & Development Services",
    description: "Comprehensive advantages of professional website design and development for your business",
    features: ["Increased Online Presence", "Better User Engagement", "Higher Conversion Rates", "Professional Credibility"]
  }
];

const benefits = [
  "Professional web presence that builds trust and credibility",
  "Responsive design that works perfectly on all devices",
  "SEO-optimized structure for better search engine rankings",
  "Fast loading times and optimal performance",
  "Secure and reliable hosting with regular backups",
  "Ongoing support and maintenance included",
  "Scalable solutions that grow with your business",
  "Integration with modern marketing tools and analytics"
];

export default function WebDevelopmentPage() {
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
            Web Development
            <br />
            {/* <span className="text-2xl md:text-3xl lg:text-4xl">Services</span> */}
          </motion.h1>
          <motion.p
            className={`text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mt-7 ${playfair_display.className}`}
            variants={fadeInUp}
          >
            Transform your digital presence with our comprehensive web development services. 
            From stunning designs to powerful functionality, we create websites that drive results.
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
            <h2 className={`text-3xl md:text-4xl font-bold text-black mb-4 ${inter.className}`}>
              Our Web Development Services
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
                      <Badge variant="secondary" className="bg-[#0ea5e9] text-white">Service</Badge>
                    </div>
                    <CardTitle className={`text-xl font-semibold text-black ${inter.className}`}>
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <p className={`text-gray-600 mb-4 ${playfair_display.className}`}>
                      {service.description}
                    </p>
                    <div className="space-y-2 mb-6 flex-1">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Button 
                      onClick={() => setIsEnquiryModalOpen(true)}
                      className="w-full animated-border-button mt-auto hover:text-white"
                      size="sm"
                    >
                      Enquire
                    </Button>
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
            <h2 className={`text-3xl md:text-4xl font-bold text-black mb-4 ${inter.className}`}>
              Benefits of Our Web Development Services
            </h2>
            <p className={`text-lg text-gray-600 max-w-2xl mx-auto ${playfair_display.className}`}>
              Why choose our web development solutions for your business
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
          <h2 className={`text-3xl md:text-4xl font-bold text-black mb-6 ${inter.className}`}>
            Ready to Build Your Website?
          </h2>
          <p className={`text-lg text-gray-600 mb-8 ${playfair_display.className}`}>
            Let&apos;s create a powerful web presence that drives your business forward. 
            Get in touch with our web development experts today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => setIsEnquiryModalOpen(true)}
              size="lg" 
              className="animated-border-button hover:text-white"
            >
              Get Started Today
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/about">
                Learn More About Us
              </Link>
            </Button>
          </div>
        </div>
      </motion.section>

      {/* Enquiry Modal */}
      <EnquiryModal
        isOpen={isEnquiryModalOpen}
        onClose={() => setIsEnquiryModalOpen(false)}
        serviceName="Web Development"
      />
    </div>
  );
}
