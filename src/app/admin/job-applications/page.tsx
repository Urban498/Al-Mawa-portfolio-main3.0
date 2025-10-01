"use client";

import React, { useEffect, useState } from "react";
import api from "@/lib/axios";
import axios from "axios";

interface JobApplication {
  FirstName: string;
  LastName: string;
  EmailAddress: string;
  PhoneNumber: number;
  YearOfExperience: number;
  Coverletter: string;
  ResumeLink: string;
}

export default function JobApplicationsPage() {
  const [jobs, setJobs] = useState<JobApplication[]>([]);

  const handleGet = async ()=>{
    try {
      const response = await axios.get('/api/job-apply-form')
      console.log(response.data.data)
      setJobs(response.data.data)
      
    } catch (error) {
      console.log(error);
      
    }
  }
  useEffect(()=>{
    handleGet();
  },[])

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
            <th className="border px-3 py-2">Year Of Experience</th>
            <th className="border px-3 py-2">Cover letter</th>
            <th className="border px-3 py-2">Resume Link</th>

          </tr>
        </thead>
        <tbody>
          {jobs.map((j, i) => (
            <tr key={i}>
              <td className="border px-3 py-2">{j.FirstName}</td>
              <td className="border px-3 py-2">{j.LastName}</td>
              <td className="border px-3 py-2">{j.EmailAddress}</td>
              <td className="border px-3 py-2">{j.PhoneNumber}</td>
              <td className="border px-3 py-2">{j.YearOfExperience}</td>
              <td className="border px-3 py-2">{j.Coverletter}</td>
              <td className="border px-3 py-2">
                <a href={j.ResumeLink} target="_blank" className="text-blue-500 underline">
                  View
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
