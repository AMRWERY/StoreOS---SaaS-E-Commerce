import type { Plan } from '@/types/auth'

export type PricingTier = {
  name: string
  plan: Plan
  tagline: string
  monthlyPrice: number
  annualPrice: number
  icon: string
  iconBg: string
  iconColor: string
  popular: boolean
  free: boolean
  trial: boolean
  contactSales?: boolean
  cta: string
  featureGroups: {
    label: string
    items: { label: string; included: boolean }[]
  }[]
}

/** Same plans, prices and feature lists as the landing page pricing section. */
export const buildPricingTiers = (t: (key: string) => string): PricingTier[] => [
  {
    name: t("home.pricing.tiers.free.name"),
    plan: "free" as Plan,
    tagline: t("home.pricing.tiers.free.tagline"),
    monthlyPrice: 0,
    annualPrice: 0,
    icon: "ph:gift-fill",
    iconBg: "bg-success-dim",
    iconColor: "text-success",
    popular: false,
    free: true,
    trial: true,
    cta: t("home.pricing.tiers.free.cta"),
    featureGroups: [
      {
        label: t("home.pricing.ordersAndProducts"),
        items: [
          { label: t("home.pricing.features.up50orders"), included: true },
          { label: t("home.pricing.features.up50skus"), included: true },
          {
            label: t("home.pricing.features.bulkOrderActions"),
            included: false,
          },
        ],
      },
      {
        label: t("home.pricing.teamAndAccess"),
        items: [
          { label: t("home.pricing.features.1member"), included: true },
          {
            label: t("home.pricing.features.roleBasedPermissions"),
            included: false,
          },
          {
            label: t("home.pricing.features.staffActivityLog"),
            included: false,
          },
        ],
      },
      {
        label: t("home.pricing.analyticsLabel"),
        items: [
          { label: t("home.pricing.features.basicRevenue"), included: true },
          {
            label: t("home.pricing.features.advancedAnalytics"),
            included: false,
          },
        ],
      },
    ],
  },
  {
    name: t("home.pricing.tiers.starter.name"),
    plan: "starter" as Plan,
    tagline: t("home.pricing.tiers.starter.tagline"),
    monthlyPrice: 19,
    annualPrice: 15,
    icon: "ph:rocket-launch-fill",
    iconBg: "bg-bg-elevated",
    iconColor: "text-tx-secondary",
    popular: false,
    free: false,
    trial: true,
    cta: t("home.pricing.tiers.starter.cta"),
    featureGroups: [
      {
        label: t("home.pricing.ordersAndProducts"),
        items: [
          { label: t("home.pricing.features.up1000orders"), included: true },
          { label: t("home.pricing.features.up500skus"), included: true },
          {
            label: t("home.pricing.features.bulkOrderActions"),
            included: false,
          },
        ],
      },
      {
        label: t("home.pricing.teamAndAccess"),
        items: [
          { label: t("home.pricing.features.3members"), included: true },
          {
            label: t("home.pricing.features.roleBasedPermissions"),
            included: false,
          },
          {
            label: t("home.pricing.features.staffActivityLog"),
            included: false,
          },
        ],
      },
      {
        label: t("home.pricing.analyticsLabel"),
        items: [
          { label: t("home.pricing.features.basicRevenue"), included: true },
          {
            label: t("home.pricing.features.advancedAnalytics"),
            included: false,
          },
        ],
      },
    ],
  },
  {
    name: t("home.pricing.tiers.growth.name"),
    plan: "growth" as Plan,
    tagline: t("home.pricing.tiers.growth.tagline"),
    monthlyPrice: 49,
    annualPrice: 39,
    icon: "ph:chart-line-up-fill",
    iconBg: "bg-brand-dim",
    iconColor: "text-brand",
    popular: true,
    free: false,
    trial: true,
    cta: t("home.pricing.tiers.growth.cta"),
    featureGroups: [
      {
        label: t("home.pricing.ordersAndProducts"),
        items: [
          { label: t("home.pricing.features.unlimitedOrders"), included: true },
          { label: t("home.pricing.features.unlimitedSKUs"), included: true },
          {
            label: t("home.pricing.features.bulkOrderActions"),
            included: true,
          },
        ],
      },
      {
        label: t("home.pricing.teamAndAccess"),
        items: [
          { label: t("home.pricing.features.10members"), included: true },
          {
            label: t("home.pricing.features.roleBasedPermissions"),
            included: true,
          },
          {
            label: t("home.pricing.features.staffActivityLog"),
            included: true,
          },
        ],
      },
      {
        label: t("home.pricing.analyticsLabel"),
        items: [
          {
            label: t("home.pricing.features.advancedAnalytics"),
            included: true,
          },
          { label: t("home.pricing.features.multiWarehouse"), included: true },
        ],
      },
    ],
  },
  {
    name: t("home.pricing.tiers.enterprise.name"),
    plan: "enterprise" as Plan,
    tagline: t("home.pricing.tiers.enterprise.tagline"),
    monthlyPrice: 99,
    annualPrice: 79,
    icon: "ph:buildings-fill",
    iconBg: "bg-info-dim",
    iconColor: "text-info",
    popular: false,
    free: false,
    trial: false,
    contactSales: true,
    cta: t("home.pricing.tiers.enterprise.cta"),
    featureGroups: [
      {
        label: t("home.pricing.ordersAndProducts"),
        items: [
          { label: t("home.pricing.features.unlimitedOrders"), included: true },
          { label: t("home.pricing.features.unlimitedSKUs"), included: true },
          {
            label: t("home.pricing.features.priorityFulfilment"),
            included: true,
          },
        ],
      },
      {
        label: t("home.pricing.teamAndAccess"),
        items: [
          {
            label: t("home.pricing.features.unlimitedMembers"),
            included: true,
          },
          {
            label: t("home.pricing.features.customRoleBuilder"),
            included: true,
          },
          {
            label: t("home.pricing.features.dedicatedManager"),
            included: true,
          },
        ],
      },
      {
        label: t("home.pricing.platform"),
        items: [
          { label: t("home.pricing.features.fullApiAccess"), included: true },
          {
            label: t("home.pricing.features.customIntegrations"),
            included: true,
          },
        ],
      },
    ],
  },
]
