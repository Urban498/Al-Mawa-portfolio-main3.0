"use client";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { Inter, Playfair_Display } from "next/font/google";
import { useEffect, useRef } from "react";
import { useTranslations } from 'next-intl';

// ✅ Import member images
import kshitij from "../components/images/images/kshitij.png";
import Tushar from "../components/images/images/Tushar.png";
import sabeel from "../../public/sabeel sir.png";
import priyanka from "../components/images/images/priyanka.png";
import sahil from "../../public/Sahil.png";
import mubarak from "../../public/Mubarak.png";
import manasi from "../../public/Manasi.jpeg";
import sameer from "../../public/Sameer.jpeg";
import pallavi from "../../public/Pallavi.jpeg";
import dilip from "../../public/Dilip.png";
import kaushal from "../../public/Kaushal.png";
import utkarsh from "../../public/Utkarsh.png";


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
  avatar: StaticImageData | string;
  link: string;
  team: string;
};

// ✅ Members data
const members: Member[] = [
  { name: "Kshitij Hapase", role: "Flutter Developer", avatar: kshitij, link: "https://www.linkedin.com/in/kshitij-hapase-141976322/", team: "Development Team" },
  { name: "Tushar Kumar", role: "Full Stack Developer", avatar: Tushar, link: "https://www.linkedin.com/in/tushar-kumar-09b8b024b/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", team: "Development Team" },
  { name: "Sameer Laxman Pise", role: "Full Stack Developer", avatar: sameer, link: "https://www.linkedin.com/in/sameer-pise-75b446345/", team: "Development Team" },
  { name: "Dilip Bhaskar", role: "Sales Head", avatar: dilip, link: "#", team: "Sales & Marketing Team" },
  { name: "Kaushal Marathe", role: "Team Head", avatar: kaushal, link: "https://www.linkedin.com/in/kaushalmarathe/", team: "Sales & Marketing Team" },
  { name: "Sahil Pacharne", role: "Business Development Executive", avatar: sahil, link: "https://www.linkedin.com/in/sahil-pacharne-481481379/", team: "Sales & Marketing Team" },
  { name: "Mubarak Hussain", role: "Business Development Executive", avatar: mubarak, link: "https://www.linkedin.com/in/mubarak-hussain-ba2147437/", team: "Sales & Marketing Team" },
  { name: "Utkarsh Ratnakar", role: "Graphics Designer", avatar: utkarsh, link: "https://www.linkedin.com/in/utkarsh-ratnakar-8b3a52219/", team: "Graphics Designer & Digital Marketing" },
  { name: "Sabeel Siddiqui", role: "Technical Manager", avatar: sabeel, link: "https://www.linkedin.com/in/sabeel-siddiqui-7412341b2/", team: "Management" },
  { name: "Priyanka Godbole", role: "CEO", avatar: priyanka, link: "https://www.linkedin.com/in/priyanka-godbole-755787253/", team: "Management" },
  { name: "Manasi Patil", role: "HR Manager", avatar: manasi, link: "#", team: "Management" },
  { name: "Pallavi", role: "Web Developer Intern", avatar: pallavi, link: "https://www.linkedin.com/in/rakada-pallavi-886344397/", team: "Development Team" },
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

  const teamOrder = [
    "Management",
    "Sales & Marketing Team",
    "Development Team",
    "Graphics Designer & Digital Marketing",
  ];

  const orderedTeamEntries = [
    ...teamOrder
      .filter((teamName) => teams[teamName])
      .map((teamName) => [teamName, teams[teamName]] as [string, Member[]]),
    ...Object.entries(teams).filter(([teamName]) => !teamOrder.includes(teamName)),
  ];

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
          {orderedTeamEntries.map(([teamName, teamMembers], teamIndex) => (
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
              {teamMembers.length > 0 && (
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
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
