import { ApplicationStatus } from './common.model';

export interface UpdateApplicationStatusDto {
  status: ApplicationStatus;
}

export interface ApplicationDto {
  id: string;
  userId: string;
  jobOfferId: string;
  status: ApplicationStatus;
  message?: string;
  matchScore?: number;
  createdAt?: string;
  updatedAt?: string;
  user?: {
    id: string;
    fullName?: string;
    email: string;
    avatarUrl?: string;
  };
  jobOffer?: {
    id: string;
    title: string;
    description?: string;
    salaryFrom?: string;
    salaryTo?: string;
    currency?: string;
    location?: string;
    address?: string;
    latitude?: number;
    longitude?: number;
    workType?: string;
    contractType?: string;
    isActive?: boolean;
    companyId: string;
    company?: {
      id: string;
      name: string;
      logoUrl?: string;
      location?: string;
      country?: string;
      employeeCount?: string;
    };
  };
}
