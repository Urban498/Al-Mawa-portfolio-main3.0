"use client";

import { VisitorStatistics } from "@/types/schemas";
import { Users, Globe, TrendingUp, Clock, RefreshCw } from "lucide-react";

interface VisitorStatsProps {
  statistics: VisitorStatistics | null;
  onRefresh: () => void;
  isRefreshing?: boolean;
}

export default function VisitorStats({ statistics, onRefresh, isRefreshing = false }: VisitorStatsProps) {
  if (!statistics) {
    return null;
  }

  const statCards = [
    {
      title: "Total Visits",
      value: statistics.totalVisits.toLocaleString(),
      icon: <TrendingUp className="w-6 h-6" />,
      color: "bg-blue-500",
    },
    {
      title: "Unique Visitors",
      value: statistics.uniqueVisitors.toLocaleString(),
      icon: <Users className="w-6 h-6" />,
      color: "bg-green-500",
    },
    {
      title: "Last 24 Hours",
      value: statistics.recentVisitors24h.toLocaleString(),
      icon: <Clock className="w-6 h-6" />,
      color: "bg-purple-500",
    },
    {
      title: "Countries",
      value: statistics.topCountries.length.toString(),
      icon: <Globe className="w-6 h-6" />,
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="space-y-6 mb-6">
      {/* Stats Header with Refresh Button */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Visitor Statistics
        </h3>
        <button
          onClick={onRefresh}
          disabled={isRefreshing}
          className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          {isRefreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {stat.value}
                </p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg text-white`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Top Countries and Visits by Date */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Top Countries */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Top Countries
          </h3>
          <div className="space-y-3">
            {statistics.topCountries.slice(0, 5).map((country, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{getCountryFlag(country.country)}</span>
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {country.country}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{
                        width: `${(country.count / statistics.topCountries[0].count) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-gray-900 dark:text-gray-100 w-8 text-right">
                    {country.count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Visits by Date (Last 7 Days) */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Last 7 Days
          </h3>
          <div className="space-y-3">
            {statistics.visitsByDate.map((day, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {formatDate(day.date)}
                </span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{
                        width: `${(day.count / Math.max(...statistics.visitsByDate.map(d => d.count))) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-gray-900 dark:text-gray-100 w-8 text-right">
                    {day.count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function to get country flag emoji
function getCountryFlag(countryName: string): string {
  const countryFlags: { [key: string]: string } = {
    India: "🇮🇳",
    "United States": "🇺🇸",
    "United Kingdom": "🇬🇧",
    Canada: "🇨🇦",
    Australia: "🇦🇺",
    Germany: "🇩🇪",
    France: "🇫🇷",
    Japan: "🇯🇵",
    China: "🇨🇳",
    Brazil: "🇧🇷",
    Unknown: "🌍",
  };
  return countryFlags[countryName] || "🌍";
}

// Helper function to format date
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return "Today";
  } else if (date.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  } else {
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  }
}
