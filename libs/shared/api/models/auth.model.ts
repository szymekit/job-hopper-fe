import { UserRole } from './common.model';
import { UserDto } from './user.model';

export interface RegisterDto {
  email: string;
  password: string;
  fullName?: string;
  taxNumber?: string;
  phoneNumber?: string;
  role?: UserRole;
  marketingConsent?: boolean;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface AuthResponseDto {
  accessToken: string;
  user: UserDto;
}

export interface UpdateProfileDto {
  fullName?: string;
  headline?: string;
  description?: string;
  avatarUrl?: string;
  coverUrl?: string;
  phoneNumber?: string;
  citizenship?: string;
  isStudent?: boolean;
  hasNoCriminalRecord?: boolean;
  drivingLicense?: string;
  experience?: string;
}
