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

export interface CustomerDetail {
  name: string
  initials: string
  phone: string
  email: string
  memberSince: string
  riskScore: string
  lastVerified: string
  tags: string[]
}

export interface CustomerOrder {
  id: string
  status: string
  date: string
  total: string
  color: string
}

export interface CustomerNote {
  id: number
  date: string
  author: string
  text: string
}

export interface CustomerActivity {
  id: number
  date: string
  user: string
  action: string
  target: string
  icon: string
  color: string
  bg: string
}