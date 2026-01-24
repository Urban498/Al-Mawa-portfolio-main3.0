"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState, useCallback } from "react";
import { Inter } from "next/font/google";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const InfiniteMovingCards = ({
  items,
  direction = "right",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    description: string;
    title: string;
    subtitle: string;
  }[];
  direction?: "right" | "left";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);



  const getDirection = useCallback(() => {
    if (containerRef.current) {
      if (direction === "right") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards",
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse",
        );
      }
    }
  }, [direction]);

  const getSpeed = useCallback(() => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "15s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "25s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "50s");
      }
    }
  }, [speed]);

  const addAnimation = useCallback(() => {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }, [getDirection, getSpeed]);

  useEffect(() => {
    addAnimation();
  }, [addAnimation]);
  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_left,transparent,white_20%,white_80%,transparent) bg-gray-300]",
        className,
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-6 py-4",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]",
        )}
      >
        {items.map((item, id) => (
          <motion.li
            key={id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: id * 0.1 }}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            className="relative w-[350px] max-w-full shrink-0 rounded-3xl border-2 border-blue-200 bg-gradient-to-br from-blue-50/80 via-white to-blue-50/40 px-8 py-8 md:w-[450px] hover:border-blue-400 shadow-lg hover:shadow-2xl transition-all duration-300 backdrop-blur-sm"
          >
            {/* Animated background gradient */}
            <div className="absolute inset-0 rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 rounded-3xl" />
            </div>

            {/* Animated quote icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 0.2, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="absolute top-4 right-4"
            >
              <Quote className="w-8 h-8 text-blue-400" />
            </motion.div>

            <blockquote className="relative z-20">
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className={`relative z-20 text-sm leading-[1.8] font-medium text-gray-700 ${inter.className}`}
              >
                &quot;{item.description}&quot;
              </motion.span>
              
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative z-20 mt-6 flex flex-row items-center gap-4 border-t border-blue-200 pt-4"
              >
                <div className="flex flex-col gap-2">
                  <span className={`text-sm font-bold text-gray-900 ${inter.className}`}>
                    {item.subtitle}
                  </span>
                  <span className={`text-xs font-semibold text-blue-600 uppercase tracking-wider ${inter.className}`}>
                    {item.title}
                  </span>
                </div>
              </motion.div>
            </blockquote>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};
