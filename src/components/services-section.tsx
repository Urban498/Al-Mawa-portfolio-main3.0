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
import { useTranslations } from 'next-intl';

const inter = Inter({ subsets: ["latin"] });



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
  const t = useTranslations('servicesSection');

  // Define services with translation keys
  const services = [
    {
      id: "webDevelopment",
      icon: <Code className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-500",
      href: "/services/web-development",
    },
    {
      id: "itTechServices",
      icon: <Code className="w-8 h-8" />,
      color: "from-slate-500 to-gray-600",
      href: "/services/it-tech-services",
    },
    {
      id: "digitalMarketing",
      icon: <Megaphone className="w-8 h-8" />,
      color: "from-green-500 to-emerald-500",
      href: "/services/email-whatsapp-sms-marketing",
    },
    {
      id: "graphicDesign",
      icon: <Brush className="w-8 h-8" />,
      color: "from-purple-500 to-pink-500",
      href: "/services/branding-graphic-design",
    },
    {
      id: "aiServices",
      icon: <Brain className="w-8 h-8" />,
      color: "from-indigo-500 to-blue-600",
      href: "/services/consulting",
    },
  ];

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
            className={`text-3xl md:text-6xl font-bold pt-8 pb-8 text-left bg-clip-text text-transparent bg-black uppercase  ${inter.className}`}
          >
            {t('title')}
          </h2>
          <p
            className={`text-lg md:text-xl  max-w-3xl text-black italic ${inter.className}`}
          >
            &ldquo;{t('subtitle')}&rdquo;
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
                    {t(`${service.id}.title`)}
                  </CardTitle>
                  <CardDescription
                    className={`text-muted-foreground leading-relaxed uppercase ${inter.className}`}
                  >
                    {t(`${service.id}.description`)}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="space-y-3 mb-6">
                    {t.raw(`${service.id}.features`).map((feature: string, index: number) => (
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
                      <span>{t('learnMore')}</span>
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
