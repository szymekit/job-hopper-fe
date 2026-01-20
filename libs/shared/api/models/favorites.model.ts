export interface SavedOfferStatusResponse {
  saved: boolean;
}

export interface FollowedCompanyStatusResponse {
  followed: boolean;
}

export interface SavedOfferDto {
  id: string;
  offerId: string;
  userId: string;
  offer?: {
    id: string;
    title: string;
    company?: {
      id: string;
      name: string;
      logoUrl?: string;
    };
    location: string;
    salaryFrom?: number;
    salaryTo?: number;
    currency?: string;
  };
  createdAt: string;
}

export interface FollowedCompanyDto {
  id: string;
  companyId: string;
  userId: string;
  company?: {
    id: string;
    name: string;
    logoUrl?: string;
    tagline?: string;
    location?: string;
  };
  createdAt: string;
}
