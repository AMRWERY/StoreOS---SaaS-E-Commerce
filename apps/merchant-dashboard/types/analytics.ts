export interface KPI {
  label: string;
  value: string;
  trend: string;
  up: boolean;
}

export interface CategoryRevenue {
  name: string;
  amount: string;
  percentage: number;
}

export interface StatusItem {
  name: string;
  count: string;
  color: string;
  stroke: string;
  offset: number;
  dash: number;
}

export interface Product {
  name: string;
  category: string;
  sales: number;
  revenue: string;
}

export interface Customer {
  name: string;
  type: string;
  orders: number;
  spent: string;
}
