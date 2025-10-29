"use client";

import React from "react";
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { 
  Palette, 
  Code, 
  Megaphone,
  ArrowRight
} from "lucide-react";
import {Inter} from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  color: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getServices = (t: any): Service[] => [
  {
    id: "uiux",
    title: t('uiux.title') as string,
    description: t('uiux.description') as string,
    icon: <Palette className="w-8 h-8" />,
    features: t.raw('uiux.features') as string[],
    color: "from-purple-500 to-pink-500"
  },
  {
    id: "development",
    title: t('development.title') as string,
    description: t('development.description') as string,
    icon: <Code className="w-8 h-8" />,
    features: t.raw('development.features') as string[],
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: "marketing",
    title: t('marketing.title') as string,
    description: t('marketing.description') as string,
    icon: <Megaphone className="w-8 h-8" />,
    features: t.raw('marketing.features') as string[],
    color: "from-green-500 to-emerald-500"
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    scale: 0.9
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as const
    }
  }
};

export default function ServicesPage() {
  const t = useTranslations('servicesPage');
  const services = getServices(t);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted to-card bg-white">
      <div className="container mx-auto px-4 py-16 bg-white">
        {/* Page Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className={`text-4xl md:text-6xl font-bold pb-4 bg-clip-text text-transparent bg-black uppercase ${inter.className}`}>
            {t('title')}
          </h1>
          <p className={`text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto uppercase ${inter.className}`}>
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16 "
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              whileHover={{ 
                y: -5,
                transition: { duration: 0.2 }
              }}
            >
              <Card className="h-full group hover:shadow-xl transition-all duration-300 border-border/50 hover:border-border bg-card/50 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.color} p-3 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <div className="text-white w-full h-full flex items-center justify-center">
                      {service.icon}
                    </div>
                  </div>
                  <CardTitle className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="space-y-3 mb-6">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-sm text-muted-foreground">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.color} mr-3 flex-shrink-0`} />
                        {feature}
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    size="sm"
                    className="animated-border-button w-full cursor-pointer hover:text-white"
                  >
                   {t('learnMore')}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-muted-foreground mb-6 text-lg">
            {t('ctaText')}
          </p>
          <Button size="lg" className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-primary-foreground">
            {t('ctaButton')}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
