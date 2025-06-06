export interface Event {
  event_id: number;
  title: string;
  event_date: string;
  price: string;
  location: string;
  imageUrl: string;
  is_paid: boolean;
  description: string;
  registration_id: number;
}

export interface Organizer {
  email: string;
  imageUrl: string;
  name: string;
}

export interface OrganizersType {
  organizers: Organizer[];
}