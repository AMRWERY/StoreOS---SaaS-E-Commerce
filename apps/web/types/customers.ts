export interface Customer {
  id: number;
  name: string;
  phone: string;
  email: string;
  location: string;
  orders: number;
  totalSpent: string;
  lastActive: string;
  initials: string;
  avatarBg: string;
  tags: { text: string; color: string }[];
}
