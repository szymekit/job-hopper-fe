import { InterviewStatus } from './common.model';

export interface CreateInterviewDto {
  scheduledAt: string;
  location?: string;
  meetingUrl?: string;
  notes?: string;
  status?: InterviewStatus;
}

export interface UpdateInterviewDto {
  scheduledAt?: string;
  location?: string;
  meetingUrl?: string;
  notes?: string;
  status?: InterviewStatus;
}

export interface InterviewDto {
  id: string;
  applicationId: string;
  scheduledAt: string;
  location?: string;
  meetingUrl?: string;
  notes?: string;
  status: InterviewStatus;
  createdAt: string;
  updatedAt?: string;
}
