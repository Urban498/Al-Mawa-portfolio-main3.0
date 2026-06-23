"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Award, Users, TrendingUp, Globe, Headphones } from 'lucide-react';
import FranchiseFormModal from '@/components/FranchiseFormModal';

export default function FranchisePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen mt-20 bg-gradient-to-b from-gray-50 to-white">
      <FranchiseFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Join Our <span className="text-[#0ea5e9]">Franchise Network</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto lg:mx-0">
                Build a successful business partnership with Al-Mawa and become part of our growing family of entrepreneurs
              </p>
              <Button size="lg" onClick={() => setIsModalOpen(true)} className="bg-[#0ea5e9] hover:bg-[#0284c7] text-white px-8">
                Apply Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
            <div className="relative">
              <img 
                src="/franchise.png" 
                alt="Al-Mawa Franchise Opportunity" 
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose Al-Mawa Franchise?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg border border-gray-200 hover:border-[#0ea5e9]/50 transition-colors">
              <Award className="w-12 h-12 text-[#0ea5e9] mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Established Brand</h3>
              <p className="text-gray-600">
                Partner with a trusted brand with proven success in the market
              </p>
            </div>
            <div className="text-center p-6 rounded-lg border border-gray-200 hover:border-[#0ea5e9]/50 transition-colors">
              <Users className="w-12 h-12 text-[#0ea5e9] mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Training & Support</h3>
              <p className="text-gray-600">
                Comprehensive training and ongoing support to ensure your success
              </p>
            </div>
            <div className="text-center p-6 rounded-lg border border-gray-200 hover:border-[#0ea5e9]/50 transition-colors">
              <TrendingUp className="w-12 h-12 text-[#0ea5e9] mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Growth Potential</h3>
              <p className="text-gray-600">
                Unlimited growth opportunities with multiple revenue streams
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <img 
                src="/franchis2.png" 
                alt="Franchise Success Story" 
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Join a Growing Network
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                Become part of Al-Mawa's expanding franchise network across multiple regions. Our proven business model and comprehensive support system ensure your success in the competitive IT services market.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                With over 50+ successful franchise partners, we offer a turnkey solution that includes training, marketing support, and access to our established client base.
              </p>
              <Button size="lg" onClick={() => setIsModalOpen(true)} className="bg-[#0ea5e9] hover:bg-[#0284c7] text-white">
                Start Your Journey
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Offered */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Services You'll Offer
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Globe className="w-8 h-8 text-[#0ea5e9] mb-3" />
              <h3 className="font-semibold mb-2">Web Development</h3>
              <p className="text-sm text-gray-600">Complete web solutions for businesses</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <TrendingUp className="w-8 h-8 text-[#0ea5e9] mb-3" />
              <h3 className="font-semibold mb-2">Digital Marketing</h3>
              <p className="text-sm text-gray-600">Comprehensive marketing services</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Users className="w-8 h-8 text-[#0ea5e9] mb-3" />
              <h3 className="font-semibold mb-2">IT Services</h3>
              <p className="text-sm text-gray-600">Complete IT infrastructure solutions</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Headphones className="w-8 h-8 text-[#0ea5e9] mb-3" />
              <h3 className="font-semibold mb-2">Support Services</h3>
              <p className="text-sm text-gray-600">24/7 technical support for clients</p>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Franchise Requirements
          </h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-[#0ea5e9] rounded-full mt-2"></div>
              <div>
                <h3 className="font-semibold mb-1">Business Acumen</h3>
                <p className="text-gray-600">Strong business understanding and entrepreneurial spirit</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-[#0ea5e9] rounded-full mt-2"></div>
              <div>
                <h3 className="font-semibold mb-1">Investment Capacity</h3>
                <p className="text-gray-600">Minimum investment as per franchise package</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-[#0ea5e9] rounded-full mt-2"></div>
              <div>
                <h3 className="font-semibold mb-1">Office Space</h3>
                <p className="text-gray-600">Minimum 300 sq ft commercial space</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-[#0ea5e9] rounded-full mt-2"></div>
              <div>
                <h3 className="font-semibold mb-1">Team Management</h3>
                <p className="text-gray-600">Ability to build and manage a team</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-[#0ea5e9] to-[#0284c7]">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Start Your Franchise Journey?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Take the first step towards building a successful business with Al-Mawa
          </p>
          <Button size="lg" onClick={() => setIsModalOpen(true)} className="bg-white text-[#0ea5e9] hover:bg-gray-100">
            Apply Now
          </Button>
        </div>
      </section>
    </div>
  );
}
