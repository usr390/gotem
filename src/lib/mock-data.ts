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
  {
    id: '4',
    title: 'Drug Possession Case #2024-04',
    description: 'Suspect found with controlled substances during traffic stop',
    status: 'pending',
    submittedBy: {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike.johnson@example.com',
      role: 'police_officer'
    },
    createdAt: '2024-03-18T08:45:00Z',
    updatedAt: '2024-03-18T14:20:00Z',
    evidence: [
      {
        id: '6',
        name: 'evidence-photos.zip',
        url: '#',
        type: 'archive',
        size: 15600000,
        uploadedAt: '2024-03-18T09:15:00Z',
        uploadedBy: DEMO_USERS.police
      }
    ]
  },
  {
    id: '5',
    title: 'Cyberstalking Investigation',
    description: 'Online harassment and threats via social media',
    status: 'under_review',
    submittedBy: DEMO_USERS.police,
    assignedTo: DEMO_USERS.prosecutor,
    createdAt: '2024-03-17T16:20:00Z',
    updatedAt: '2024-03-19T09:30:00Z',
    evidence: [
      {
        id: '7',
        name: 'screenshot-compilation.pdf',
        url: '#',
        type: 'pdf',
        thumbnail: 'https://placehold.co/50x50/png?text=PDF',
        size: 8400000,
        uploadedAt: '2024-03-17T16:45:00Z',
        uploadedBy: DEMO_USERS.police
      },
      {
        id: '8',
        name: 'threat-messages.txt',
        url: '#',
        type: 'text',
        size: 125000,
        uploadedAt: '2024-03-17T16:50:00Z',
        uploadedBy: DEMO_USERS.police
      }
    ]
  },
  {
    id: '6',
    title: 'Vehicle Theft Recovery',
    description: 'Stolen vehicle recovered with damage',
    status: 'approved',
    submittedBy: DEMO_USERS.police,
    assignedTo: DEMO_USERS.prosecutor,
    createdAt: '2024-03-16T11:30:00Z',
    updatedAt: '2024-03-17T13:15:00Z',
    evidence: [
      {
        id: '9',
        name: 'damage-assessment.pdf',
        url: '#',
        type: 'pdf',
        thumbnail: 'https://placehold.co/50x50/png?text=PDF',
        size: 2048000,
        uploadedAt: '2024-03-16T12:00:00Z',
        uploadedBy: DEMO_USERS.police
      },
      {
        id: '10',
        name: 'recovery-photos.zip',
        url: '#',
        type: 'archive',
        size: 25600000,
        uploadedAt: '2024-03-16T11:45:00Z',
        uploadedBy: DEMO_USERS.police
      }
    ]
  },
  {
    id: '7',
    title: 'Burglary #2024-07',
    description: 'Burglary incident reported at Downtown Business District',
    status: 'pending',
    submittedBy: DEMO_USERS.police,
    createdAt: '2024-03-15T09:30:00Z',
    updatedAt: '2024-03-15T09:30:00Z',
    evidence: [
      {
        id: 'e11',
        name: 'security-footage.mp4',
        url: '#',
        type: 'video',
        size: 52428800,
        uploadedAt: '2024-03-15T09:45:00Z',
        uploadedBy: DEMO_USERS.police
      }
    ]
  },
  {
    id: '8',
    title: 'DUI Case #2024-08',
    description: 'Drunk driving incident on Main Street',
    status: 'approved',
    submittedBy: DEMO_USERS.police,
    assignedTo: DEMO_USERS.prosecutor,
    createdAt: '2024-03-14T23:15:00Z',
    updatedAt: '2024-03-15T10:30:00Z',
    evidence: [
      {
        id: 'e12',
        name: 'breathalyzer-report.pdf',
        url: '#',
        type: 'pdf',
        thumbnail: 'https://placehold.co/50x50/png?text=PDF',
        size: 1048576,
        uploadedAt: '2024-03-14T23:30:00Z',
        uploadedBy: DEMO_USERS.police
      }
    ]
  },
  {
    id: '9',
    title: 'Vandalism #2024-09',
    description: 'Property damage at Central Park',
    status: 'under_review',
    submittedBy: DEMO_USERS.police,
    assignedTo: DEMO_USERS.prosecutor,
    createdAt: '2024-03-14T16:20:00Z',
    updatedAt: '2024-03-14T18:45:00Z',
    evidence: [
      {
        id: 'e13',
        name: 'damage-photos.zip',
        url: '#',
        type: 'archive',
        size: 15728640,
        uploadedAt: '2024-03-14T16:45:00Z',
        uploadedBy: DEMO_USERS.police
      }
    ]
  },
  {
    id: '10',
    title: 'Fraud Case #2024-10',
    description: 'Credit card fraud at local business',
    status: 'pending',
    submittedBy: DEMO_USERS.police,
    createdAt: '2024-03-13T14:30:00Z',
    updatedAt: '2024-03-13T14:30:00Z',
    evidence: [
      {
        id: 'e14',
        name: 'transaction-records.pdf',
        url: '#',
        type: 'pdf',
        thumbnail: 'https://placehold.co/50x50/png?text=PDF',
        size: 2097152,
        uploadedAt: '2024-03-13T14:45:00Z',
        uploadedBy: DEMO_USERS.police
      }
    ]
  },
  {
    id: '11',
    title: 'Assault #2024-11',
    description: 'Physical altercation at shopping mall',
    status: 'under_review',
    submittedBy: DEMO_USERS.police,
    assignedTo: DEMO_USERS.prosecutor,
    createdAt: '2024-03-12T20:10:00Z',
    updatedAt: '2024-03-13T09:15:00Z',
    evidence: [
      {
        id: 'e15',
        name: 'witness-statements.pdf',
        url: '#',
        type: 'pdf',
        thumbnail: 'https://placehold.co/50x50/png?text=PDF',
        size: 3145728,
        uploadedAt: '2024-03-12T21:00:00Z',
        uploadedBy: DEMO_USERS.police
      }
    ]
  },
  {
    id: '12',
    title: 'Cybercrime #2024-12',
    description: 'Ransomware attack on local business',
    status: 'approved',
    submittedBy: DEMO_USERS.police,
    assignedTo: DEMO_USERS.prosecutor,
    createdAt: '2024-03-11T08:20:00Z',
    updatedAt: '2024-03-12T15:30:00Z',
    evidence: [
      {
        id: 'e16',
        name: 'digital-forensics.zip',
        url: '#',
        type: 'archive',
        size: 31457280,
        uploadedAt: '2024-03-11T10:15:00Z',
        uploadedBy: DEMO_USERS.police
      }
    ]
  },
  {
    id: '13',
    title: 'Drug Possession #2024-13',
    description: 'Narcotics found during routine traffic stop',
    status: 'pending',
    submittedBy: DEMO_USERS.police,
    createdAt: '2024-03-10T22:45:00Z',
    updatedAt: '2024-03-10T22:45:00Z',
    evidence: [
      {
        id: 'e17',
        name: 'evidence-photos.zip',
        url: '#',
        type: 'archive',
        size: 8388608,
        uploadedAt: '2024-03-10T23:00:00Z',
        uploadedBy: DEMO_USERS.police
      }
    ]
  },
  {
    id: '14',
    title: 'Theft #2024-14',
    description: 'Shoplifting incident at East End Mall',
    status: 'under_review',
    submittedBy: DEMO_USERS.police,
    assignedTo: DEMO_USERS.prosecutor,
    createdAt: '2024-03-09T14:20:00Z',
    updatedAt: '2024-03-10T09:30:00Z',
    evidence: [
      {
        id: 'e18',
        name: 'surveillance.mp4',
        url: '#',
        type: 'video',
        size: 104857600,
        uploadedAt: '2024-03-09T15:00:00Z',
        uploadedBy: DEMO_USERS.police
      }
    ]
  },
  {
    id: '15',
    title: 'Domestic Dispute #2024-15',
    description: 'Disturbance reported in Residential Area',
    status: 'approved',
    submittedBy: DEMO_USERS.police,
    assignedTo: DEMO_USERS.prosecutor,
    createdAt: '2024-03-08T19:15:00Z',
    updatedAt: '2024-03-09T11:30:00Z',
    evidence: [
      {
        id: 'e19',
        name: 'incident-report.pdf',
        url: '#',
        type: 'pdf',
        thumbnail: 'https://placehold.co/50x50/png?text=PDF',
        size: 2097152,
        uploadedAt: '2024-03-08T20:00:00Z',
        uploadedBy: DEMO_USERS.police
      }
    ]
  },
  {
    id: '16',
    title: 'Vandalism #2024-16',
    description: 'Graffiti damage to public property',
    status: 'pending',
    submittedBy: DEMO_USERS.police,
    createdAt: '2024-03-07T12:30:00Z',
    updatedAt: '2024-03-07T12:30:00Z',
    evidence: [
      {
        id: 'e20',
        name: 'damage-assessment.pdf',
        url: '#',
        type: 'pdf',
        thumbnail: 'https://placehold.co/50x50/png?text=PDF',
        size: 4194304,
        uploadedAt: '2024-03-07T13:15:00Z',
        uploadedBy: DEMO_USERS.police
      }
    ]
  }
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