export interface CreateReviewDto {
  content: string;
  rating: number;
}

export interface UpdateReviewDto {
  content?: string;
  rating?: number;
}

export interface ReviewDto {
  id: string;
  content: string;
  rating: number;
  authorId: string;
  author?: {
    id: string;
    fullName?: string;
    avatarUrl?: string;
  };
  targetId: string;
  targetType: 'COMPANY' | 'USER';
  createdAt: string;
  updatedAt?: string;
}
