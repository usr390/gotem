export interface CreateCaseDTO {
    title: string;
    description: string;
    userId: string;
    files?: {
      name: string;
      url: string;
    }[];
  }
  
  export interface UpdateCaseDTO {
    status?: 'SUBMITTED' | 'REVIEW' | 'APPROVED' | 'DROPPED';
    title?: string;
    description?: string;
  }