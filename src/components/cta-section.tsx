import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import {Inter,Playfair_Display} from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const playfair_display = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export default function CTASection() {
  return (
    <div className="bg-gradient-to-r from-background via-muted to-background py-20 px-4 md:px-6 lg:px-8 relative overflow-hidden border-t border-border/50 ">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left side - Text content */}
          <div className="flex-1 text-left">
            {/* Main Heading */}
            <h2 className={`text-3xl md:text-5xl font-bold pb-4 text-left bg-clip-text bg-gradient-to-b text-black uppercase ${inter.className}`}>
              Connect With Us
            </h2>
            
            {/* Subheading */}
            <p className={`text-base md:text-lg    mb-6 leading-relaxed text-black uppercase ${playfair_display.className}`}>
              Whether you have questions or want to explore career opportunities, we&apos;re here to help
            </p>
          </div>
          
          {/* Right side - CTA Buttons */}
          <div className="flex-shrink-0">
            <div className="flex flex-row gap-4">
              <Button 
                size="lg" 
                className="animated-border-button px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105 uppercase"
              >
                Contact US
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              {/* <Button 
                size="lg"
                className="animated-border-button px-8 py-4 text-lg font-semibold transition-all duration-300"
              >
                <Briefcase className="mr-2 h-5 w-5" />
                Career
              </Button> */}
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
}
