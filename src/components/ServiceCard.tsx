import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  buttonLabel?: string;
  onClick?: () => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  icon: Icon,
  title,
  description,
  buttonLabel = 'Learn More',
  onClick
}) => {
  return (
    <div className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 p-6 flex flex-col h-full border border-gray-100 hover:border-blue-200">
      {/* Icon Container */}
      <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg flex items-center justify-center mb-4 group-hover:from-blue-100 group-hover:to-indigo-100 transition-colors duration-300">
        <Icon className="w-6 h-6 text-blue-600" />
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300">
        {title}
      </h3>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-6 flex-grow leading-relaxed">
        {description}
      </p>

      {/* Button */}
      <button
        onClick={onClick}
        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-2 px-4 rounded-md transition-all duration-300 transform group-hover:shadow-lg"
      >
        {buttonLabel}
      </button>
    </div>
  );
};
