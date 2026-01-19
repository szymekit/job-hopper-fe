export interface JobOfferHeader {
  logoUrl: string;
  companyName: string;
  location: string;
}

export interface JobOfferDetails {
  id: string;
  title: string;
  header: JobOfferHeader;
  salary: string;
  activeDays: string;
  description: string;
  tags: string[];
}

export interface JobOfferSection {
  id: string;
  title: string;
  items: string[];
}

export interface JobOfferSkills {
  id: string;
  skills: string[];
}

export interface JobOfferLocation {
  id: string;
  address: string;
  latitude: number;
  longitude: number;
}

export interface JobOfferData {
  details: JobOfferDetails;
  about: JobOfferSection;
  competencies: JobOfferSection;
  benefits: JobOfferSection;
  skills: JobOfferSkills;
  location: JobOfferLocation;
}
