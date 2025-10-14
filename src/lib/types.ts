export type SiteRequest = {
  id: string;
  towerco: string;
  location: string;
  coordinates: { lat: number; lng: number };
  specifications: string;
  status: 'Open' | 'In Progress' | 'Closed';
  assignedAgentId: string | null;
  dateCreated: string;
};

export type RealEstateAgent = {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatarId: string;
};

export type Consultant = {
  id:string;
  name: string;
  type: 'Permit' | 'Legal';
  specialty: string;
  email: string;
  phone: string;
  avatarId: string;
};

export type RecommendedSite = {
  address: string;
  details: string;
};
