"use client";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { Inter, Playfair_Display } from "next/font/google";
import { useEffect, useRef } from "react";
import { useTranslations } from 'next-intl';
// ✅ Import member images
import amitesh from "../components/images/images/amitesh.png";
import arshad from "../components/images/images/arshad.png";
import hussain from "../components/images/images/hussain.png";
import jigyasa from "../components/images/images/jigyasa.png";
// import komal from "../components/images/images/komal.png";
import mihir from "../components/images/images/mihir.png";
import omkar from "../components/images/images/omkar.png";
// import pranali from "../components/images/images/pranali.png";
import sabeel from "../components/images/images/sabeel.png";
import shraddha from "../components/images/images/shraddha.png";
import sufiyan from "../components/images/images/sufiyan.png";
import ahemad from "../components/images/images/ahemad.png";
import  priyanka from "../components/images/images/priyanka.png";



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
  { name: "Arshad Shaikh", role: "Full Stack Developer", avatar: arshad, link: "https://www.linkedin.com/in/arshad-shaikh-502721205?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", team: "Development Team" },
  { name: "Sufiyan Ali", role: "Full Stack Developer", avatar: sufiyan, link: "https://www.linkedin.com/in/sayyed-sufiyan-ali-7483192a8/", team: "Development Team" },
  { name: "Md Ahmad Raza", role: "Full Stack Developer", avatar: ahemad, link: "https://www.linkedin.com/in/md-ahmad-raza-4626a5232/", team: "Development Team" },
  { name: "Priyanka Godbole", role: "Marketing Manager", avatar: priyanka, link: "#", team: "Sales & Marketing Team" },
  { name: "Sabeel", role: "Sales & Marketing Team", avatar: sabeel, link: "#", team: "Sales & Marketing Team" },
  { name: "Husain Rangwala", role: "Sales & Marketing Team", avatar: hussain, link: "#", team: "Sales & Marketing Team" },
  { name: "Omkar Babu Bachanatti", role: "Business Development Executive", avatar: omkar, link: "https://www.linkedin.com/in/omkar-bachanatti-088b45247/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", team: "Sales & Marketing Team" },
  { name: "Mihir Manoj Fakirde", role: "Social Media Executive", avatar: mihir, link: "https://www.linkedin.com/in/mihir-fakirde-892357240/", team: "Graphic Team" },
  // { name: "Komal Vijay Jadhav", role: "Graphic Designer", avatar: komal, link: "https://www.linkedin.com/in/komal-jadhav-1b9503263/", team: "Graphic Team" },
  // { name: "Pranali Shivaji Khilare", role: "Graphic Designer", avatar: pranali, link: "https://www.linkedin.com/in/pranali-khilare-535829261", team: "Graphic Team" },

  { name: "Jigyasa Singh Raghuvanshi", role: "", avatar: jigyasa, link: "https://www.linkedin.com/in/adv-jigyasa-singh-raghuvanshi-332068199/?utm_source=share_via&utm_content=profile&utm_medium=member_ios", team: "HR & Management" },
  { name: "Priyanka Godbole", role: "HR & Management", avatar: priyanka, link: "#", team: "HR & Management" },
  { name: "Jigyasa Singh Raghuvanshi", role: " Legal Advisor ", avatar: jigyasa, link: "https://www.linkedin.com/in/adv-jigyasa-singh-raghuvanshi-332068199/?utm_source=share_via&utm_content=profile&utm_medium=member_ios", team: "Legal Team" },
  { name: "Amitesh Ashok Jadhav", role: "Back Office Coordinator", avatar: amitesh, link: "https://www.linkedin.com/in/amitesh-jadhav-415385311?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", team: "Sales & Marketing Team" },
  { name: "Shradha Duragkar", role: "Legal Advisor", avatar: shraddha, link: "https://www.linkedin.com/in/shradha-duragkar-a87aab340/?utm_source=share_via&utm_content=profile&utm_medium=member_ios", team: "Legal Team" },
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
                        <span className="text-xs text-gray-500">_0{index + 1}</span>
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
