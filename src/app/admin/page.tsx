"use client";

import React, { useState, useEffect, useCallback, Suspense } from "react";
import LoginPage from "@/components/login";
import AdminSidebar from "@/components/admin-sidebar";
import axios from "axios";
import { ContactSchema, EnquirySchema, JobApplySchema, AdminDataType, ApiResponse, VisitorApiResponse } from "@/types/schemas";
import { useSearchParams } from "next/navigation";
import JobPostForm from "@/components/admin/JobPostForm";
import JobManagement from "@/components/admin/JobManagement";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VisitorStats from "@/components/admin/VisitorStats";

function AdminContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("contact");
  const [data, setData] = useState<AdminDataType[]>([]);
  const [visitorData, setVisitorData] = useState<VisitorApiResponse | null>(null);
  const [visitorPage, setVisitorPage] = useState(1);
  const [visitorSearch, setVisitorSearch] = useState("");
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
      if (activeSection === "visitors") {
        // Fetch visitor data with pagination and statistics
        const searchParam = visitorSearch ? `&country=${encodeURIComponent(visitorSearch)}` : "";
        const response = await axios.get<VisitorApiResponse>(
          `/api/get-visitors?page=${visitorPage}&limit=20&stats=true${searchParam}`
        );
        if (response.data.success) {
          setVisitorData(response.data);
        }
        return;
      }

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
  }, [activeSection, visitorPage, visitorSearch]);

  // Check authentication status on component mount
  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  // Fetch data when active section changes
  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [activeSection, isAuthenticated, fetchData, visitorPage, visitorSearch]);

  // Reset search and page when changing sections
  useEffect(() => {
    setVisitorSearch("");
    setVisitorPage(1);
  }, [activeSection]);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveSection("contact");
    setData([]);
  };

  const handleDelete = async (id: string) => {
    try {
      let endpoint = "";
      switch (activeSection) {
        case "contact":
          endpoint = `/api/contact-us/${id}`;
          break;
        case "enquiry":
          endpoint = `/api/enquiry/${id}`;
          break;
        case "jobs":
          endpoint = `/api/job-apply-form/${id}`;
          break;
        case "visitors":
          toast.info("Visitor records cannot be deleted individually");
          return;
        default:
          return;
      }
      
      const response = await axios.delete(endpoint);
      if (response.data.success) {
        toast.success('Deleted successfully!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          
          });
        // Refresh data after successful delete
        fetchData();
        console.log(`${activeSection} deleted successfully`);
      }
    } catch (error) {
      console.error("Error deleting data:", error);
      toast.error("Failed to delete. Please try again.");
    }
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
             activeSection === "manage-jobs" ? "Manage Jobs" :
             activeSection === "visitors" ? "Website Visitors" : activeSection}
          </h1>
        </div>

        {/* Visitor Search Bar */}
        {activeSection === "visitors" && (
          <div className="mb-4">
            <div className="relative max-w-md">
              <input
                type="text"
                placeholder="Search by city or country..."
                value={visitorSearch}
                onChange={(e) => {
                  setVisitorSearch(e.target.value);
                  setVisitorPage(1); // Reset to first page on search
                }}
                className="w-full px-4 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              />
              {visitorSearch && (
                <button
                  onClick={() => setVisitorSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  ✕
                </button>
              )}
            </div>
            {visitorSearch && (
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Searching for: <span className="font-semibold">{visitorSearch}</span>
              </p>
            )}
          </div>
        )}

        {/* Visitor Statistics */}
        {activeSection === "visitors" && visitorData?.statistics && (
          <VisitorStats statistics={visitorData.statistics} />
        )}

        {activeSection === "post-jobs" ? (
          <JobPostForm />
        ) : activeSection === "manage-jobs" ? (
          <JobManagement />
        ) : activeSection === "visitors" ? (
          /* Visitors Table */
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 max-w-full">
            {visitorData && visitorData.visitors.length > 0 ? (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[800px]">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-gray-100">IP Address</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-gray-100">Location</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-gray-100">Country</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-gray-100">Visits</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-gray-100">Referrer</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-gray-100">Last Visit</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-gray-100">First Visit</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                      {visitorData.visitors.map((visitor, index) => (
                        <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100 font-mono">
                            {visitor.ip}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
                            {visitor.city}, {visitor.region}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
                            <span className="inline-flex items-center gap-1">
                              {visitor.country}
                              {visitor.countryCode !== "Unknown" && (
                                <span className="text-xs text-gray-500">({visitor.countryCode})</span>
                              )}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                              {visitor.visitCount}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100 max-w-xs truncate" title={visitor.referrer}>
                            {visitor.referrer === "Direct" ? (
                              <span className="text-gray-500 italic">Direct</span>
                            ) : (
                              <span className="text-blue-600 dark:text-blue-400">{new URL(visitor.referrer).hostname}</span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
                            {new Date(visitor.lastVisit).toLocaleString()}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
                            {visitor.createdAt && new Date(visitor.createdAt).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {visitorData.pagination && visitorData.pagination.totalPages > 1 && (
                  <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
                    <div className="text-sm text-gray-700 dark:text-gray-300">
                      Showing page {visitorData.pagination.currentPage} of {visitorData.pagination.totalPages}
                      <span className="ml-2 text-gray-500">
                        ({visitorData.pagination.totalVisitors} total visitors)
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setVisitorPage(prev => Math.max(1, prev - 1))}
                        disabled={!visitorData.pagination.hasPrevPage}
                        className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Previous
                      </button>
                      <button
                        onClick={() => setVisitorPage(prev => prev + 1)}
                        disabled={!visitorData.pagination.hasNextPage}
                        className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                No visitor data available
              </div>
            )}
          </div>
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
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-gray-100">Actions</th>
                      </>
                    )}
                    {activeSection === "enquiry" && (
                      <>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-gray-100">Full Name</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-gray-100">Email</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-gray-100">Phone</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-gray-100">Service</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-gray-100">Project Details</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-gray-100">Actions</th>
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
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-gray-100">Actions</th>
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
                          <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
                            <button
                              onClick={() => (item as ContactSchema)._id && handleDelete((item as ContactSchema)._id!)}
                              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs transition-colors"
                            >
                              Delete
                            </button>
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
                          <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
                            <button
                              onClick={() => (item as EnquirySchema)._id && handleDelete((item as EnquirySchema)._id!)}
                              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs transition-colors"
                            >
                              
                              Delete
                            </button>
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
                          <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
                            <button
                              onClick={() => (item as JobApplySchema)._id && handleDelete((item as JobApplySchema)._id!)}
                              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs transition-colors"
                            >
                              Delete
                            </button>
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
      
      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
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
