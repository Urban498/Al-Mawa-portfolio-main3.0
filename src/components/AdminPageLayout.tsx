"use client";

import React, { useState, useEffect } from "react";
import LoginPage from "@/components/login";
import AdminSidebar from "@/components/admin-sidebar";
import axios from "axios";
import { toast } from "sonner";

interface AdminPageLayoutProps {
  children: React.ReactNode;
  title: string;
  section: string;
}

export default function AdminPageLayout({ 
  children, 
  title,
  section 
}: AdminPageLayoutProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState(section);

  const checkAuthStatus = async () => {
    try {
      const response = await fetch('/api/check-auth');
      if (response.ok) {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.log("Not authenticated");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setIsLoading(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveSection("contact");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginPage onLoginSuccess={handleLogin} />;
  }

  return (
    <div className="flex min-h-screen bg-neutral-50 dark:bg-neutral-900 relative">
      {/* Sidebar */}
      <div className="shrink-0">
        <AdminSidebar 
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          onLogout={handleLogout}
        />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6 min-h-screen overflow-auto min-w-0">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 capitalize">
            {title}
          </h1>
        </div>
        {children}
      </div>
    </div>
  );
}
