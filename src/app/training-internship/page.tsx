import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, GraduationCap, Briefcase, Code, Users, Award, Clock, Target } from 'lucide-react';

export default function TrainingInternshipPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Training & <span className="text-[#0ea5e9]">Internship</span> Programs
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Kickstart your career with comprehensive training programs and hands-on internship opportunities at Al-Mawa
          </p>
          <Button size="lg" className="bg-[#0ea5e9] hover:bg-[#0284c7] text-white px-8">
            Apply Now
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Programs Overview */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Our Programs
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 rounded-lg border border-gray-200 hover:border-[#0ea5e9]/50 transition-colors">
              <GraduationCap className="w-12 h-12 text-[#0ea5e9] mb-4" />
              <h3 className="text-2xl font-semibold mb-3">Training Programs</h3>
              <p className="text-gray-600 mb-4">
                Intensive skill development programs designed to make you industry-ready
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• 3-6 month duration</li>
                <li>• Expert-led sessions</li>
                <li>• Real-world projects</li>
                <li>• Certification provided</li>
              </ul>
            </div>
            <div className="p-6 rounded-lg border border-gray-200 hover:border-[#0ea5e9]/50 transition-colors">
              <Briefcase className="w-12 h-12 text-[#0ea5e9] mb-4" />
              <h3 className="text-2xl font-semibold mb-3">Internship Programs</h3>
              <p className="text-gray-600 mb-4">
                Hands-on work experience with real projects and mentorship
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• 2-6 month duration</li>
                <li>• Stipend provided</li>
                <li>• Live project experience</li>
                <li>• Job placement assistance</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Training Courses */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Training Courses
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Code className="w-8 h-8 text-[#0ea5e9] mb-3" />
              <h3 className="font-semibold mb-2">Web Development</h3>
              <p className="text-sm text-gray-600 mb-3">
                Full-stack web development with modern frameworks
              </p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#0ea5e9] font-semibold">3 Months</span>
                <span className="text-gray-600">Beginner to Advanced</span>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Target className="w-8 h-8 text-[#0ea5e9] mb-3" />
              <h3 className="font-semibold mb-2">Digital Marketing</h3>
              <p className="text-sm text-gray-600 mb-3">
                Complete digital marketing and SEO strategies
              </p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#0ea5e9] font-semibold">2 Months</span>
                <span className="text-gray-600">All Levels</span>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Users className="w-8 h-8 text-[#0ea5e9] mb-3" />
              <h3 className="font-semibold mb-2">UI/UX Design</h3>
              <p className="text-sm text-gray-600 mb-3">
                User interface and experience design principles
              </p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#0ea5e9] font-semibold">2 Months</span>
                <span className="text-gray-600">Beginner Friendly</span>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Award className="w-8 h-8 text-[#0ea5e9] mb-3" />
              <h3 className="font-semibold mb-2">IT Support</h3>
              <p className="text-sm text-gray-600 mb-3">
                IT infrastructure and technical support training
              </p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#0ea5e9] font-semibold">1 Month</span>
                <span className="text-gray-600">Basic to Intermediate</span>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Clock className="w-8 h-8 text-[#0ea5e9] mb-3" />
              <h3 className="font-semibold mb-2">Project Management</h3>
              <p className="text-sm text-gray-600 mb-3">
                Agile and traditional project management methodologies
              </p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#0ea5e9] font-semibold">1.5 Months</span>
                <span className="text-gray-600">Intermediate</span>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Code className="w-8 h-8 text-[#0ea5e9] mb-3" />
              <h3 className="font-semibold mb-2">Mobile Development</h3>
              <p className="text-sm text-gray-600 mb-3">
                iOS and Android app development basics
              </p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#0ea5e9] font-semibold">4 Months</span>
                <span className="text-gray-600">Intermediate</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Internship Areas */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Internship Opportunities
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 rounded-lg border border-gray-200 hover:border-[#0ea5e9]/50 transition-colors">
              <Code className="w-10 h-10 text-[#0ea5e9] mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Development</h3>
              <p className="text-sm text-gray-600">
                Work on real development projects
              </p>
            </div>
            <div className="text-center p-6 rounded-lg border border-gray-200 hover:border-[#0ea5e9]/50 transition-colors">
              <Target className="w-10 h-10 text-[#0ea5e9] mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Marketing</h3>
              <p className="text-sm text-gray-600">
                Digital marketing campaigns and strategies
              </p>
            </div>
            <div className="text-center p-6 rounded-lg border border-gray-200 hover:border-[#0ea5e9]/50 transition-colors">
              <Users className="w-10 h-10 text-[#0ea5e9] mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Design</h3>
              <p className="text-sm text-gray-600">
                Creative design and branding projects
              </p>
            </div>
            <div className="text-center p-6 rounded-lg border border-gray-200 hover:border-[#0ea5e9]/50 transition-colors">
              <Award className="w-10 h-10 text-[#0ea5e9] mx-auto mb-3" />
              <h3 className="font-semibold mb-2">IT Support</h3>
              <p className="text-sm text-gray-600">
                Technical support and infrastructure
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose Al-Mawa?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Users className="w-8 h-8 text-[#0ea5e9] mb-3" />
              <h3 className="font-semibold mb-2">Expert Mentors</h3>
              <p className="text-sm text-gray-600">
                Learn from industry experts with years of experience
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Target className="w-8 h-8 text-[#0ea5e9] mb-3" />
              <h3 className="font-semibold mb-2">Practical Learning</h3>
              <p className="text-sm text-gray-600">
                Hands-on experience with real projects and clients
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Award className="w-8 h-8 text-[#0ea5e9] mb-3" />
              <h3 className="font-semibold mb-2">Certification</h3>
              <p className="text-sm text-gray-600">
                Industry-recognized certificates upon completion
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Clock className="w-8 h-8 text-[#0ea5e9] mb-3" />
              <h3 className="font-semibold mb-2">Flexible Timing</h3>
              <p className="text-sm text-gray-600">
                Weekend and weekday batches available
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Briefcase className="w-8 h-8 text-[#0ea5e9] mb-3" />
              <h3 className="font-semibold mb-2">Job Placement</h3>
              <p className="text-sm text-gray-600">
                Placement assistance and job opportunities
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <GraduationCap className="w-8 h-8 text-[#0ea5e9] mb-3" />
              <h3 className="font-semibold mb-2">Lifetime Support</h3>
              <p className="text-sm text-gray-600">
                Ongoing support and learning resources
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Our Impact
          </h2>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-[#0ea5e9] mb-2">1000+</div>
              <p className="text-gray-600">Students Trained</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#0ea5e9] mb-2">200+</div>
              <p className="text-gray-600">Interns Placed</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#0ea5e9] mb-2">85%</div>
              <p className="text-gray-600">Job Placement Rate</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#0ea5e9] mb-2">50+</div>
              <p className="text-gray-600">Hiring Partners</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-[#0ea5e9] to-[#0284c7]">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join our training and internship programs to build your career
          </p>
          <div className="space-x-4">
            <Button size="lg" className="bg-white text-[#0ea5e9] hover:bg-gray-100">
              Apply for Training
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[#0ea5e9]">
              Apply for Internship
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
