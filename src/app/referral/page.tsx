"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, DollarSign, Users, Gift, TrendingUp, Award, Target } from 'lucide-react';
import ReferralFormModal from '@/components/ReferralFormModal';

export default function ReferralPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen mt-20 bg-gradient-to-b from-gray-50 to-white">
      <ReferralFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Earn <span className="text-[#0ea5e9]">Commission</span> Through Referrals
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto lg:mx-0">
                Join our referral program and earn attractive commissions by referring clients to Al-Mawa's premium services
              </p>
              <Button size="lg" onClick={() => setIsModalOpen(true)} className="bg-[#0ea5e9] hover:bg-[#0284c7] text-white px-8">
                Start Referring
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
            <div className="relative">
              <img 
                src="/referral.png" 
                alt="Al-Mawa Referral Program" 
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Commission Structure */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Attractive Commission Structure
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg border border-gray-200 hover:border-[#0ea5e9]/50 transition-colors">
              <DollarSign className="w-12 h-12 text-[#0ea5e9] mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-[#0ea5e9] mb-2">10-15%</h3>
              <h3 className="text-xl font-semibold mb-3">Web Services</h3>
              <p className="text-gray-600">
                Earn 10-15% commission on web development and design projects
              </p>
            </div>
            <div className="text-center p-6 rounded-lg border border-gray-200 hover:border-[#0ea5e9]/50 transition-colors">
              <TrendingUp className="w-12 h-12 text-[#0ea5e9] mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-[#0ea5e9] mb-2">8-12%</h3>
              <h3 className="text-xl font-semibold mb-3">Digital Marketing</h3>
              <p className="text-gray-600">
                Get 8-12% commission on digital marketing and SEO services
              </p>
            </div>
            <div className="text-center p-6 rounded-lg border border-gray-200 hover:border-[#0ea5e9]/50 transition-colors">
              <Users className="w-12 h-12 text-[#0ea5e9] mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-[#0ea5e9] mb-2">5-10%</h3>
              <h3 className="text-xl font-semibold mb-3">IT Services</h3>
              <p className="text-gray-600">
                Receive 5-10% commission on IT infrastructure and support services
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#0ea5e9] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h3 className="font-semibold mb-2">Sign Up</h3>
              <p className="text-sm text-gray-600">
                Register for our referral program and get your unique referral code
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#0ea5e9] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h3 className="font-semibold mb-2">Refer Clients</h3>
              <p className="text-sm text-gray-600">
                Share your referral code with potential clients in your network
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#0ea5e9] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h3 className="font-semibold mb-2">Client Converts</h3>
              <p className="text-sm text-gray-600">
                When referred clients purchase our services, the deal is tracked
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#0ea5e9] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                4
              </div>
              <h3 className="font-semibold mb-2">Earn Commission</h3>
              <p className="text-sm text-gray-600">
                Receive your commission payout once the project is completed
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
                src="/referral2.png" 
                alt="Referral Success Stories" 
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Maximize Your Earning Potential
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                Turn your professional network into a steady income stream with Al-Mawa's generous referral program. Our referrers earn substantial commissions on every successful referral.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                With transparent tracking, timely payouts, and dedicated support, you'll have everything you need to succeed as a trusted Al-Mawa partner.
              </p>
              <Button size="lg" onClick={() => setIsModalOpen(true)} className="bg-[#0ea5e9] hover:bg-[#0284c7] text-white">
                Join Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Join Our Referral Program?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <Gift className="w-8 h-8 text-[#0ea5e9] mb-3" />
              <h3 className="font-semibold mb-2">No Investment</h3>
              <p className="text-sm text-gray-600">Start earning without any financial investment</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <Target className="w-8 h-8 text-[#0ea5e9] mb-3" />
              <h3 className="font-semibold mb-2">High Commissions</h3>
              <p className="text-sm text-gray-600">Industry-leading commission rates up to 15%</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <Award className="w-8 h-8 text-[#0ea5e9] mb-3" />
              <h3 className="font-semibold mb-2">Performance Bonuses</h3>
              <p className="text-sm text-gray-600">Additional bonuses for high-performing referrers</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <Users className="w-8 h-8 text-[#0ea5e9] mb-3" />
              <h3 className="font-semibold mb-2">Dedicated Support</h3>
              <p className="text-sm text-gray-600">Personal support to help you maximize referrals</p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Our Referral Success Stories
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-[#0ea5e9] mb-2">500+</div>
              <p className="text-gray-600">Active Referrers</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#0ea5e9] mb-2">$2M+</div>
              <p className="text-gray-600">Commission Paid</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#0ea5e9] mb-2">1000+</div>
              <p className="text-gray-600">Successful Referrals</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-[#0ea5e9] to-[#0284c7]">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Start Earning?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join our referral program today and turn your network into income
          </p>
          <Button size="lg" onClick={() => setIsModalOpen(true)} className="bg-white text-[#0ea5e9] hover:bg-gray-100">
            Start Now
          </Button>
        </div>
      </section>
    </div>
  );
}
