"use client";

import { useRef, useMemo } from "react";
import { motion } from "motion/react";
import Image from "next/image";

import worldMapImage from "../images/worldmap.png";

interface MapProps {
  dots?: Array<{
    start: { lat: number; lng: number; label?: string };
    end: { lat: number; lng: number; label?: string };
  }>;
  lineColor?: string;
}

// Helper functions moved outside component to prevent recreation on each render
const projectPoint = (lat: number, lng: number) => {
  const x = (lng + 180) * (800 / 360);
  const y = (90 - lat) * (400 / 180);

  let adjustedX = x;
  let adjustedY = y;

  if (lng > 65 && lng < 90 && lat > 10 && lat < 30) {
    // India region
    adjustedX = x * 1.02 - 40;
    adjustedY = y * 0.98 + 35;
  } else {
    adjustedX = x * 1.01 - 5;
    adjustedY = y * 0.99 + 5;
  }

  return { x: adjustedX, y: adjustedY };
};

const createCurvedPath = (
  start: { x: number; y: number },
  end: { x: number; y: number }
) => {
  const midX = (start.x + end.x) / 2;
  const midY = Math.min(start.y, end.y) - 50;
  return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
};

export default function WorldMap({
  dots = [],
  lineColor = "#ffffff", // Default to white
}: MapProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  // Memoize expensive calculations to prevent re-computation on every render
  const projectedPoints = useMemo(() => {
    return dots.map(dot => ({
      start: projectPoint(dot.start.lat, dot.start.lng),
      end: projectPoint(dot.end.lat, dot.end.lng),
      path: createCurvedPath(
        projectPoint(dot.start.lat, dot.start.lng),
        projectPoint(dot.end.lat, dot.end.lng)
      ),
    }));
  }, [dots]);

  return (
    <div className="w-full aspect-[2/1] dark:bg-black rounded-lg relative font-sans">
      <Image
        src={worldMapImage}
        className="h-full w-full pointer-events-none select-none"
        alt="world map"
        height={495}
        width={1056}
        draggable={false}
      />
      <svg
        ref={svgRef}
        viewBox="0 0 800 400"
        className="w-full h-full absolute inset-0 pointer-events-none select-none"
      >
        {/* Lines */}
        {projectedPoints.map((points, i) => (
          <g key={`path-group-${i}`}>
            <motion.path
              d={points.path}
              fill="none"
              stroke={lineColor}
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 0.5 * i, ease: "easeOut" }}
            />
          </g>
        ))}

        {/* India Hub */}
        {projectedPoints.length > 0 && (
          <g key="india-hub">
            {/* Main India marker */}
            <circle
              cx={projectedPoints[0].start.x}
              cy={projectedPoints[0].start.y}
              r="4"
              fill={lineColor}
              stroke={lineColor}
              strokeWidth="1"
            />
            {/* Pulsing circles */}
            <circle
              cx={projectedPoints[0].start.x}
              cy={projectedPoints[0].start.y}
              r="4"
              fill={lineColor}
              opacity="0.8"
            >
              <animate
                attributeName="r"
                from="4"
                to="15"
                dur="2s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                from="0.8"
                to="0"
                dur="2s"
                repeatCount="indefinite"
              />
            </circle>
            <circle
              cx={projectedPoints[0].start.x}
              cy={projectedPoints[0].start.y}
              r="4"
              fill={lineColor}
              opacity="0.5"
            >
              <animate
                attributeName="r"
                from="4"
                to="20"
                dur="3s"
                begin="0.8s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                from="0.5"
                to="0"
                dur="3s"
                begin="0.8s"
                repeatCount="indefinite"
              />
            </circle>
            {/* India label */}
            <text
              x={projectedPoints[0].start.x}
              y={projectedPoints[0].start.y - 25}
              textAnchor="middle"
              fill={lineColor}
              fontSize="12"
              fontWeight="bold"
              opacity="0.9"
            >
              INDIA
            </text>
          </g>
        )}

        {/* Endpoints */}
        {projectedPoints.map((points, i) => (
          <g key={`points-group-${i}`}>
            <circle
              cx={points.end.x}
              cy={points.end.y}
              r="2"
              fill={lineColor}
            />
            <circle
              cx={points.end.x}
              cy={points.end.y}
              r="2"
              fill={lineColor}
              opacity="0.5"
            >
              <animate
                attributeName="r"
                from="2"
                to="8"
                dur="1.5s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                from="0.5"
                to="0"
                dur="1.5s"
                repeatCount="indefinite"
              />
            </circle>
          </g>
        ))}
      </svg>
    </div>
  );
}
