import { Case, Message, Activity } from '@/types';
import { DEMO_USERS } from './constants';

export const MOCK_CASES: Case[] = [
  {
    id: '1',
    title: 'Server Outage Report',
    description: 'Investigation into recent server downtime',
    status: 'pending',
    submittedBy: { 
      id: '1', 
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'police_officer'
    },
    createdAt: '2024-03-20T10:00:00Z',
    updatedAt: '2024-03-20T10:00:00Z',
    evidence: [
      { 
        id: '1', 
        name: 'server-logs.pdf',
        url: 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf',
        type: 'pdf',
        thumbnail: 'https://placehold.co/50x50/png?text=PDF',
        size: 1024000,
        uploadedAt: '2024-03-20T10:00:00Z',
        uploadedBy: DEMO_USERS.police
      },
      {
        id: '2',
        name: 'error-screenshot.png',
        url: 'https://picsum.photos/200',
        type: 'image',
        thumbnail: 'https://picsum.photos/50/50',
        size: 512000,
        uploadedAt: '2024-03-20T10:00:00Z',
        uploadedBy: DEMO_USERS.police
      }
    ]
  },
  {
    id: '2',
    title: 'Security Breach Alert',
    description: 'Potential unauthorized access detected',
    status: 'under_review',
    submittedBy: { 
      id: '2', 
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'police_officer'
    },
    createdAt: '2024-03-19T15:30:00Z',
    updatedAt: '2024-03-19T15:30:00Z',
    evidence: [
      {
        id: '3',
        name: 'access-logs.txt',
        url: '#',
        type: 'text',
        size: 256000,
        uploadedAt: '2024-03-19T15:30:00Z',
        uploadedBy: DEMO_USERS.police
      },
      {
        id: '4',
        name: 'security-report.pdf',
        url: '#',
        type: 'pdf',
        thumbnail: 'https://placehold.co/50x50/png?text=PDF',
        size: 384000,
        uploadedAt: '2024-03-19T15:30:00Z',
        uploadedBy: DEMO_USERS.police
      }
    ]
  },
  {
    id: '3',
    title: 'Assault Case #2024-03',
    description: 'Physical altercation at downtown bar',
    status: 'approved',
    submittedBy: DEMO_USERS.police,
    assignedTo: DEMO_USERS.prosecutor,
    createdAt: '2024-03-13T20:15:00Z',
    updatedAt: '2024-03-15T11:30:00Z',
    evidence: [
      {
        id: '5',
        name: 'incident-report.pdf',
        url: '#',
        type: 'pdf',
        thumbnail: 'https://placehold.co/50x50/png?text=PDF',
        size: 512000,
        uploadedAt: '2024-03-13T20:15:00Z',
        uploadedBy: DEMO_USERS.police
      }
    ]
  },
];

export const MOCK_MESSAGES: Message[] = [
  {
    id: '1',
    content: 'Additional witness statement has been uploaded',
    sender: DEMO_USERS.police,
    createdAt: '2024-03-15T10:30:00Z',
    caseId: '1',
  },
  {
    id: '2',
    content: 'Please provide surveillance footage',
    sender: DEMO_USERS.prosecutor,
    createdAt: '2024-03-15T11:00:00Z',
    caseId: '1',
  },
];

export const MOCK_ACTIVITIES: Activity[] = [
  {
    id: '1',
    description: 'Submitted new case: Robbery at 123 Main St',
    timestamp: '2024-03-15T10:00:00Z',
    type: 'case_creation',
  },
  {
    id: '2',
    description: 'Updated case status to Under Review: Vehicle Theft Investigation',
    timestamp: '2024-03-15T09:00:00Z',
    type: 'case_update',
  },
  {
    id: '3',
    description: 'Sent message on case: Assault Case #2024-03',
    timestamp: '2024-03-14T15:30:00Z',
    type: 'message',
  },
  {
    id: '4',
    description: 'Uploaded new document: Witness Statement',
    timestamp: '2024-03-14T14:20:00Z',
    type: 'document_upload',
  },
  {
    id: '5',
    description: 'Updated profile information',
    timestamp: '2024-03-13T16:45:00Z',
    type: 'profile_update',
  },
];