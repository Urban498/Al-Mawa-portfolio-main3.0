"use client";

export const dynamic = 'force-dynamic';

import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  MapPin,
  Clock,
  Heart,
  Award,
  ChevronRight,
  Building2,
  Briefcase,
} from "lucide-react";
// Shadcn UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Inter, Playfair_Display } from "next/font/google";
import { submitJobApplication } from "@/lib/formServices";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

// Job interface based on API schema
interface Job {
  _id?: string;
  jobTitle: string;
  jobDescription: string;
  jobkeySkills: string[];
  jobDepartment: string;
  jobType: string;
  jobSalary?: string; // Optional salary field
}
const inter = Inter({ subsets: ["latin"] });
const playfair_display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export default function CareersPage() {
  const t = useTranslations('careers');
  
  // Benefits data
  const benefits = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: t('benefits.items.innovative.title'),
      description: t('benefits.items.innovative.description'),
    },
    {
      icon: <span className="w-8 h-8 flex items-center justify-center text-2xl font-bold">₹</span>,
      title: t('benefits.items.growth.title'),
      description: t('benefits.items.growth.description'),
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: t('benefits.items.empowerment.title'),
      description: t('benefits.items.empowerment.description'),
    },
  ];

  // FAQ data
  const faqs = [
    {
      question: t('faq.items.interview.question'),
      answer: t('faq.items.interview.answer'),
    },
    {
      question: t('faq.items.remote.question'),
      answer: t('faq.items.remote.answer'),
    },
    {
      question: t('faq.items.benefits.question'),
      answer: t('faq.items.benefits.answer'),
    },
    {
      question: t('faq.items.careerGrowth.question'),
      answer: t('faq.items.careerGrowth.answer'),
    },
    {
      question: t('faq.items.culture.question'),
      answer: t('faq.items.culture.answer'),
    },
  ];
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isApplicationOpen, setIsApplicationOpen] = useState(false);
  const [expandedJobs, setExpandedJobs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    phoneNumber: "",
    yearOfExperience: "",
    monthsOfExperience: "",
    coverLetter: "",
    resume: null as File | null,
  });
  const [jobs, setJobs] = useState<Job[]>([]);
  const getData = async () => {
    try {
      const response = await axios.get("/api/jobs");
      console.log("📋 Jobs API Response:", response.data?.data);
      
      // Debug: Check if salary fields exist (development only)
      if (response.data?.data && process.env.NODE_ENV === 'development') {
        response.data.data.forEach((job: Job, index: number) => {
          if (job.jobSalary) {
            console.log(`💰 Job ${index + 1} (${job.jobTitle}) has salary:`, job.jobSalary);
          }
        });
      }
      
      setJobs(response.data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  // Add refresh functionality for development/debugging
  useEffect(() => {
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
      // @ts-expect-error - Adding to window for debugging
      window.refreshJobs = getData;
    }
  }, []);
  // Filter jobs based on search and filters
  const filteredJobs = jobs?.filter((job) => {
    const matchesSearch =
      job?.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job?.jobDescription?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment =
      selectedDepartment === "all" || job?.jobDepartment === selectedDepartment;

    return matchesSearch && matchesDepartment;
  });

  const departments = [
    "all",
    ...Array.from(new Set(jobs.map((job: Job) => job.jobDepartment))),
  ];

  const handleApplyNow = (job: Job) => {
    setSelectedJob(job);
    setIsApplicationOpen(true);
  };

  const toggleJobExpansion = (jobId: string) => {
    setExpandedJobs((prev) =>
      prev.includes(jobId)
        ? prev.filter((id) => id !== jobId)
        : [...prev, jobId]
    );
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      yearOfExperience: value,
    }));
  };

  const handleMonthsChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      monthsOfExperience: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({
      ...prev,
      resume: file,
    }));
  };

  const handleApplicationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("📤 Submitting job application:", formData);

      // Create FormData for file upload
      const submitFormData = new FormData();
      submitFormData.append("firstName", formData.firstName);
      submitFormData.append("lastName", formData.lastName);
      submitFormData.append("emailAddress", formData.emailAddress);
      submitFormData.append("phoneNumber", formData.phoneNumber);
      submitFormData.append("yearOfExperience", formData.yearOfExperience);
      submitFormData.append("monthsOfExperience", formData.monthsOfExperience || "0");
      submitFormData.append("coverLetter", formData.coverLetter);

      if (formData.resume) {
        submitFormData.append("resume", formData.resume);
      }

      const result = await submitJobApplication(submitFormData);

      console.log("✅ Job application submitted successfully:", result);

      toast.success(t('applicationForm.toast.success'), {
        description: t('applicationForm.toast.successDescription', { jobTitle: selectedJob?.jobTitle || '' }),
      });

      // Reset form and close dialog
      setFormData({
        firstName: "",
        lastName: "",
        emailAddress: "",
        phoneNumber: "",
        yearOfExperience: "",
        coverLetter: "",
        resume: null,
      });
      setIsApplicationOpen(false);
      setSelectedJob(null);
    } catch (error: unknown) {
      console.error("❌ Job application error:", error);

      toast.error(t('applicationForm.toast.error'), {
        description:
          error instanceof Error
            ? error.message
            : t('applicationForm.toast.errorDescription'),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted to-card">
      {/* SEO H1 Tag */}
      <h1 className="sr-only">
        {t('pageTitle')}
      </h1>
      {/* Hero Section */}
      <section className="relative py-12 px-4 overflow-hidden">
        {/* Background Effects */}
        {/* <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"
            animate={{ 
              x: [0, 100, 0],
              y: [0, -50, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-emerald-400/10 to-cyan-400/10 rounded-full blur-3xl"
            animate={{ 
              x: [0, -80, 0],
              y: [0, 60, 0],
              scale: [1, 0.9, 1]
            }}
            transition={{ 
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div> */}

        {/* <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500">
              Join Our Team
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
              Build the future with us. We&apos;re looking for passionate individuals who want to make a difference 
              and grow their careers in a collaborative, innovative environment.
            </p>
            
          </motion.div>
        </div> */}
      </section>

      {/* Job Listings Section */}
      <section id="job-listings" className="py-16 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2
              className={`text-2xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-black uppercase ${inter.className} `}
            >
              {t('openPositions.title')}
            </h2>
            <p
              className={`text-lg max-w-4xl mx-auto text-black ${playfair_display.className}`}
            >
              {t('openPositions.subtitle')}
            </p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8 space-y-4 md:space-y-0 md:flex md:gap-4 max-w-4xl mx-auto"
          >
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black h-4 w-4" />
              <Input
                placeholder={t('search.placeholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-background/50 border-border text-black placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20"
              />
            </div>
            <Select
              value={selectedDepartment}
              onValueChange={setSelectedDepartment}
            >
              <SelectTrigger className="w-full md:w-48 bg-background/50 border-border text-black">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent className="bg-background border-border text-black">
                {departments.map((dept) => (
                  <SelectItem
                    key={dept}
                    value={dept}
                    className="text-black hover:bg-muted"
                  >
                    {dept === "all" ? t('search.allDepartments') : dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="w-full md:w-48 flex items-center justify-center bg-background/50 border border-border rounded-md px-3 py-2">
              <MapPin className="w-4 h-4 text-[#0ea5e9] mr-2" />
              <span className="text-black font-medium">{t('search.location')}</span>
            </div>
          </motion.div>

          {/* Job Cards */}
          <div className="grid gap-6 max-w-5xl mx-auto">
            {filteredJobs.map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="border border-border/50 bg-card/40 backdrop-blur-xl hover:bg-card/60 transition-all duration-300 group">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex-1">
                        <CardTitle
                          className={`text-xl font-bold text-black transition-colors uppercase ${inter.className}`}
                        >
                          {job.jobTitle}
                        </CardTitle>
                        <CardDescription className={`text-black mt-2 `}>
                          <div
                            className="cursor-pointer hover:text-black transition-colors"
                            onClick={() =>
                              toggleJobExpansion(job._id || index.toString())
                            }
                          >
                            {job.jobDescription}
                            <span className="text-black ml-2 text-sm font-medium underline">
                              {expandedJobs.includes(
                                job._id || index.toString()
                              )
                                ? t('jobCard.showLess')
                                : t('jobCard.showMore')}
                            </span>
                          </div>

                          <AnimatePresence mode="wait">
                            {expandedJobs.includes(
                              job._id || index.toString()
                            ) && (
                              <motion.div
                                key={`job-details-${job._id || index}`}
                                initial={{
                                  opacity: 0,
                                  height: 0,
                                  marginTop: 0,
                                }}
                                animate={{
                                  opacity: 1,
                                  height: "auto",
                                  marginTop: 16,
                                }}
                                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                transition={{
                                  duration: 0.4,
                                  ease: "easeInOut",
                                  height: { duration: 0.4 },
                                  opacity: { duration: 0.3 },
                                }}
                                className="space-y-3 overflow-hidden"
                              >
                                <div>
                                  <h4 className="font-semibold text-foreground mb-2">
                                    {t('jobCard.keyRequirements')}
                                  </h4>
                                  <ul className="list-disc list-inside space-y-1 text-sm">
                                    {job.jobkeySkills.map((req, index) => (
                                      <li
                                        key={index}
                                        className="text-muted-foreground"
                                      >
                                        {req}
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                <div>
                                  <h4 className="font-semibold text-foreground mb-2">
                                    {t('jobCard.jobDetails')}
                                  </h4>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                                    <div className="flex items-center gap-2">
                                      <Building2 className="w-4 h-4 text-primary" />
                                      <span className="text-muted-foreground">
                                        {t('jobCard.department')}:{" "}
                                        {job.jobDepartment || t('jobCard.notSpecified')}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <MapPin className="w-4 h-4 text-primary" />
                                      <span className="text-muted-foreground">
                                        {t('jobCard.location')}: {t('search.location')}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Briefcase className="w-4 h-4 text-primary" />
                                      <span className="text-muted-foreground">
                                        {t('jobCard.type')}: {job.jobType || "Full-time"}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <span className="w-4 h-4 text-primary flex items-center justify-center font-bold">₹</span>
                                      <span className="text-muted-foreground">
                                        {t('jobCard.salary')}: {(() => {
                                          const hasSalary = job.jobSalary && job.jobSalary.trim() !== '';
                                          return hasSalary ? job.jobSalary : t('jobCard.competitive');
                                        })()}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </CardDescription>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Badge
                          variant="secondary"
                          className="bg-muted text-muted-foreground"
                        >
                          <Building2 className="w-3 h-3 mr-1" />
                          {job.jobDepartment}
                        </Badge>
                        <Badge
                          variant="secondary"
                          className="bg-muted text-muted-foreground"
                        >
                          <MapPin className="w-3 h-3 mr-1" />
                          Pune, India
                        </Badge>
                        <Badge
                          variant="secondary"
                          className="bg-muted text-muted-foreground"
                        >
                          <Briefcase className="w-3 h-3 mr-1" />
                          {job.jobType}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <span className="w-4 h-4 flex items-center justify-center font-bold">₹</span>
                          {(() => {
                            // Check for actual salary value (not empty string or null)
                            const hasSalary = job.jobSalary && job.jobSalary.trim() !== '';
                            return hasSalary ? job.jobSalary : t('jobCard.competitive');
                          })()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {t('jobCard.recentlyPosted')}
                        </span>
                      </div>
                      <Button
                        onClick={() => handleApplyNow(job)}
                        className="hover:bg-[#0ea5e9] bg-white border-2 transition-all duration-300 cursor-pointer border-[#0ea5e9] hover:text-[white] text-black "
                      >
                        {t('jobCard.applyNow')}
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-muted-foreground text-lg">
                {t('noJobs')}
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Perks & Benefits Section */}
      <section className="py-16 px-4 bg-muted/20">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2
              className={`text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-black uppercase ${inter.className}`}
            >
              {t('benefits.title')}
            </h2>
            <p
              className={`text-black text-lg max-w-2xl mx-auto ${playfair_display.className}`}
            >
              {t('benefits.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <Card className="border border-border/50 bg-card/40 backdrop-blur-xl hover:bg-card/60 transition-all duration-300 h-full group">
                  <CardContent className="p-6 text-center">
                    <motion.div
                      className="inline-flex p-4 rounded-xl bg-[#0ea5e9] text-white mb-4 group-hover:scale-110 transition-transform duration-300"
                      whileHover={{ rotate: 5 }}
                    >
                      {benefit.icon}
                    </motion.div>
                    <h3
                      className={`font-bold text-lg text-black transition-colors mb-2 uppercase ${inter.className}`}
                    >
                      {benefit.title}
                    </h3>
                    <p className="text-black text-sm leading-relaxed">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2
              className={`text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-black uppercase ${inter.className}`}
            >
              {t('faq.title')}
            </h2>
            <p
              className={`text-black text-xl max-w-2xl mx-auto ${playfair_display.className}`}
            >
              {t('faq.subtitle')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border border-border/50 bg-card/40 backdrop-blur-xl rounded-lg px-6 "
                >
                  <AccordionTrigger className="text-black transition-colors  text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-black leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* Job Application Modal */}
      <Dialog open={isApplicationOpen} onOpenChange={setIsApplicationOpen}>
        <DialogContent className="bg-background border-border text-foreground max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle
              className={`text-2xl font-bold text-black ${inter.className} uppercase`}
            >
              {t('applicationForm.title')} {selectedJob?.jobTitle}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              {t('applicationForm.subtitle')}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleApplicationSubmit} className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName" className="text-foreground mb-2">
                  {t('applicationForm.fields.firstName')}
                </Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="bg-background/50 border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20"
                />
              </div>
              <div>
                <Label htmlFor="lastName" className="text-foreground mb-2">
                  {t('applicationForm.fields.lastName')}
                </Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="bg-background/50 border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email" className="text-foreground mb-2">
                {t('applicationForm.fields.email')}
              </Label>
              <Input
                id="email"
                name="emailAddress"
                type="email"
                value={formData.emailAddress}
                onChange={handleInputChange}
                required
                className="bg-background/50 border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20"
              />
            </div>

            <div>
              <Label htmlFor="phone" className="text-foreground mb-2">
                {t('applicationForm.fields.phone')}
              </Label>
              <Input
                id="phone"
                name="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="bg-background/50 border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20"
              />
            </div>

            <div>
              <Label htmlFor="experience" className="text-foreground mb-2">
                {t('applicationForm.fields.experience')}
              </Label>
              <div className="flex gap-3 items-center">
                <div className="w-36">
                  <Select
                    value={formData.yearOfExperience}
                    onValueChange={handleSelectChange}
                  >
                    <SelectTrigger className="w-full bg-background/50 border-border text-foreground">
                      <SelectValue placeholder={t('applicationForm.fields.experiencePlaceholder')} />
                    </SelectTrigger>
                    <SelectContent className="bg-background border-border text-foreground">
                      <SelectItem value="0">0</SelectItem>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="6">6</SelectItem>
                      <SelectItem value="7">7</SelectItem>
                      <SelectItem value="8">8</SelectItem>
                      <SelectItem value="9">9</SelectItem>
                      <SelectItem value="10">10+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-36">
                  
                  <Select
                    value={formData.monthsOfExperience}
                    onValueChange={handleMonthsChange}
                  >
                    <SelectTrigger className="w-full bg-background/50 border-border text-foreground">
                      <SelectValue placeholder={t('applicationForm.fields.monthsPlaceholder') || 'Months'} />
                    </SelectTrigger>
                    <SelectContent className="bg-background border-border text-foreground">
                      {Array.from({ length: 12 }).map((_, idx) => (
                        <SelectItem key={idx} value={String(idx)}>{idx} m</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="coverLetter" className="text-foreground mb-2">
                {t('applicationForm.fields.coverLetter')}
              </Label>
              <Textarea
                id="coverLetter"
                name="coverLetter"
                rows={6}
                placeholder={t('applicationForm.fields.coverLetterPlaceholder')}
                value={formData.coverLetter}
                onChange={handleInputChange}
                required
                className="bg-background/50 border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20 resize-none"
              />
            </div>

            <div>
              <Label htmlFor="resume" className="text-foreground mb-2">
                {t('applicationForm.fields.resume')}
              </Label>
              <Input
                id="resume"
                name="resume"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                required
                className="bg-background/50 border-border text-foreground file:bg-gray-200 cursor-pointer file:text-blue-400 file:border-0 file:rounded-md file:px-3 file:py-1 file:mr-3"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsApplicationOpen(false)}
                className="flex-1 border-border text-black "
              >
                {t('applicationForm.buttons.cancel')}
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 bg-black text-white hover:bg-black/50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? t('applicationForm.buttons.submitting') : t('applicationForm.buttons.submit')}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
