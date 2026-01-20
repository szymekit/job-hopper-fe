import { OfferFilters } from './offer.model';

export interface CreateSavedSearchDto {
  name: string;
  filters: OfferFilters;
}

export interface UpdateSavedSearchDto {
  name?: string;
  filters?: OfferFilters;
}

export interface SavedSearchDto {
  id: string;
  name: string;
  filters: OfferFilters;
  userId: string;
  createdAt: string;
  updatedAt?: string;
}
