export interface User {
  id: string;
  name: string;
  email: string;
  role: 'police_officer' | 'prosecutor' | 'admin';
  avatar?: string;
}

export interface Case {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'under_review' | 'approved' | 'rejected';
  submittedBy: User;
  assignedTo?: User;
  createdAt: string;
  updatedAt: string;
  documents?: Document[];
}

export interface Document {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadedAt: string;
  uploadedBy: User;
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