"use client";

import React, { useEffect, useState } from "react";
import api from "@/lib/axios";
import axios from "axios";

interface Contact {
  firstname: string;
  lastName: string;
  emailAddress: string;
  phoneNumber: string;
  selecetCountry: string;
  subject: string;
  tellUSAboutYou: string;
}

export default function AdminContactPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);

  const handleGet = async() => {
    try {
      const response = await axios.get("/api/contact-us")
      console.log(response.data);
      setContacts(response.data.data)
    } catch (error) {
     console.log(error);
      
    }
  }

  useEffect(() => {
    handleGet();
  }, [])

  // useEffect(() => {
  //   api.get("/contact-us") // GET API
  //     .then((res) => setContacts(res.data))
  //     .then
  //     .catch((err) => console.error(err));
  // }, []);

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Contact Data</h1>
      <table className="w-full border border-gray-300 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-3 py-2">Name</th>
            <th className="border px-3 py-2">Last Name</th>
            <th className="border px-3 py-2">Email</th>
            <th className="border px-3 py-2">Phone Number</th>
            <th className="border px-3 py-2">Country</th>
            <th className="border px-3 py-2">subject</th>
            <th className="border px-3 py-2">Tell us About you</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((c, i) => (
            <tr key={i}>
              <td className="border px-3 py-2">{c.firstname}</td>
              <td className="border px-3 py-2">{c.lastName}</td>
              <td className="border px-3 py-2">{c.emailAddress}</td>
              <td className="border px-3 py-2">{c.phoneNumber}</td>
              <td className="border px-3 py-2">{c.selecetCountry}</td>
              <td className="border px-3 py-2">{c.subject}</td>
              <td className="border px-3 py-2">{c.tellUSAboutYou}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
