"use client";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { Inter, Playfair_Display } from "next/font/google";
import { useEffect, useRef } from "react";
import { useTranslations } from 'next-intl';

// ✅ Import member images
import omkar from "../components/images/images/omkar.png";
import sabeel from "../components/images/images/sabeel.png";
import shashant from "../components/images/images/shashant.png";
import shrihari from "../components/images/images/shrihari.png";
import kshitij from "../components/images/images/kshitij.png";
import samyak from "../components/images/images/Samyak.jpeg";
import pawan from "../components/images/images/Pawan.png";
import priyanka from "../components/images/images/priyanka.png";
import sanika from "../components/images/images/Sanika.jpeg";
import Vaibhav from "../components/images/images/Vaibhav.jpeg";
import Tushar from "../components/images/images/Tushar.png";

import om from "../components/images/images/om.png";
import Parth from "../components/images/images/Parth.jpeg";


// ✅ Font setup
const inter = Inter({ subsets: ["latin"] });
const playfair_display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

// ✅ Member Type
type Member = {
  name: string;
  role: string;
  avatar: StaticImageData;
  link: string;
  team: string;
};

// ✅ Members data
const members: Member[] = [
  { name: "Shashant Shekhar", role: "Full Stack Developer", avatar: shashant, link: "https://www.linkedin.com/in/shashant-shekhar-588a0b20b", team: "Development Team" },
  { name: "Shrihari Surve", role: "Full Stack Developer", avatar: shrihari, link: "https://www.linkedin.com/in/srihari-surve-/", team: "Development Team" },
  { name: "Kshitij Hapase", role: "Flutter Developer", avatar: kshitij, link: "https://www.linkedin.com/in/kshitij-hapase-141976322/", team: "Development Team" },
  { name: "Samyak Jitendra Jain", role: "Full Stack Developer", avatar: samyak, link: "https://www.linkedin.com/in/samyak-jitendra-jain-066a24259", team: "Development Team" },
  { name: "Pawan Wagh", role: "Full Stack Developer", avatar: pawan, link: "https://www.linkedin.com/in/pawan-wagh29?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", team: "Development Team" },
  { name: "Tushar Kumar", role: "Full Stack Developer", avatar: Tushar, link: "https://www.linkedin.com/in/tushar-kumar-09b8b024b/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", team: "Development Team" },
  
  
  { name: "Sabeel", role: "Sales & Marketing Team", avatar: sabeel, link: "https://www.linkedin.com/in/sabeel-siddiqui-7412341b2?utm_source=share_via&utm_content=profile&utm_medium=member_android", team: "Sales & Marketing Team" },

  { name: "Omkar Babu Bachanatti", role: "Business Development Executive", avatar: omkar, link: "https://www.linkedin.com/in/omkar-bachanatti-088b45247/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", team: "Sales & Marketing Team" },
  { name: "Sanika Chougule", role: "Sales & Marketing Team", avatar: sanika, link: "https://www.linkedin.com/in/sanika-chougule-43b2182b2?utm_source=share_via&utm_content=profile&utm_medium=member_android", team: "Sales & Marketing Team" },
  { name: "Om Mangate", role: "Sales & Marketing Team", avatar: om, link: "https://www.linkedin.com/in/om-mangate-926b46291?utm_source=share_via&utm_content=profile&utm_medium=member_android", team: "Sales & Marketing Team" },
  { name: "Parth Walse", role: "Sales & Marketing Team", avatar: Parth, link: "https://www.linkedin.com/in/parth-walse-699a88340?utm_source=share_via&utm_content=profile&utm_medium=member_android", team: "Sales & Marketing Team" },
  
  
  { name: "Vaibhav Virkar", role: "Graphics Designer", avatar: Vaibhav, link: "https://www.linkedin.com/in/vaibhav-virkar-497544324?utm_source=share_via&utm_content=profile&utm_medium=member_android", team: "Graphics Designer" },
  
  { name: "Priyanka Godbole", role: "HR & Management", avatar: priyanka, link: "https://www.linkedin.com/in/priyanka-godbole-755787253?utm_source=share_via&utm_content=profile&utm_medium=member_android", team: "HR & Management" },


];

export default function TeamSection() {
  const t = useTranslations('team');
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // ✅ Scroll animation for mobile view
  useEffect(() => {
    cardRefs.current = new Array(members.length).fill(null);
    if (typeof window === "undefined") return;
    if (window.innerWidth > 1024) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("mobile-active");
          else entry.target.classList.remove("mobile-active");
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -50px 0px" }
    );

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  // ✅ Group members by team (type-safe)
  const teams = members.reduce<Record<string, Member[]>>((acc, member) => {
    if (!acc[member.team]) acc[member.team] = [];
    acc[member.team].push(member);
    return acc;
  }, {});

  return (
    <section className="bg-gray-50 py-16 md:py-10 dark:bg-transparent">
      <div className="mx-auto max-w-5xl px-6">
        {/* Intro Section */}
        <div className="mt-12 grid gap-4 sm:grid-cols-1 md:grid-cols-2 md:mt-24">
          <div className="sm:w-3/5">
            <h2 className={`text-3xl font-bold sm:text-4xl uppercase ${inter.className}`}>
              {t('title')} <span className="text-7xl text-gray-800 dark:text-gray-200">{t('titleHighlight')}</span>
            </h2>
          </div>
          <div className={`mt-6 sm:mt-0 text-gray-700 dark:text-gray-300 ${playfair_display.className}`}>
            <p>
              {t('description')}
            </p>
          </div>
        </div>

        {/* Team Sections */}
        <div className="mt-12 md:mt-24 space-y-20">
          {Object.entries(teams).map(([teamName, teamMembers], teamIndex) => (
            <div
              key={teamIndex}
              className="border-t border-gray-300 dark:border-gray-700 pt-12 first:border-t-0 first:pt-0"
            >
              {/* Section Heading */}
              <div className="flex items-center mb-8">

                <h3 className={`${inter.className} text-3xl font-semibold uppercase`}>
                  {teamName}
                </h3>
              </div>

              {/* Members Grid */}
              <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                {teamMembers.map((member, index) => (
                  <div
                    key={index}
                    ref={(el) => {
                      if (cardRefs.current) cardRefs.current[index] = el;
                    }}
                    className="group overflow-hidden team-card"
                  >
                    <Image
                      className="h-96 w-full rounded-md object-cover object-top transition-all duration-500 lg:grayscale lg:hover:grayscale-0 group-hover:h-[22.5rem] group-hover:rounded-xl"
                      src={member.avatar}
                      alt={`${member.name} - ${member.role}`}
                      width={826}
                      height={1239}
                      priority={index < 3}
                    />

                    <div className="px-2 pt-2 sm:pb-0 sm:pt-4">
                      <div className="flex justify-between">
                        <h3 className="text-base font-medium transition-all duration-500 group-hover:tracking-wider">
                          {member.name}
                        </h3>
                      </div>

                      <div className="mt-1 flex items-center justify-between">
                        <span className="text-muted-foreground inline-block translate-y-6 text-sm opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                          {member.role}
                        </span>
                        <Link
                          href={member.link}
                          className="group-hover:text-primary-600 dark:group-hover:text-primary-400 inline-block translate-y-8 text-sm tracking-wide opacity-0 transition-all duration-500 hover:underline group-hover:translate-y-0 group-hover:opacity-100"
                        >
                          {t('linkedin')}
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
