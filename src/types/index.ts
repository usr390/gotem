export interface User {
  id: string;
  name: string;
  email: string;
  role: 'police_officer' | 'prosecutor' | 'admin';
  avatar: string | undefined | null;
}

export interface Case {
  id: string;
  title: string;
  description: string;
  status: 'submitted' | 'approved' | 'review' | 'dropped';
  submittedBy: User;
  assignedTo?: User;
  createdAt: string;
  updatedAt: string;
  evidence?: Evidence[];
  audit: Audit[];
}

export interface Message {
  id: string;
  content: string;
  sender: User;
  createdAt: string;
  caseId: string;
}

export interface Activity {
  id: string;
  description: string;
  timestamp: string;
  type: 'case_creation' | 'case_update' | 'message' | 'document_upload' | 'profile_update';
}

interface Evidence {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadedAt: string;
  uploadedBy: User;
  url: string;
  thumbnail?: string;
}

interface Audit {
  id: string;
  action: string;
  timestamp: string;
  userId: string;
  userName: string;
  details?: string;
}
