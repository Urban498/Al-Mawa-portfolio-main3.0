"use client";

import React, { useState, useEffect, useCallback, Suspense } from "react";
import LoginPage from "@/components/login";
import AdminSidebar from "@/components/admin-sidebar";
import axios from "axios";
import { ContactSchema, EnquirySchema, JobApplySchema, AdminDataType, ApiResponse } from "@/types/schemas";
import { useSearchParams } from "next/navigation";
import JobPostForm from "@/components/admin/JobPostForm";
import JobManagement from "@/components/admin/JobManagement";

function AdminContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("contact");
  const [data, setData] = useState<AdminDataType[]>([]);
  const searchParams = useSearchParams();
  const sectionParam = searchParams.get('section');

  const checkAuthStatus = useCallback(async () => {
    try {
      // If coming from cards page with section parameter, assume authenticated
      if (sectionParam) {
        setIsAuthenticated(true);
        setActiveSection(sectionParam);
        setIsLoading(false);
        return;
      }
      
      // Check if user is authenticated by making a request to a protected route
      const response = await fetch('/api/check-auth');
      if (response.ok) {
        setIsAuthenticated(true);
      }
    } catch {
      console.log("Not authenticated");
    } finally {
      setIsLoading(false);
    }
  }, [sectionParam]);

  const fetchData = useCallback(async () => {
    try {
      let endpoint = "";
      switch (activeSection) {
        case "contact":
          endpoint = "/api/contact-us";
          break;
        case "enquiry":
          endpoint = "/api/enquiry";
          break;
        case "jobs":
          endpoint = "/api/job-apply-form";
          break;
        default:
          return;
      }
      
      const response = await axios.get<ApiResponse<AdminDataType>>(endpoint);
      if (response.data.success && response.data.data) {
        setData(response.data.data);
      } else {
        setData([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
    }
  }, [activeSection]);

  // Check authentication status on component mount
  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  // Fetch data when active section changes
  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [activeSection, isAuthenticated, fetchData]);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveSection("contact");
    setData([]);
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
            {activeSection === "jobs" ? "Job Applications" : 
             activeSection === "post-jobs" ? "Post New Job" :
             activeSection === "manage-jobs" ? "Manage Jobs" : activeSection}
          </h1>
        </div>

        {activeSection === "post-jobs" ? (
          <JobPostForm />
        ) : activeSection === "manage-jobs" ? (
          <JobManagement />
        ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 max-w-full">
          {data.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    {activeSection === "contact" && (
                      <>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-gray-100">First Name</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-gray-100">Last Name</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-gray-100">Email</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-gray-100">Phone</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-gray-100">Country</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-gray-100">Subject</th>
                      </>
                    )}
                    {activeSection === "enquiry" && (
                      <>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-gray-100">Full Name</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-gray-100">Email</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-gray-100">Phone</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-gray-100">Service</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-gray-100">Project Details</th>
                      </>
                    )}
                    {activeSection === "jobs" && (
                      <>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-gray-100">First Name</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-gray-100">Last Name</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-gray-100">Email</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-gray-100">Phone</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-gray-100">Experience</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-gray-100">Resume</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                  {data.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      {activeSection === "contact" && (
                        <>
                          <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
                            {(item as ContactSchema).firstname}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
                            {(item as ContactSchema).lastName}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
                            {(item as ContactSchema).emailAddress}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
                            {(item as ContactSchema).phoneNumber}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
                            {(item as ContactSchema).selecetCountry}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
                            {(item as ContactSchema).subject}
                          </td>
                        </>
                      )}
                      {activeSection === "enquiry" && (
                        <>
                          <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
                            {(item as EnquirySchema).fullName}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
                            {(item as EnquirySchema).Email}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
                            {(item as EnquirySchema).Number}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
                            {(item as EnquirySchema).ServiceIntrestedIn}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
                            {(item as EnquirySchema).ProjectDetails?.substring(0, 50)}...
                          </td>
                        </>
                      )}
                      {activeSection === "jobs" && (
                        <>
                          <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
                            {(item as JobApplySchema).FirstName}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
                            {(item as JobApplySchema).LastName}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
                            {(item as JobApplySchema).EmailAddress}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
                            {(item as JobApplySchema).PhoneNumber}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
                            {(item as JobApplySchema).YearOfExperience} years
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
                            <a href={(item as JobApplySchema).ResumeLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                              View Resume
                            </a>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
              No data available for {activeSection}
            </div>
          )}
        </div>
        )}
      </div>
    </div>
  );
}

export default function AdminPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    }>
      <AdminContent />
    </Suspense>
  );
}
