"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EnquiryModal } from "@/components/enquiry-modal";
import { 
  Palette, 
  Megaphone, 
  Share2, 
  Monitor,
  Building,
  Play,
  Brush,
  FileText,
  Package,
  TrendingUp,
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
    icon: Palette,
    title: "Brand Identity Design",
    description: "Complete brand identity systems including logos, color palettes, and brand guidelines",
    features: ["Logo Design", "Brand Guidelines", "Color Schemes", "Typography Selection"]
  },
  {
    icon: Megaphone,
    title: "Marketing & Promotional Design",
    description: "Eye-catching marketing materials that drive engagement and boost conversions",
    features: ["Flyers & Brochures", "Banners & Posters", "Advertisement Design", "Promotional Graphics"]
  },
  {
    icon: Share2,
    title: "Digital & Social Media Design",
    description: "Engaging digital graphics optimized for social media platforms and online presence",
    features: ["Social Media Posts", "Cover Images", "Digital Ads", "Web Graphics"]
  },
  {
    icon: Monitor,
    title: "UI/UX & Web Graphics",
    description: "User-friendly interface designs and web graphics that enhance user experience",
    features: ["Website Graphics", "UI Elements", "Icons & Illustrations", "User Interface Design"]
  },
  {
    icon: Building,
    title: "Corporate & Office Branding",
    description: "Professional corporate identity and office branding solutions for businesses",
    features: ["Business Cards", "Letterheads", "Office Signage", "Corporate Presentations"]
  },
  {
    icon: Play,
    title: "Motion Graphics & Multimedia Design",
    description: "Dynamic motion graphics and multimedia content for engaging visual storytelling",
    features: ["Animated Graphics", "Video Graphics", "GIF Creation", "Interactive Media"]
  },
  {
    icon: Brush,
    title: "Illustration & Creative Art",
    description: "Custom illustrations and creative artwork tailored to your brand and message",
    features: ["Custom Illustrations", "Digital Art", "Character Design", "Infographics"]
  },
  {
    icon: FileText,
    title: "Print & Publishing Design",
    description: "Professional print design services for books, magazines, and marketing materials",
    features: ["Book Design", "Magazine Layout", "Catalog Design", "Print Materials"]
  },
  {
    icon: Package,
    title: "Packaging & Product Branding",
    description: "Attractive packaging design and product branding that stands out on shelves",
    features: ["Product Packaging", "Label Design", "Brand Applications", "Product Graphics"]
  },
  {
    icon: TrendingUp,
    title: "Emerging Graphic Design Trends",
    description: "Cutting-edge design approaches using the latest trends and technologies",
    features: ["Modern Design Trends", "3D Graphics", "AR/VR Graphics", "Interactive Design"]
  },
  {
    icon: CheckCircle,
    title: "Benefits of Branding & Graphic Design Services",
    description: "Key advantages of professional branding and graphic design for business success",
    features: ["Brand Recognition", "Professional Image", "Marketing Effectiveness", "Customer Trust"]
  }
];

const benefits = [
  "Professional brand image that builds trust and credibility",
  "Consistent visual identity across all marketing materials",
  "Increased brand recognition and customer recall",
  "Higher engagement rates with visually appealing content",
  "Cost-effective design solutions for all business sizes",
  "Fast turnaround times without compromising quality",
  "Scalable designs that work across different platforms",
  "Expert guidance on design trends and best practices",
  "Custom solutions tailored to your specific needs",
  "Ongoing design support and revisions included"
];

const designStats = [
  {
    metric: "94%",
    description: "First impressions are design-related",
    icon: Palette
  },
  {
    metric: "3x",
    description: "More likely to share visual content",
    icon: Share2
  },
  {
    metric: "65%",
    description: "Of people are visual learners",
    icon: Monitor
  },
  {
    metric: "80%",
    description: "Brand recognition increase with color",
    icon: TrendingUp
  }
];

export default function GraphicDesignPage() {
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
            Graphic Design
            <br />
            
          </motion.h1>
          <motion.p
            className={`text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mt-6 ${playfair_display.className}`}
            variants={fadeInUp}
          >
            Transform your brand with stunning visual designs that captivate audiences and drive results. 
            From branding to digital graphics, we create designs that make an impact.
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
            <h2 className={`text-3xl md:text-4xl font-bold text-black mb-4 ${inter.className}`}>
              The Power of Visual Design
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {designStats.map((stat, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="text-center p-6 hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="pt-6">
                    <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
                      <stat.icon className="w-6 h-6 text-[#0ea5e9]" />
                    </div>
                    <h3 className={`text-3xl font-bold text-black mb-2 ${inter.className}`}>
                      {stat.metric}
                    </h3>
                    <p className={`text-gray-600 ${playfair_display.className}`}>
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
            <h2 className={`text-3xl md:text-4xl font-bold text-black mb-4 ${inter.className}`}>
              Our Graphic Design Services
            </h2>
            <p className={`text-lg text-gray-600 max-w-2xl mx-auto ${playfair_display.className}`}>
              Comprehensive design solutions for all your visual communication needs
            </p>
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
                      <Badge variant="secondary" className="bg-[#0ea5e9] text-white">Design</Badge>
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
              Benefits of Branding & Graphic Design Services
            </h2>
            <p className={`text-lg text-gray-600 max-w-2xl mx-auto ${playfair_display.className}`}>
              How professional design services can transform your business
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
            Ready to Transform Your Brand?
          </h2>
          <p className={`text-lg text-gray-600 mb-8 ${playfair_display.className}`}>
            Let our creative team bring your vision to life with stunning graphic designs that make an impact. 
            Start your design project today and see the difference professional design can make.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => setIsEnquiryModalOpen(true)}
              size="lg" 
              className="animated-border-button hover:text-white"
            >
              Start Design Project
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
        serviceName="Graphic Design"
      />
    </div>
  );
}
