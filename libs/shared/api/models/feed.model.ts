export interface CreatePostDto {
  content: string;
  imageUrl?: string;
}

export interface UpdatePostDto {
  content?: string;
  imageUrl?: string;
}

export interface CreateCommentDto {
  content: string;
}

export interface PostDto {
  id: string;
  content: string;
  imageUrl?: string;
  authorId: string;
  author?: {
    id: string;
    fullName?: string;
    avatarUrl?: string;
  };
  companyId?: string;
  company?: {
    id: string;
    name: string;
    logoUrl?: string;
  };
  likesCount: number;
  commentsCount: number;
  isLiked: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface CommentDto {
  id: string;
  content: string;
  authorId: string;
  author?: {
    id: string;
    fullName?: string;
    avatarUrl?: string;
  };
  postId: string;
  createdAt: string;
  updatedAt?: string;
}
