export type WorkType = 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'INTERNSHIP';
export type ContractType = 'UOP' | 'B2B' | 'UZ' | 'RDR';
export type UserRole = 'EMPLOYEE' | 'RECRUITER' | 'ADMIN';
export type ApplicationStatus = 'PENDING' | 'REVIEWED' | 'ACCEPTED' | 'REJECTED';
export type InterviewStatus = 'SCHEDULED' | 'COMPLETED' | 'CANCELLED';
export type ReportTargetType = 'POST' | 'COMMENT' | 'USER';
export type JobOfferSectionType = 'ABOUT' | 'COMPETENCIES' | 'BENEFITS';

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
