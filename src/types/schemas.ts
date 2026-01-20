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
  MonthsOfExperience?: number;
  Coverletter: string;
  ResumeLink: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface VisitorSchema {
  _id?: string;
  ip: string;
  city: string;
  region: string;
  country: string;
  countryCode: string;
  latitude: number | null;
  longitude: number | null;
  timezone: string;
  userAgent: string;
  referrer: string;
  sessionId: string;
  visitCount: number;
  lastVisit: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface VisitorStatistics {
  totalVisits: number;
  uniqueVisitors: number;
  recentVisitors24h: number;
  topCountries: Array<{ country: string; count: number }>;
  visitsByDate: Array<{ date: string; count: number }>;
}

// Union type for all data types
export type AdminDataType = ContactSchema | EnquirySchema | JobApplySchema | VisitorSchema;

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T[];
  message?: string;
  error?: string;
}

export interface VisitorApiResponse {
  success: boolean;
  visitors: VisitorSchema[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalVisitors: number;
    limit: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
  statistics?: VisitorStatistics;
}
