export interface CreateAvailabilitySlotDto {
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

export interface UpdateAvailabilitySlotDto {
  startTime?: string;
  endTime?: string;
  isAvailable?: boolean;
}

export interface AvailabilitySlotDto {
  id: string;
  userId: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  createdAt: string;
  updatedAt?: string;
}
