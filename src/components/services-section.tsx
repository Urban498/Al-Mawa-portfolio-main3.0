"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Code, Megaphone, Brush, Brain } from "lucide-react";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  color: string;
  href: string;
}

const services: Service[] = [
  {
    id: "Web Development",
    title: "Web Development",
    description:
      "Creating modern, responsive websites and web applications that drive business growth and user engagement.",
    icon: <Code className="w-8 h-8" />,
    features: ["Website Design", "E-commerce Development", "Web Hosting", "SEO Integration"],
    color: "from-blue-500 to-cyan-500",
    href: "/services/web-development",
  },
  {
    id: "IT & Tech Services",
    title: "IT & Tech Services",
    description:
      "Comprehensive IT solutions including infrastructure, cybersecurity, and managed services for your business.",
    icon: <Code className="w-8 h-8" />,
    features: [
      "Infrastructure Services",
      "Cybersecurity",
      "Managed IT",
      "Cloud Solutions",
    ],
    color: "from-slate-500 to-gray-600",
    href: "/services/it-tech-services",
  },
  {
    id: "Digital Marketing",
    title: "Digital Marketing",
    description:
      "Strategic digital marketing campaigns including email, WhatsApp, and SMS marketing to boost your reach.",
    icon: <Megaphone className="w-8 h-8" />,
    features: [
      "Email Marketing",
      "WhatsApp Marketing",
      "SMS Campaigns",
      "Analytics",
    ],
    color: "from-green-500 to-emerald-500",
    href: "/services/email-whatsapp-sms-marketing",
  },
  {
    id: "Graphic Design",
    title: "Graphic Design",
    description:
      "Professional branding and graphic design services to create compelling visual identities and marketing materials.",
    icon: <Brush className="w-8 h-8" />,
    features: [
      "Brand Identity",
      "Marketing Design",
      "Digital Graphics",
      "Print Design",
    ],
    color: "from-purple-500 to-pink-500",
    href: "/services/branding-graphic-design",
  },
  {
    id: "AI Services",
    title: "AI Services",
    description:
      "Cutting-edge artificial intelligence solutions including machine learning, automation, and data analytics to revolutionize your business.",
    icon: <Brain className="w-8 h-8" />,
    features: [
      "Machine Learning Solutions",
      "Computer Vision Services",
      "Generative AI Services",
      "AI Automation Services",
    ],
    color: "from-indigo-500 to-blue-600",
    href: "/services/consulting",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

export default function ServicesSection() {
  return (
    <section className="py-1 sm:py-1 md:py-2 lg:py-3 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-left mb-8 sm:mb-10 md:mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2
            className={`text-3xl md:text-5xl font-bold pt-8 pb-8 text-left bg-clip-text text-transparent bg-black uppercase  ${inter.className}`}
          >
            what we create
          </h2>
          <p
            className={`text-lg md:text-xl  max-w-3xl text-black uppercase ${inter.className}`}
          >
            &ldquo;Transforming businesses through technology, insight, and integrated solutions&rdquo;
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              whileHover={{
                y: -5,
                transition: { duration: 0.2 },
              }}
            >
              <Card className="h-full group hover:shadow-xl transition-all duration-300 border-border/50 hover:border-border bg-card/50 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.color} p-3 mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <div className="text-white w-full h-full flex items-center justify-center">
                      {service.icon}
                    </div>
                  </div>
                  <CardTitle
                    className={`text-xl font-semibold text-foreground group-hover:text-2xl transition-all duration-300 ease-in-out ${inter.className}`}
                  >
                    {service.title}
                  </CardTitle>
                  <CardDescription
                    className={`text-muted-foreground leading-relaxed uppercase ${inter.className}`}
                  >
                    {service.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="space-y-3 mb-6">
                    {service.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center text-sm text-muted-foreground"
                      >
                        <div
                          className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.color} mr-3 flex-shrink-0`}
                        />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <Link href={service.href}>
                    <Button size="lg" className="animated-border-button text-lg w-full no-animated-hover">
                      <span>Learn more</span>
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {/* <p className="text-muted-foreground mb-6">
            Ready to transform your business with our expertise?
          </p>
          <Button size="lg" className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-primary-foreground">
            Get Started Today
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button> */}
        </motion.div>
      </div>
    </section>
  );
}
