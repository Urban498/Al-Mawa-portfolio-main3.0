"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

interface Enquiry {
  fullName: string;
  Email: string;
  Number: string;
  ServiceIntrestedIn: string;
  ProjectDetails: string;
}

export default function AdminEnquiryPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);

  const handleGet = async ()=>{
    try {
      const response = await axios.get('/api/enquiry')
      console.log(response.data);
      setEnquiries(response.data.data)
      
    } catch (error) {
      console.log(error);
      
      
    }
  }
  useEffect(()=>{
    handleGet();
  },[])

  // useEffect(() => {
  //   api.get("/enquiries") // GET API
  //     .then((res) => setEnquiries(res.data))
  //     .catch((err) => console.error(err));
  // }, []);

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Enquiries</h1>
      <table className="w-full border border-gray-300 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-3 py-2">Full Name</th>
            <th className="border px-3 py-2">Email</th>
            <th className="border px-3 py-2">Number</th>
            <th className="border px-3 py-2">Service Intrested In</th>
            <th className="border px-3 py-2">Project Details</th>

          </tr>
        </thead>
        <tbody>
          {enquiries.map((e, i) => (
            <tr key={i}>
              <td className="border px-3 py-2">{e.fullName}</td>
              <td className="border px-3 py-2">{e.Email}</td>
              <td className="border px-3 py-2">{e.Number}</td>
              <td className="border px-3 py-2">{e.ServiceIntrestedIn}</td>
              <td className="border px-3 py-2">{e.ProjectDetails}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
