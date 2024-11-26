import { Case, Message, Activity } from '@/types';
import { DEMO_USERS } from './constants';

export const MOCK_CASES: Case[] = [
  {
    id: '1',
    title: 'Robbery at 123 Main St',
    description: 'Armed robbery at convenience store',
    status: 'pending',
    submittedBy: DEMO_USERS.police,
    createdAt: '2024-03-15T10:00:00Z',
    updatedAt: '2024-03-15T10:00:00Z',
  },
  {
    id: '2',
    title: 'Vehicle Theft Investigation',
    description: 'Stolen vehicle recovered, suspect in custody',
    status: 'under_review',
    submittedBy: DEMO_USERS.police,
    assignedTo: DEMO_USERS.prosecutor,
    createdAt: '2024-03-14T15:30:00Z',
    updatedAt: '2024-03-15T09:00:00Z',
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