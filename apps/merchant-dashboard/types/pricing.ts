import type { Plan } from "./auth";

export type Tier = {
  name: string;
  /** Plan granted when this tier's trial starts — never derive it from the translated `name`. */
  plan: Plan;
  tagline: string;
  monthlyPrice: number;
  annualPrice: number;
  icon: string;
  iconBg: string;
  iconColor: string;
  popular: boolean;
  free: boolean;
  trial: boolean;
  /** Sales-led tier: the modal collects an email, then hands it to /contact. */
  contactSales?: boolean;
  cta: string;
  ctaRoute: string;
  featureGroups: {
    label: string;
    items: { label: string; included: boolean }[];
  }[];
};
