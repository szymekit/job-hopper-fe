export interface CompanyProfileHeader {
  id: string;
  companyName: string;
  tagline: string;
  logoUrl: string;
  coverUrl: string;
  companyType: string;
  location: string;
  country: string;
  employeeCount: string;
  activeRecruitment: boolean;
}

export interface CompanyProfileSummaryCard {
  id: string;
  label: string;
  value: string;
}

export interface CompanyProfileNavigationTab {
  id: string;
  label: string;
  active: boolean;
}

export interface CompanyProfileAboutSection {
  id: string;
  title: string;
  content: string;
}

export interface CompanyProfileBenefit {
  id: string;
  title: string;
  description: string;
  tags: string[];
}

export interface CompanyProfilePortfolioItem {
  id: string;
  imageUrl: string;
  title: string;
}

export interface CompanyProfileJobOffer {
  id: string;
  iconUrl?: string;
  title: string;
  companyName: string;
  location: string;
  employeeCount: string;
  activeDays: string;
  description: string;
  tags: string[];
}

export interface CompanyProfileReview {
  id: string;
  authorInitials: string;
  iconUrl?: string;
  content: string;
}

export interface CompanyProfileData {
  header: CompanyProfileHeader;
  summaryCards: CompanyProfileSummaryCard[];
  navigationTabs: CompanyProfileNavigationTab[];
  aboutSections: CompanyProfileAboutSection[];
  benefits: CompanyProfileBenefit[];
  portfolio: CompanyProfilePortfolioItem[];
  jobOffers: CompanyProfileJobOffer[];
  reviews: CompanyProfileReview[];
  totalReviews: number;
}
