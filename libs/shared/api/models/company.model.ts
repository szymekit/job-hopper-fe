export interface CreateCompanyDto {
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
}

export interface UpdateCompanyDto {
  name?: string;
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
}

export interface CompanyDto {
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
  userId: string;
  createdAt?: string;
  updatedAt?: string;
}
