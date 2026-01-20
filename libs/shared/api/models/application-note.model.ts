export interface CreateApplicationNoteDto {
  content: string;
}

export interface UpdateApplicationNoteDto {
  content?: string;
}

export interface ApplicationNoteDto {
  id: string;
  applicationId: string;
  content: string;
  authorId: string;
  author?: {
    id: string;
    fullName?: string;
  };
  createdAt: string;
  updatedAt?: string;
}
