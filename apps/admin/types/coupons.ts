export interface Stat {
  label: string;
  value: string | number;
  trend?: string | null;
}

export interface Coupon {
  code: string;
  type: string;
  value: string;
  minOrder: string;
  usage: number;
  color: string;
}
