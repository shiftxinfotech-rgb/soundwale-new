export interface User {
  id: string;
  name: string;
  phone: string;
  avatar?: string;
  isOnline?: boolean;
  lastSeen?: Date | null;
}
