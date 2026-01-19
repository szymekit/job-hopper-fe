export interface UserProfileHeader {
  id: string;
  fullName: string;
  headline: string;
  description: string;
  avatarUrl: string;
  coverUrl: string;
  top10Badge: boolean;
  activeTab: 'service' | 'photographer' | 'reviews';
}

export interface UserProfileBasicInfo {
  citizenship: string;
  student: string;
  noCriminalRecord: string;
  drivingLicense: string;
}

export interface UserProfileExperience {
  description: string;
}

export interface UserProfileQualification {
  id: string;
  title: string;
  checked: boolean;
}

export interface UserProfileRole {
  id: string;
  title: string;
  level: string;
  description: string;
  hasInfoIcon: boolean;
  hasSetDefaultButton?: boolean;
  tags: string[];
}

export interface UserProfileCompletedOrder {
  id: string;
  companyName: string;
  logoUrl?: string;
  jobType: string;
  description: string;
  hasInfoIcon: boolean;
}

export interface UserProfileCertificate {
  id: string;
  title: string;
  trainingType: string;
  description: string;
}

export interface UserProfilePortfolioItem {
  id: string;
  title: string;
  imageUrl: string;
}

export interface UserProfileAvailableOrder {
  id: string;
  placeholder: boolean;
}

export interface UserProfileData {
  header: UserProfileHeader;
  availableOrders: UserProfileAvailableOrder[];
  basicInfo: UserProfileBasicInfo;
  experience: UserProfileExperience;
  qualifications: UserProfileQualification[];
  roles: UserProfileRole[];
  completedOrders: UserProfileCompletedOrder[];
  certificates: UserProfileCertificate[];
  portfolio: UserProfilePortfolioItem[];
}

