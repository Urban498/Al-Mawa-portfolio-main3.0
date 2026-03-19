"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminPageLayout from "@/components/AdminPageLayout";

interface ReferralApplication {
  _id?: string;
  fullName: string;
  emailAddress: string;
  phoneNumber: number;
  companyName: string;
  designationPosition: string;
  referralSource: string;
  interestedServices: string;
  clientDetails?: string;
  message?: string;
  createdAt?: string;
}

function ReferralApplicationsContent() {
  const [applications, setApplications] = useState<ReferralApplication[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [loading, setLoading] = useState(true);

  const handleGet = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/referral-apply");
      const apps = Array.isArray(response.data.data) ? response.data.data.slice() : [];
      setApplications(apps);
      setCurrentPage(1);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGet();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [applications.length]);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-3 py-2">Full Name</th>
              <th className="border px-3 py-2">Email</th>
              <th className="border px-3 py-2">Phone</th>
              <th className="border px-3 py-2">Company</th>
              <th className="border px-3 py-2">Position</th>
              <th className="border px-3 py-2">Referral Source</th>
              <th className="border px-3 py-2">Interested Services</th>
              <th className="border px-3 py-2">Client Details</th>
              <th className="border px-3 py-2">Message</th>
              <th className="border px-3 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {(() => {
              const start = (currentPage - 1) * pageSize;
              const end = start + pageSize;
              const pageItems = applications.slice(start, end);
              return pageItems.length > 0 ? (
                pageItems.map((app, i) => (
                  <tr key={app._id || i}>
                    <td className="border px-3 py-2">{app.fullName}</td>
                    <td className="border px-3 py-2">{app.emailAddress}</td>
                    <td className="border px-3 py-2">{app.phoneNumber}</td>
                    <td className="border px-3 py-2">{app.companyName}</td>
                    <td className="border px-3 py-2">{app.designationPosition}</td>
                    <td className="border px-3 py-2">{app.referralSource}</td>
                    <td className="border px-3 py-2">{app.interestedServices}</td>
                    <td className="border px-3 py-2 text-xs">{app.clientDetails?.substring(0, 30)}...</td>
                    <td className="border px-3 py-2 text-xs">{app.message?.substring(0, 30)}...</td>
                    <td className="border px-3 py-2 text-xs">
                      {app.createdAt ? new Date(app.createdAt).toLocaleDateString() : "N/A"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={10} className="border px-3 py-2 text-center text-gray-500">
                    No referral applications found
                  </td>
                </tr>
              );
            })()}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Showing{" "}
          {applications.length === 0
            ? 0
            : Math.min((currentPage - 1) * pageSize + 1, applications.length)}{" "}
          to {Math.min(currentPage * pageSize, applications.length)} of{" "}
          {applications.length}
        </div>
        <div className="flex items-center gap-2">
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="border border-gray-300 rounded px-2 py-1"
          >
            <option value="10">10 per page</option>
            <option value="20">20 per page</option>
            <option value="50">50 per page</option>
          </select>
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Previous
          </button>
          <span className="text-sm">
            Page {applications.length === 0 ? 0 : currentPage}
          </span>
          <button
            onClick={() =>
              setCurrentPage(
                Math.min(
                  Math.ceil(applications.length / pageSize),
                  currentPage + 1
                )
              )
            }
            disabled={currentPage >= Math.ceil(applications.length / pageSize)}
            className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default function ReferralApplicationsPage() {
  return (
    <AdminPageLayout title="Referral Applications" section="referral">
      <ReferralApplicationsContent />
    </AdminPageLayout>
  );
}
