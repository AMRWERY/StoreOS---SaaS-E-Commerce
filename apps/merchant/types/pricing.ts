export type Tier = {
  name: string;
  tagline: string;
  monthlyPrice: number;
  annualPrice: number;
  icon: string;
  iconBg: string;
  iconColor: string;
  popular: boolean;
  free: boolean;
  trial: boolean;
  cta: string;
  ctaRoute: string;
  featureGroups: {
    label: string;
    items: { label: string; included: boolean }[];
  }[];
};
