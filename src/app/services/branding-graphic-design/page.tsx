"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
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

const getServices = (t: (key: string) => string) => [
  {
    icon: Palette,
    title: t('services.brandIdentity.title') as string,
    description: t('services.brandIdentity.description') as string,
    features: [
      t('services.brandIdentity.feature1') as string,
      t('services.brandIdentity.feature2') as string,
      t('services.brandIdentity.feature3') as string,
      t('services.brandIdentity.feature4') as string,
    ],
  },
  {
    icon: Megaphone,
    title: t('services.marketing.title') as string,
    description: t('services.marketing.description') as string,
    features: [
      t('services.marketing.feature1') as string,
      t('services.marketing.feature2') as string,
      t('services.marketing.feature3') as string,
      t('services.marketing.feature4') as string,
    ],
  },
  {
    icon: Share2,
    title: t('services.digitalSocial.title') as string,
    description: t('services.digitalSocial.description') as string,
    features: [
      t('services.digitalSocial.feature1') as string,
      t('services.digitalSocial.feature2') as string,
      t('services.digitalSocial.feature3') as string,
      t('services.digitalSocial.feature4') as string,
    ],
  },
  {
    icon: Monitor,
    title: t('services.uiux.title') as string,
    description: t('services.uiux.description') as string,
    features: [
      t('services.uiux.feature1') as string,
      t('services.uiux.feature2') as string,
      t('services.uiux.feature3') as string,
      t('services.uiux.feature4') as string,
    ],
  },
  {
    icon: Building,
    title: t('services.corporate.title') as string,
    description: t('services.corporate.description') as string,
    features: [
      t('services.corporate.feature1') as string,
      t('services.corporate.feature2') as string,
      t('services.corporate.feature3') as string,
      t('services.corporate.feature4') as string,
    ],
  },
  {
    icon: Play,
    title: t('services.motion.title') as string,
    description: t('services.motion.description') as string,
    features: [
      t('services.motion.feature1') as string,
      t('services.motion.feature2') as string,
      t('services.motion.feature3') as string,
      t('services.motion.feature4') as string,
    ],
  },
  {
    icon: Brush,
    title: t('services.illustration.title') as string,
    description: t('services.illustration.description') as string,
    features: [
      t('services.illustration.feature1') as string,
      t('services.illustration.feature2') as string,
      t('services.illustration.feature3') as string,
      t('services.illustration.feature4') as string,
    ],
  },
  {
    icon: FileText,
    title: t('services.print.title') as string,
    description: t('services.print.description') as string,
    features: [
      t('services.print.feature1') as string,
      t('services.print.feature2') as string,
      t('services.print.feature3') as string,
      t('services.print.feature4') as string,
    ],
  },
  {
    icon: Package,
    title: t('services.packaging.title') as string,
    description: t('services.packaging.description') as string,
    features: [
      t('services.packaging.feature1') as string,
      t('services.packaging.feature2') as string,
      t('services.packaging.feature3') as string,
      t('services.packaging.feature4') as string,
    ],
  },
  {
    icon: TrendingUp,
    title: t('services.emerging.title') as string,
    description: t('services.emerging.description') as string,
    features: [
      t('services.emerging.feature1') as string,
      t('services.emerging.feature2') as string,
      t('services.emerging.feature3') as string,
      t('services.emerging.feature4') as string,
    ],
  },
  {
    icon: CheckCircle,
    title: t('services.benefits.title') as string,
    description: t('services.benefits.description') as string,
    features: [
      t('services.benefits.feature1') as string,
      t('services.benefits.feature2') as string,
      t('services.benefits.feature3') as string,
      t('services.benefits.feature4') as string,
    ],
  },
];

const getBenefits = (t: (key: string) => string) => [
  t('benefit1') as string,
  t('benefit2') as string,
  t('benefit3') as string,
  t('benefit4') as string,
  t('benefit5') as string,
  t('benefit6') as string,
  t('benefit7') as string,
  t('benefit8') as string,
  t('benefit9') as string,
  t('benefit10') as string,
];

const getDesignStats = (t: (key: string) => string) => [
  {
    metric: t('stats.firstImpressions.metric') as string,
    description: t('stats.firstImpressions.description') as string,
    icon: Palette,
  },
  {
    metric: t('stats.visualContent.metric') as string,
    description: t('stats.visualContent.description') as string,
    icon: Share2,
  },
  {
    metric: t('stats.visualLearners.metric') as string,
    description: t('stats.visualLearners.description') as string,
    icon: Monitor,
  },
  {
    metric: t('stats.brandRecognition.metric') as string,
    description: t('stats.brandRecognition.description') as string,
    icon: TrendingUp,
  },
];

export default function GraphicDesignPage() {
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const t = useTranslations('graphicDesignPage');
  
  const services = getServices(t);
  const benefits = getBenefits(t);
  const designStats = getDesignStats(t);

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
            {t('title')}
            <br />
          </motion.h1>
          <motion.p
            className={`text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mt-6 ${playfair_display.className}`}
            variants={fadeInUp}
          >
            {t('subtitle')}
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
              {t('statsTitle')}
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
              {t('servicesTitle')}
            </h2>
            <p
              className={`text-lg text-gray-600 max-w-2xl mx-auto ${playfair_display.className}`}
            >
              {t('servicesSubtitle')}
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
                      <Badge
                        variant="secondary"
                        className="bg-[#0ea5e9] text-white"
                      >
                        {t('serviceBadge')}
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
                        {t('enquireButton')}
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
              {t('benefitsTitle')}
            </h2>
            <p
              className={`text-lg text-gray-600 max-w-2xl mx-auto ${playfair_display.className}`}
            >
              {t('benefitsSubtitle')}
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
            {t('ctaTitle')}
          </h2>
          <p
            className={`text-lg text-gray-600 mb-8 ${playfair_display.className}`}
          >
            {t('ctaSubtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => setIsEnquiryModalOpen(true)}
              size="lg"
              className="hover:bg-[#0ea5e9] bg-white text-black border hover:text-white"
            >
              {t('ctaButton')}
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/about">{t('learnMoreButton')}</Link>
            </Button>
          </div>
        </div>
      </motion.section>

      {/* Enquiry Modal */}
      <EnquiryModal
        isOpen={isEnquiryModalOpen}
        onClose={() => setIsEnquiryModalOpen(false)}
        serviceName={t('title')}
      />
    </div>
  );
}
