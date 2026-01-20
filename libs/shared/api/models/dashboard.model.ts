export interface CompanyDashboardSummaryDto {
  companyId: string;
  totalOffers: number;
  activeOffers: number;
  totalApplications: number;
  pendingApplications: number;
  acceptedApplications: number;
  rejectedApplications: number;
  offerViews?: number;
}
