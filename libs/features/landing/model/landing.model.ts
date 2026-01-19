export interface LandingCategory {
  id: string;
  title: string;
  offerCount: string;
  icon: string;
  color: string;
}

export interface LandingJobOffer {
  id: string;
  logoUrl: string;
  title: string;
  location: string;
  rate: string;
  isPopular: boolean;
  tags: string[];
}

export interface LandingStep {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

export interface LandingFeature {
  id: string;
  title: string;
  description: string;
}

export interface LandingContentSection {
  id: string;
  badge: string;
  title: string;
  description: string;
  features: LandingFeature[];
  imageUrl: string;
  imagePosition: 'left' | 'right';
}

export interface LandingFooterLink {
  title: string;
  links: string[];
}

export interface LandingData {
  hero: {
    badge: string;
    title: string;
    imageUrl: string;
  };
  categories: LandingCategory[];
  jobOffers: LandingJobOffer[];
  steps: LandingStep[];
  contentSections: LandingContentSection[];
  footer: {
    companyInfo: {
      name: string;
      tagline: string;
      address: string;
    };
    linkColumns: LandingFooterLink[];
    copyright: string;
  };
}
