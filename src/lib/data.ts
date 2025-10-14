import type { RealEstateAgent, Consultant, SiteRequest } from '@/lib/types';

export const agents: RealEstateAgent[] = [
  { id: 'agent-1', name: 'Alice Johnson', email: 'alice.j@realestate.com', phone: '123-456-7890', avatarId: 'agent' },
  { id: 'agent-2', name: 'Bob Williams', email: 'bob.w@realestate.com', phone: '234-567-8901', avatarId: 'agent' },
  { id: 'agent-3', name: 'Charlie Brown', email: 'charlie.b@realestate.com', phone: '345-678-9012', avatarId: 'agent' },
];

export const consultants: Consultant[] = [
  { id: 'consult-1', name: 'David Lee', type: 'Permit', specialty: 'Zoning & Environmental', email: 'david.l@permits.com', phone: '456-789-0123', avatarId: 'consultant' },
  { id: 'consult-2', name: 'Eve Davis', type: 'Legal', specialty: 'Real Estate Contracts', email: 'eve.d@legal.com', phone: '567-890-1234', avatarId: 'consultant' },
  { id: 'consult-3', name: 'Frank Miller', type: 'Permit', specialty: 'Building Codes', email: 'frank.m@permits.com', phone: '678-901-2345', avatarId: 'consultant' },
  { id: 'consult-4', name: 'Grace Wilson', type: 'Legal', specialty: 'Lease Agreements', email: 'grace.w@legal.com', phone: '789-012-3456', avatarId: 'consultant' },
];

export const siteRequests: SiteRequest[] = [
  {
    id: 'req-001',
    towerco: 'Apex Towers',
    location: 'Sunnyvale, CA',
    coordinates: { lat: 37.3688, lng: -122.0363 },
    specifications: 'Requires a 150-foot monopole tower with a 50x50 feet ground space. Must have clear line of sight to downtown.',
    status: 'In Progress',
    assignedAgentId: 'agent-1',
    dateCreated: '2023-10-01',
  },
  {
    id: 'req-002',
    towerco: 'Pinnacle Communications',
    location: 'Austin, TX',
    coordinates: { lat: 30.2672, lng: -97.7431 },
    specifications: 'Looking for rooftop space on a building over 10 stories high in the downtown core for antenna placement.',
    status: 'Open',
    assignedAgentId: 'agent-2',
    dateCreated: '2023-10-15',
  },
  {
    id: 'req-003',
    towerco: 'Horizon Wireless',
    location: 'Miami, FL',
    coordinates: { lat: 25.7617, lng: -80.1918 },
    specifications: 'Area needed for a small cell installation on a utility pole or streetlight.',
    status: 'Open',
    assignedAgentId: null,
    dateCreated: '2023-11-05',
  },
  {
    id: 'req-004',
    towerco: 'Apex Towers',
    location: 'Denver, CO',
    coordinates: { lat: 39.7392, lng: -104.9903 },
    specifications: 'Requires a 200-foot lattice tower. Ground space of at least 100x100 feet. Proximity to major highway is a plus.',
    status: 'Closed',
    assignedAgentId: 'agent-1',
    dateCreated: '2023-09-20',
  },
];
