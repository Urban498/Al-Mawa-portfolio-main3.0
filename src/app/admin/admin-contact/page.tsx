"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Contact {
  id: string;
  firstname: string;
  lastName: string;
  emailAddress: string;
  phoneNumber: string;
  selecetCountry: string;
  subject: string;
  tellUSAboutYou: string;
}

interface RawContact {
  _id: string;
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

  // ✅ Fetch all contact data
  const handleGet = async () => {
    try {
      const response = await axios.get("/api/contact-us/get");
      console.log("Fetched contacts:", response.data);

      setContacts(
        response.data.data.map((c: RawContact) => ({
          id: c._id,
          firstname: c.firstname,
          lastName: c.lastName,
          emailAddress: c.emailAddress,
          phoneNumber: c.phoneNumber,
          selecetCountry: c.selecetCountry,
          subject: c.subject,
          tellUSAboutYou: c.tellUSAboutYou,
        }))
      );
    } catch (error) {
      console.log("GET error:", error);
      toast.error("Failed to fetch contacts");
    }
  };

  useEffect(() => {
    handleGet();
  }, []);

  // ✅ Delete contact with Toastify notification
  const handleDelete = async (id: string) => {
    try {
      const res = await axios.delete(`/api/contact-us/${id}`);
      console.log("Delete response:", res.data);

      if (res.data.success) {
        toast.success("Contact deleted successfully!");
        handleGet();
      } else {
        toast.error("Failed to delete contact");
      }
    } catch (error) {
      console.log("DELETE error:", error);
      toast.error("An error occurred while deleting");
    }
  };

  return (
    <div className="p-6">
      {/* Toast container */}
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} />

      <h1 className="text-2xl font-bold mb-6">Contact Data</h1>
      <table className="w-full border border-gray-300 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-3 py-2">First Name</th>
            <th className="border px-3 py-2">Last Name</th>
            <th className="border px-3 py-2">Email</th>
            <th className="border px-3 py-2">Phone</th>
            <th className="border px-3 py-2">Country</th>
            <th className="border px-3 py-2">Subject</th>
            <th className="border px-3 py-2">Tell Us About You</th>
            <th className="border px-3 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {contacts.length > 0 ? (
            contacts.map((c, i) => (
              <tr key={i}>
                <td className="border px-3 py-2">{c.firstname}</td>
                <td className="border px-3 py-2">{c.lastName}</td>
                <td className="border px-3 py-2">{c.emailAddress}</td>
                <td className="border px-3 py-2">{c.phoneNumber}</td>
                <td className="border px-3 py-2">{c.selecetCountry}</td>
                <td className="border px-3 py-2">{c.subject}</td>
                <td className="border px-3 py-2">{c.tellUSAboutYou}</td>
                <td className="border px-3 py-2 text-center">
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={8}
                className="border px-3 py-4 text-center text-gray-500"
              >
                No contact data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
