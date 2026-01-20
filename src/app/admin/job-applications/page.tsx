"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

interface JobApplication {
  _id?: string;
  FirstName: string;
  LastName: string;
  EmailAddress: string;
  PhoneNumber: number;
  YearOfExperience: number;
  MonthsOfExperience?: number;
  Coverletter: string;
  ResumeLink: string;
}

export default function JobApplicationsPage() {
  const [jobs, setJobs] = useState<JobApplication[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  const handleGet = async ()=>{
    try {
      const response = await axios.get('/api/job-apply-form')
      console.log(response.data.data)
      // Ensure newest applications show at the top. Sort by `_id` (ObjectId contains timestamp).
      const apps = Array.isArray(response.data.data) ? response.data.data.slice() : [];
      apps.sort((a: JobApplication, b: JobApplication) => (b._id || "").localeCompare(a._id || ""));
      setJobs(apps);
      setCurrentPage(1);
      
    } catch (error) {
      console.log(error);
      
    }
  }
  useEffect(()=>{
    handleGet();
  },[])

  useEffect(() => {
    // Reset to first page if jobs change length
    setCurrentPage(1);
  }, [jobs.length]);

  // useEffect(() => {
  //   api.get("/job-applications") // GET API
  //     .then((res) => setJobs(res.data))
  //     .catch((err) => console.error(err));
  // }, []);

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Job Applications</h1>
      <table className="w-full border border-gray-300 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-3 py-2">First Name</th>
            <th className="border px-3 py-2">Last Name</th>
            <th className="border px-3 py-2">Email Address</th>
            <th className="border px-3 py-2">Phone Number</th>
            <th className="border px-3 py-2">Experience</th>
            <th className="border px-3 py-2">Cover letter</th>
            <th className="border px-3 py-2">Resume Link</th>

          </tr>
        </thead>
        <tbody>
          {(() => {
            const start = (currentPage - 1) * pageSize;
            const end = start + pageSize;
            const pageItems = jobs.slice(start, end);
            return pageItems.map((j, i) => (
              <tr key={j._id || i}>
                <td className="border px-3 py-2">{j.FirstName}</td>
                <td className="border px-3 py-2">{j.LastName}</td>
                <td className="border px-3 py-2">{j.EmailAddress}</td>
                <td className="border px-3 py-2">{j.PhoneNumber}</td>
                <td className="border px-3 py-2">{j.YearOfExperience} yrs {j.MonthsOfExperience || 0} mos</td>
                <td className="border px-3 py-2">{j.Coverletter}</td>
                <td className="border px-3 py-2">
                  <a href={j.ResumeLink} target="_blank" className="text-blue-500 underline">
                    View
                  </a>
                </td>
              </tr>
            ));
          })()}
        </tbody>
      </table>
      {/* Pagination controls */}
      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Showing {(jobs.length === 0) ? 0 : (Math.min((currentPage - 1) * pageSize + 1, jobs.length))} to {Math.min(currentPage * pageSize, jobs.length)} of {jobs.length}
        </div>
        <div className="flex items-center gap-2">
          <select
            value={pageSize}
            onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}
            className="border px-2 py-1 rounded"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          <button
            onClick={() => setCurrentPage((p) => p + 1)}
            disabled={currentPage * pageSize >= jobs.length}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
