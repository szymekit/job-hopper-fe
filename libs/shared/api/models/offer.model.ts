export type WorkType = 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'INTERNSHIP';
export type ContractType = 'UOP' | 'B2B' | 'UZ' | 'RDR';
export type JobOfferSectionType = 'ABOUT' | 'COMPETENCIES' | 'BENEFITS';

export interface CreateJobOfferSectionDto {
  type: JobOfferSectionType;
  title?: string;
  items: string[];
}

export interface CreateOfferDto {
  title: string;
  description: string;
  salaryFrom?: number;
  salaryTo?: number;
  currency?: string;
  location: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  workType?: WorkType;
  contractType?: ContractType;
  isActive?: boolean;
  tags?: string[];
  skills?: string[];
  sections?: CreateJobOfferSectionDto[];
  companyId?: string;
}

export interface UpdateOfferDto {
  title?: string;
  description?: string;
  salaryFrom?: number;
  salaryTo?: number;
  currency?: string;
  location?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  workType?: WorkType;
  contractType?: ContractType;
  isActive?: boolean;
  tags?: string[];
  skills?: string[];
  sections?: CreateJobOfferSectionDto[];
}

export interface TagDto {
  id: string;
  name: string;
  jobOfferId: string;
}

export interface SkillDto {
  id: string;
  name: string;
  jobOfferId: string;
}

export interface JobOfferSectionDto {
  id: string;
  type: JobOfferSectionType;
  title?: string;
  items: string[];
  jobOfferId: string;
}

export interface OfferDto {
  id: string;
  title: string;
  description: string;
  salaryFrom?: string | number;
  salaryTo?: string | number;
  currency?: string;
  location: string;
  address?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  workType?: WorkType;
  contractType?: ContractType;
  isActive: boolean;
  tags?: TagDto[];
  skills?: SkillDto[];
  sections?: JobOfferSectionDto[];
  companyId: string;
  company?: {
    id: string;
    name: string;
    tagline?: string;
    logoUrl?: string;
    coverUrl?: string;
    description?: string;
    companyType?: string;
    location?: string;
    country?: string;
    employeeCount?: string;
    headquarters?: string;
    website?: string;
    activeRecruitment?: boolean;
    recruiterId?: string;
    recruiter?: {
      id: string;
      email: string;
      fullName?: string;
    };
  };
  createdAt?: string;
  updatedAt?: string;
  _count?: {
    applications?: number;
  };
}

export interface OfferFilters {
  search?: string;
  location?: string;
  country?: string;
  workType?: WorkType;
  contractType?: ContractType;
  salaryFrom?: number;
  salaryTo?: number;
  tags?: string[];
  skills?: string[];
  companyId?: string;
  page?: number;
  limit?: number;
  includeMatchScore?: string;
}

export interface MatchScoreResponse {
  score: number;
  offerId: string;
  userId: string;
}
