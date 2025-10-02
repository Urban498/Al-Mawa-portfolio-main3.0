// TypeScript interfaces matching your MongoDB schemas

export interface ContactSchema {
  _id?: string;
  firstname: string;
  lastName: string;
  emailAddress: string;
  phoneNumber: number;
  selecetCountry: string;
  subject: string;
  tellUSAboutYou: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface EnquirySchema {
  _id?: string;
  fullName: string;
  Email: string;
  Number: number;
  ServiceIntrestedIn: string;
  ProjectDetails: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface JobApplySchema {
  _id?: string;
  FirstName: string;
  LastName: string;
  EmailAddress: string;
  PhoneNumber: number;
  YearOfExperience: number;
  Coverletter: string;
  ResumeLink: string;
  createdAt?: string;
  updatedAt?: string;
}

// Union type for all data types
export type AdminDataType = ContactSchema | EnquirySchema | JobApplySchema;

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T[];
  message?: string;
  error?: string;
}
