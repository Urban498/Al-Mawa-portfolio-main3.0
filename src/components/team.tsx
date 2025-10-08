import Link from "next/link";
import Image from "next/image";
import { Inter, Playfair_Display } from "next/font/google";
import sufiyan from "./images/sufiyan.jpeg";
import arshad from "./images/arshad.jpeg";
import ahemad from "./images/ahemad.png";
import {useEffect, useRef} from "react";

const inter = Inter({ subsets: ["latin"] });
const playfair_display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});
const members = [
  {
    name: "Sufiyan Ali",
    role: "Full Stack Developer",
    avatar: sufiyan,
    link: "#",
  },
  {
    name: "Arshad shaikh",
    role: "Full Stack Developer",
    avatar: arshad,
    link: "#",
  },
  {
    name: "Arshad shaikh",
    role: "Full Stack Developer",
    avatar: arshad,
    link: "#",
  },
  {
    name: "Arshad shaikh",
    role: "Full Stack Developer",
    avatar: arshad,
    link: "#",
  },
  {
    name: "Arshad shaikh",
    role: "Full Stack Developer",
    avatar: arshad,
    link: "#",
  },
  {
    name: "Arshad shaikh",
    role: "Full Stack Developer",
    avatar: arshad,
    link: "#",
  },
  {
    name: "Arshad shaikh",
    role: "Full Stack Developer",
    avatar: arshad,
    link: "#",
  },
  {
    name: "Arshad shaikh",
    role: "Full Stack Developer",
    avatar: arshad,
    link: "#",
  },
  {
    name: "Arshad shaikh",
    role: "Full Stack Developer",
    avatar: arshad,
    link: "#",
  },
  {
    name: "Ahmad Raza",
    role: "Full Stack Developer",
    avatar: ahemad,
    link: "#",
  },
  {
    name: "Ahemad Raza",
    role: "Full Stack Developer",
    avatar: ahemad,
    link: "#",
  },
  {
    name: "Ahemad Raza",
    role: "Full Stack Developer",
    avatar: ahemad,
    link: "#",
  },
];

export default function TeamSection() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Initialize array with correct length
    cardRefs.current = new Array(members.length).fill(null);
    
    if (typeof window === "undefined") return;

    // Enable scroll animation for all devices except large screens (> 1024px)
    if (window.innerWidth > 1024) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("mobile-active");
            console.log("Adding mobile-active to:", entry.target);
          } else {
            entry.target.classList.remove("mobile-active");
            console.log("Removing mobile-active from:", entry.target);
          }
        });
      },
      { 
        threshold: 0.2, // when 20% of card is visible
        rootMargin: '0px 0px -50px 0px' // trigger slightly before fully visible
      }
    );

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-gray-50  py-16 md:py-10 dark:bg-transparent">
      <div className="mx-auto max-w-5xl  px-6">
        {/* <span className="text-caption -ml-6 -mt-3.5 block w-max bg-gray-50 px-6 dark:bg-gray-950">Team</span> */}
        <div className="mt-12 gap-4 grid sm:grid-cols-1 md:grid-cols-2 md:mt-24">
          <div className="sm:w-3/5">
            <h2
              className={`text-3xl font-bold sm:text-4xl uppercase ${inter.className}`}
            >
              Our Dynamic <span className="text-7xl">team</span>
            </h2>
          </div>
          <div className={`mt-6 sm:mt-0 ${playfair_display.className}`}>
            <p>
            AL-Mawa International operates under a lean, agile, and innovation-driven structure led by our visionary Director and powered by a core team of specialists across IT Services & Development, Digital Marketing, . Each department works in perfect sync to ensure seamless execution and impactful client outcomes.At the heart of AL-Mawa is a diverse team of passionate professionals  tech innovators, creative strategists, and industry experts who combine experience with forward thinking. Together, they focus on delivering excellence, fuel it with innovation, and transform every project into a success story.
            </p>
          </div>
        </div>
        <div className="mt-12 md:mt-24">
          <h3 className={`${inter.className} text-3xl border-b mb-5 uppercase`}>
            Development Team
          </h3>

          <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {members.map((member, index) => (
              <div key={index} 
              ref={(el) => {
                if (cardRefs.current) {
                  cardRefs.current[index] = el;
                }
              }}
              className="group overflow-hidden team-card">
                <Image
                  className="h-96 w-full rounded-md object-cover object-top transition-all duration-500 lg:grayscale lg:hover:grayscale-0 group-hover:h-[22.5rem] group-hover:rounded-xl next-image"
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
                    <span className="text-xs">_0{index + 1}</span>
                  </div>
                  
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-muted-foreground inline-block translate-y-6 text-sm opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      {member.role}
                    </span>
                    <Link
                      href={member.link}
                      className="group-hover:text-primary-600 dark:group-hover:text-primary-400 inline-block translate-y-8 text-sm tracking-wide opacity-0 transition-all duration-500 hover:underline group-hover:translate-y-0 group-hover:opacity-100"
                    >
                      {" "}
                      LinkdeIn
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
