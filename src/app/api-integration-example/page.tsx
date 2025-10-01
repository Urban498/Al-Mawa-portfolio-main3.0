"use client";

import { useState } from 'react';
import { toast } from 'sonner';
import { submitContactForm, submitJobApplication } from '@/lib/formServices';

export default function ApiIntegrationExample() {
  const [contactLoading, setContactLoading] = useState(false);
  const [jobLoading, setJobLoading] = useState(false);

  // Contact form handler
  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setContactLoading(true);

    try {
      console.log('📤 Starting contact form submission...');
      const formData = new FormData(e.currentTarget);
      
      const contactData = {
        firstname: formData.get('firstname') as string,
        lastName: formData.get('lastName') as string,
        emailAddress: formData.get('emailAddress') as string,
        phoneNumber: parseInt(formData.get('phoneNumber') as string, 10),
        selecetCountry: formData.get('selecetCountry') as string,
        subject: formData.get('subject') as string,
        tellUSAboutYou: formData.get('tellUSAboutYou') as string,
      };
      
      console.log('📝 Contact form data:', contactData);
      
      const result = await submitContactForm(contactData);
      console.log('✅ Contact form result:', result);

      // Show success toast
      console.log('🎉 Showing contact success toast...');
      toast.success('Contact form submitted successfully!', {
        description: 'Thank you for reaching out. We\'ll get back to you soon.',
      });
      
      // Reset form
      e.currentTarget.reset();

    } catch (error: unknown) {
      console.error('❌ Contact form error:', error);
      
      // Show error toast
      console.log('🚨 Showing contact error toast...');
      toast.error('Failed to submit contact form', {
        description: error instanceof Error ? error.message : 'Please try again later.',
      });
    } finally {
      setContactLoading(false);
    }
  };

  // Job application form handler
  const handleJobApplicationSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setJobLoading(true);

    try {
      console.log('📤 Starting job application submission...');
      const formData = new FormData(e.currentTarget);
      
      // Log form data for debugging
      console.log('📝 Form data entries:');
      for (const [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }
      
      const result = await submitJobApplication(formData);
      console.log('✅ Job application result:', result);

      // Show success toast
      console.log('🎉 Showing success toast...');
      toast.success('Job application submitted successfully!', {
        description: 'Your application has been received. We\'ll review it and get back to you soon.',
      });
      
      // Reset form
      e.currentTarget.reset();

    } catch (error: unknown) {
      console.error('❌ Job application error:', error);
      
      // Show error toast
      console.log('🚨 Showing error toast...');
      toast.error('Failed to submit job application', {
        description: error instanceof Error ? error.message : 'Please check your information and try again.',
      });
    } finally {
      setJobLoading(false);
    }
  };

  const testToast = () => {
    console.log('🧪 Testing toast...');
    toast.success('Test toast is working!', {
      description: 'This is a test to verify toast functionality.',
    });
  };

  const testContactToast = () => {
    console.log('🧪 Testing contact success toast...');
    toast.success('Contact form submitted successfully!', {
      description: 'Thank you for reaching out. We\'ll get back to you soon.',
    });
  };

  const testContactErrorToast = () => {
    console.log('🧪 Testing contact error toast...');
    toast.error('Failed to submit contact form', {
      description: 'Please try again later.',
    });
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">API Integration Examples</h1>
      
      {/* Test Toast Buttons */}
      <div className="mb-8 flex gap-4">
        <button
          onClick={testToast}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Test Toast
        </button>
        <button
          onClick={testContactToast}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Test Contact Success
        </button>
        <button
          onClick={testContactErrorToast}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Test Contact Error
        </button>
      </div>

      {/* Contact Form Example */}
      <form onSubmit={handleContactSubmit} className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Contact Form</h2>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            name="firstname"
            placeholder="First Name"
            className="p-2 border rounded"
            required
          />
          <input
            name="lastName"
            placeholder="Last Name"
            className="p-2 border rounded"
            required
          />
        </div>

        <input
          name="emailAddress"
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded mb-4"
          required
        />

        <input
          name="phoneNumber"
          type="tel"
          placeholder="Phone Number"
          className="w-full p-2 border rounded mb-4"
          required
        />

        <select name="selecetCountry" className="w-full p-2 border rounded mb-4" required>
          <option value="">Select Country</option>
          <option value="India">India</option>
          <option value="USA">USA</option>
        </select>

        <input
          name="subject"
          placeholder="Subject"
          className="w-full p-2 border rounded mb-4"
          required
        />

        <textarea
          name="tellUSAboutYou"
          placeholder="Tell us about you"
          className="w-full p-2 border rounded mb-4"
          rows={4}
          required
        />

        <button
          type="submit"
          disabled={contactLoading}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {contactLoading ? 'Submitting...' : 'Submit Contact Form'}
        </button>
      </form>

      {/* Job Application Form Example */}
      <form onSubmit={handleJobApplicationSubmit} className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Job Application Form</h2>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            name="firstName"
            placeholder="First Name"
            className="p-2 border rounded"
            required
          />
          <input
            name="lastName"
            placeholder="Last Name"
            className="p-2 border rounded"
            required
          />
        </div>

        <input
          name="emailAddress"
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded mb-4"
          required
        />

        <input
          name="phoneNumber"
          type="tel"
          placeholder="Phone Number"
          className="w-full p-2 border rounded mb-4"
          required
        />

        <input
          name="yearOfExperience"
          type="number"
          placeholder="Years of Experience"
          className="w-full p-2 border rounded mb-4"
          required
        />

        <textarea
          name="coverLetter"
          placeholder="Cover Letter"
          className="w-full p-2 border rounded mb-4"
          rows={4}
          required
        />

        <input
          name="resume"
          type="file"
          accept=".pdf,.doc,.docx"
          className="w-full p-2 border rounded mb-4"
          required
        />

        <button
          type="submit"
          disabled={jobLoading}
          className="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {jobLoading ? 'Submitting...' : 'Submit Job Application'}
        </button>
      </form>
    </div>
  );
}
