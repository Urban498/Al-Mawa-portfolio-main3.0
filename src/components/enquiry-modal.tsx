"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, User, Mail, Phone, MessageSquare, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { submitEnquiryForm } from "@/lib/formServices";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName?: string;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({ 
  isOpen, 
  onClose, 
  serviceName 
}) => {
  const t = useTranslations('enquiryForm');
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: serviceName || "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const services = [
    { key: "webDevelopment", label: t('services.webDevelopment') },
    { key: "itTechServices", label: t('services.itTechServices') },
    { key: "digitalMarketing", label: t('services.digitalMarketing') },
    { key: "graphicDesign", label: t('services.graphicDesign') },
    { key: "consultingServices", label: t('services.consultingServices') },
    { key: "other", label: t('services.other') }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log("📤 Submitting enquiry form:", formData);
      
      // Map form data to match the API schema
      const enquiryData = {
        fullName: formData.name,
        Email: formData.email,
        Number: parseInt(formData.phone, 10) || 0,
        ServiceIntrestedIn: formData.service,
        ProjectDetails: `${formData.message}${formData.company ? ` (Company: ${formData.company})` : ''}`
      };
      
      const result = await submitEnquiryForm(enquiryData);
      
      console.log("✅ Enquiry submitted successfully:", result);
      
      toast.success(t('toast.success'), {
        description: t('toast.successDescription'),
      });
      
      setIsSubmitted(true);

      // Reset form after 3 seconds and close modal
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          service: serviceName || "",
          message: ""
        });
        onClose();
      }, 3000);

    } catch (error: unknown) {
      console.error("❌ Enquiry submission error:", error);
      
      toast.error(t('toast.error'), {
        description: error instanceof Error ? error.message : t('toast.errorDescription'),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const modalVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8,
      y: 50
    },
    visible: { 
      opacity: 1,
      scale: 1,
      y: 0
    },
    exit: { 
      opacity: 0,
      scale: 0.8,
      y: 50
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div>
              <h2 className="text-2xl font-bold text-black">{t('title')}</h2>
              <p className="text-gray-600 text-sm mt-1">
                {t('subtitle')}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-black mb-2">
                  {t('thankYouTitle')}
                </h3>
                <p className="text-gray-600">
                  {t('thankYouMessage')}
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-black">
                    {t('fields.fullName.label')} *
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="name"
                      type="text"
                      placeholder={t('fields.fullName.placeholder')}
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-black">
                    {t('fields.email.label')} *
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder={t('fields.email.placeholder')}
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium text-black">
                    {t('fields.phone.label')}
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder={t('fields.phone.placeholder')}
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Company */}
                <div className="space-y-2">
                  <Label htmlFor="company" className="text-sm font-medium text-black">
                    {t('fields.company.label')}
                  </Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="company"
                      type="text"
                      placeholder={t('fields.company.placeholder')}
                      value={formData.company}
                      onChange={(e) => handleInputChange("company", e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Service */}
                <div className="space-y-2">
                  <Label htmlFor="service" className="text-sm font-medium text-black">
                    {t('fields.service.label')} *
                  </Label>
                  <Select
                    value={formData.service}
                    onValueChange={(value) => handleInputChange("service", value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t('fields.service.placeholder')} />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service.key} value={service.label}>
                          {service.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm font-medium text-black">
                    {t('fields.message.label')} *
                  </Label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Textarea
                      id="message"
                      placeholder={t('fields.message.placeholder')}
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      className="pl-10 min-h-[100px] resize-none"
                      required
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full animated-border-button"
                  size="lg"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      {t('buttons.submitting')}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      {t('buttons.submit')}
                    </div>
                  )}
                </Button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
