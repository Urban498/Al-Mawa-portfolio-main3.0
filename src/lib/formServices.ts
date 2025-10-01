// Type definitions for form data
export interface ContactFormData {
  firstname: string;
  lastName: string;
  emailAddress: string;
  phoneNumber: number;
  selecetCountry: string;
  subject: string;
  tellUSAboutYou: string;
}

export interface EnquiryFormData {
  fullName: string;
  Email: string;
  Number: number;
  ServiceIntrestedIn: string;
  ProjectDetails: string;
}

export interface JobApplicationResponse {
  success: boolean;
  message: string;
  data?: unknown;
}

export interface ContactFormResponse {
  success: boolean;
  message: string;
  data?: unknown;
}

export interface EnquiryFormResponse {
  success: boolean;
  message: string;
  data?: unknown;
}

// Contact form service
export const submitContactForm = async (contactData: ContactFormData): Promise<ContactFormResponse> => {
  try {
    const response = await fetch('/api/contact-us', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to submit contact form');
    }

    return data;
  } catch (error) {
    console.error('Contact form submission error:', error);
    throw error;
  }
};

// Enquiry form service
export const submitEnquiryForm = async (enquiryData: EnquiryFormData): Promise<EnquiryFormResponse> => {
  try {
    const response = await fetch('/api/enquiry', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(enquiryData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to submit enquiry form');
    }

    return data;
  } catch (error) {
    console.error('Enquiry form submission error:', error);
    throw error;
  }
};

// Job application service
export const submitJobApplication = async (formData: FormData): Promise<JobApplicationResponse> => {
  try {
    const response = await fetch('/api/job-apply-form', {
      method: 'POST',
      body: formData, // FormData object for file upload
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to submit job application');
    }

    return data;
  } catch (error) {
    console.error('Job application submission error:', error);
    throw error;
  }
};

// Get all job applications (admin function)
export const getJobApplications = async (): Promise<JobApplicationResponse> => {
  try {
    const response = await fetch('/api/job-apply-form');

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch job applications');
    }

    return data;
  } catch (error) {
    console.error('Get job applications error:', error);
    throw error;
  }
};
