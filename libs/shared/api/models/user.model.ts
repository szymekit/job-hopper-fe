import { UserRole } from './common.model';

export interface UserDto {
  id: string;
  email: string;
  fullName?: string;
  headline?: string;
  description?: string;
  avatarUrl?: string;
  coverUrl?: string;
  phoneNumber?: string;
  role: UserRole;
  citizenship?: string;
  isStudent?: boolean;
  hasNoCriminalRecord?: boolean;
  drivingLicense?: string;
  experience?: string;
  createdAt?: string;
  updatedAt?: string;
  companyId?: string;
  company?: {
    id: string;
    name: string;
    logoUrl?: string;
  };
}
