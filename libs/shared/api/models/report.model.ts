import { ReportTargetType } from './common.model';

export interface CreateReportDto {
  targetType: ReportTargetType;
  targetId: string;
  reason: string;
}

export interface ReportDto {
  id: string;
  targetType: ReportTargetType;
  targetId: string;
  reason: string;
  reporterId: string;
  resolved: boolean;
  createdAt: string;
}
