"use client";

import React from "react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Inter, Playfair_Display } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
const playfair_display = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const testimonials = [
  {
    quote: "Working with this team was an absolute pleasure. They delivered exceptional results that exceeded our expectations and transformed our digital presence.",
    name: "Sarah Johnson",
    title: "CEO, TechStart Inc.",
    rating: 5
  },
  {
    quote: "The attention to detail and innovative approach they brought to our project was remarkable. Our user engagement increased by 300% after the redesign.",
    name: "Michael Chen",
    title: "Product Manager, InnovateCorp",
    rating: 5
  },
  {
    quote: "Professional, creative, and reliable. They understood our vision perfectly and brought it to life with stunning results.",
    name: "Emily Rodriguez",
    title: "Marketing Director, GrowthLab",
    rating: 5
  },
  {
    quote: "The team's expertise in both design and development made our project seamless. Highly recommend for any digital transformation needs.",
    name: "David Thompson",
    title: "CTO, FutureTech Solutions",
    rating: 5
  },
  {
    quote: "Outstanding work quality and excellent communication throughout the project. They delivered on time and within budget.",
    name: "Lisa Wang",
    title: "Founder, StartupHub",
    rating: 5
  },
  {
    quote: "Their strategic approach to our digital marketing campaign resulted in a 250% increase in qualified leads within just 3 months.",
    name: "Robert Martinez",
    title: "VP Marketing, ScaleUp Co.",
    rating: 5
  },
  {
    quote: "The mobile app they developed for us has been a game-changer. User retention improved by 180% and app store ratings are consistently 4.8+.",
    name: "Jennifer Kim",
    title: "Product Owner, MobileFirst",
    rating: 5
  },
  {
    quote: "From concept to launch, they guided us through every step. The final product exceeded our wildest expectations and our customers love it.",
    name: "Alex Thompson",
    title: "Founder, InnovateNow",
    rating: 5
  }
];

const stats = [
  { number: "150+", label: "Projects Completed" },
  { number: "98%", label: "Client Satisfaction" },
  { number: "50+", label: "Happy Clients" },
  { number: "24/7", label: "Support Available" }
];

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted to-card">
      <div className="container mx-auto px-4 py-16">
        {/* Page Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className={`text-4xl md:text-6xl font-bold pb-4 bg-clip-text text-transparent bg-black uppercase ${inter.className}`}>
          voices from the desk
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto uppercase">
            Hear from our satisfied clients about their experience working with us and the results we&apos;ve achieved together.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
            >
              <Card className="text-center border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500 mb-2 uppercase">
                    {stat.number}
                  </div>
                  <div className="text-sm text-muted-foreground uppercase">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {testimonials.slice(0, 6).map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <blockquote className="text-muted-foreground mb-4 italic uppercase">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                  <div>
                    <div className="font-semibold text-foreground uppercase">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground uppercase">{testimonial.title}</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Infinite Moving Cards */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold pb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500 uppercase">
              More Success Stories
            </h2>
            <p className="text-muted-foreground uppercase">
              Continuous feedback from our growing community of satisfied clients
            </p>
          </div>
          <InfiniteMovingCards
            items={testimonials.map(testimonial => ({
              description: testimonial.quote,
              title: testimonial.name,
              subtitle: testimonial.title
            }))}
            direction="right"
            speed="slow"
          />
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="text-center bg-gradient-to-r from-primary/10 to-accent/10 p-12 rounded-lg border border-border/50"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500 uppercase">
            Ready to Join Our Success Stories?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto uppercase">
            Let&apos;s work together to create something amazing that your customers will love and talk about.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your Project
            </motion.a>
            <motion.a
              href="/services"
              className="inline-flex items-center justify-center px-8 py-3 border border-border rounded-lg font-semibold hover:bg-muted transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Our Services
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
