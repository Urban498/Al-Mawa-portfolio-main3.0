'use client';

import React, { useState } from 'react';
import { 
  Code2, 
  Smartphone, 
  Brain, 
  Cloud, 
  Palette, 
  Briefcase,
  CheckCircle,
  ArrowRight,
  Zap,
  Users,
  Award,
  Target,
  GraduationCap
} from 'lucide-react';
import { ServiceCard } from '@/components/ServiceCard';
import { EnquiryModal } from '@/components/enquiry-modal';
import { useTranslations } from 'next-intl';

// Reusable Step Component
const StepCard: React.FC<{
  number: number;
  title: string;
  icon: React.ReactNode;
}> = ({ number, title, icon }) => (
  <div className="flex flex-col items-center text-center">
    {/* Circle with number */}
    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center mb-4 relative z-10">
      <span className="text-white font-bold text-xl">{number}</span>
    </div>

    {/* Icon */}
    <div className="text-4xl mb-3 text-blue-600">
      {icon}
    </div>

    {/* Title */}
    <h4 className="text-lg font-semibold text-gray-800">{title}</h4>
  </div>
);

export default function ITCoursesPage() {
  const [expandedProgram, setExpandedProgram] = useState<number | null>(null);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);

  const courses = [
    {
      title: 'Web Development',
      description:
        'Learn HTML, CSS, JavaScript, React, Next.js and backend development to build modern websites.',
      icon: Code2,
    },
    {
      title: 'Mobile App Development',
      description:
        'Build Android and cross-platform apps using Flutter or React Native.',
      icon: Smartphone,
    },
    {
      title: 'Artificial Intelligence',
      description:
        'Learn Python, Machine Learning, AI tools and automation.',
      icon: Brain,
    },
    {
      title: 'Cloud Computing',
      description:
        'Learn AWS, Azure, DevOps and cloud deployment.',
      icon: Cloud,
    },
    {
      title: 'UI/UX Design',
      description:
        'Learn Figma, design systems and user interface design.',
      icon: Palette,
    },
    {
      title: 'Software Development Internship',
      description:
        'Work on real projects with mentorship and gain real industry experience.',
      icon: Briefcase,
    },
  ];

  const programBenefits = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Real industry projects',
      description:
        'Work on live projects used by actual clients and learn real-world development practices.',
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Developer mentorship',
      description:
        'Get guided by experienced professionals who will help you overcome challenges.',
    },
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: 'Portfolio development',
      description:
        'Build impressive projects that showcase your skills to future employers.',
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Internship certificate',
      description:
        'Earn recognized certifications that validate your expertise and learning.',
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: 'Job preparation guidance',
      description:
        'Receive career coaching, interview preparation, and job placement assistance.',
    },
  ];

  const steps = [
    { number: 1, title: 'Enroll', icon: <GraduationCap className="w-8 h-8" /> },
    { number: 2, title: 'Learn', icon: <Code2 className="w-8 h-8" /> },
    { number: 3, title: 'Build Projects', icon: <Briefcase className="w-8 h-8" /> },
    {
      number: 4,
      title: 'Internship & Certification',
      icon: <Award className="w-8 h-8" />,
    },
  ];

  const handleApply = () => {
    // Open the enquiry modal
    setIsEnquiryModalOpen(true);
  };

  const handleLearnMore = (courseTitle: string) => {
    console.log(`Learn more clicked for: ${courseTitle}`);
  };

  return (
    <div className="bg-gradient-to-b from-background via-muted to-card min-h-screen mt-20">
      {/* Hero Section */}
      <section className="relative w-full py-20 md:py-30 bg-black/60 text-white overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-fade-in">
            IT Courses & Internship Program
          </h1>

          <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in-delay">
            Learn Web Development, Mobile Apps, Artificial Intelligence and Cloud
            Computing with real industry projects.
          </p>

          <button
            onClick={handleApply}
            className="inline-flex items-center gap-2 bg-white text-black font-semibold py-3 px-8 rounded-lg hover:bg-[#0ea5e9] hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Apply for Internship
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Explore Our Courses
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Choose from our comprehensive range of courses and start your learning
            journey today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <ServiceCard
              key={index}
              icon={course.icon}
              title={course.title}
              description={course.description}
              buttonLabel="Learn More"
              onClick={() => handleLearnMore(course.title)}
            />
          ))}
        </div>
      </section>

      {/* Internship Program Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Internship Program
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Transform your theoretical knowledge into practical experience with our
              comprehensive internship program.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programBenefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-[#0ea5e9]/10 to-[#0ea5e9]/5 rounded-lg p-8 border border-[#0ea5e9]/20 hover:border-[#0ea5e9] hover:shadow-lg transition-all duration-300"
              >
                <div className="text-[#0ea5e9] mb-4">{benefit.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Process Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Follow our proven process to become a skilled developer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-4">
            {steps.map((step) => (
              <StepCard key={step.number} {...step} />
            ))}
          </div>

          {/* Connection Line (visible on desktop) */}
          <div className="hidden lg:block absolute left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-blue-400 to-indigo-400 mt-8 top-1/2 transform -translate-y-1/2"></div>
        </div>
      </section>

      {/* Call To Action Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Start Your IT Career Today
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Join hundreds of students who have successfully transformed their
            careers through our courses and internship program.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setIsEnquiryModalOpen(true)}
              className="bg-white text-black font-semibold py-3 px-8 rounded-lg hover:bg-[#0ea5e9] hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Apply Now
            </button>
            <button className="border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105">
              View Courses
            </button>
          </div>
        </div>
      </section>

      {/* Footer spacing */}
      <div className="h-8" />

      <EnquiryModal
        isOpen={isEnquiryModalOpen}
        onClose={() => setIsEnquiryModalOpen(false)}
        serviceName="IT Courses & Internship Program"
      />
    </div>
  );
}
