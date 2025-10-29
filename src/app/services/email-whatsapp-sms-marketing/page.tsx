"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
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

const getServices = (t: (key: string) => string) => [
  {
    icon: Mail,
    title: t('services.email.title') as string,
    description: t('services.email.description') as string,
    features: [
      t('services.email.feature1') as string,
      t('services.email.feature2') as string,
      t('services.email.feature3') as string,
      t('services.email.feature4') as string,
    ],
  },
  {
    icon: MessageCircle,
    title: t('services.whatsapp.title') as string,
    description: t('services.whatsapp.description') as string,
    features: [
      t('services.whatsapp.feature1') as string,
      t('services.whatsapp.feature2') as string,
      t('services.whatsapp.feature3') as string,
      t('services.whatsapp.feature4') as string,
    ],
  },
  {
    icon: Smartphone,
    title: t('services.sms.title') as string,
    description: t('services.sms.description') as string,
    features: [
      t('services.sms.feature1') as string,
      t('services.sms.feature2') as string,
      t('services.sms.feature3') as string,
      t('services.sms.feature4') as string,
    ],
  },
  {
    icon: Network,
    title: t('services.omnichannel.title') as string,
    description: t('services.omnichannel.description') as string,
    features: [
      t('services.omnichannel.feature1') as string,
      t('services.omnichannel.feature2') as string,
      t('services.omnichannel.feature3') as string,
      t('services.omnichannel.feature4') as string,
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

const getMarketingStats = (t: (key: string) => string) => [
  {
    metric: t('stats.emailUsers.metric') as string,
    description: t('stats.emailUsers.description') as string,
    icon: Mail,
  },
  {
    metric: t('stats.whatsappUsers.metric') as string,
    description: t('stats.whatsappUsers.description') as string,
    icon: MessageCircle,
  },
  {
    metric: t('stats.smsOpenRate.metric') as string,
    description: t('stats.smsOpenRate.description') as string,
    icon: Smartphone,
  },
  {
    metric: t('stats.emailROI.metric') as string,
    description: t('stats.emailROI.description') as string,
    icon: TrendingUp,
  },
];

export default function DigitalMarketingPage() {
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const t = useTranslations('digitalMarketingPage');
  
  const services = getServices(t);
  const benefits = getBenefits(t);
  const marketingStats = getMarketingStats(t);

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
              {t('servicesTitle')}
            </h2>
            <p
              className={`text-lg text-gray-600 max-w-2xl mx-auto ${playfair_display.className}`}
            >
              {t('servicesSubtitle')}
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
              <span>{t('ctaButton')}</span>
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
