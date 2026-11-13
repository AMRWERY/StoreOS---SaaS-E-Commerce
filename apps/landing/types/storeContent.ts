export interface NavItem {
  id: string
  label: string
  url: string
  children: NavItem[]
}

export interface NavMenu {
  id: string
  name: string
  handle: string
  items: NavItem[]
}

export type MediaFileType = 'image' | 'video' | 'document'

export interface MediaFile {
  id: string
  name: string
  type: MediaFileType
  sizeKb: number
  usage: number
  createdAt: string
}

export type PolicyKey = 'privacy' | 'refund' | 'shipping' | 'terms'

export interface StorePolicy {
  key: PolicyKey
  body: string
  published: boolean
  updatedAt: string
}

export interface TaxRegionOverride {
  id: string
  region: string
  governorates: string
  rate: number
}

export type DomainVerification = 'pending' | 'verified' | 'failed'
export type DomainSsl = 'issuing' | 'active' | 'expired'

export interface DnsRecord {
  type: 'A' | 'CNAME' | 'TXT'
  host: string
  value: string
}

export interface StoreDomain {
  id: string
  host: string
  verification: DomainVerification
  ssl: DomainSsl
  primary: boolean
  records: DnsRecord[]
}

export type TranslationStatus = 'translated' | 'missing' | 'outdated'
export type TranslationKind = 'product' | 'collection' | 'page'

export interface TranslationRow {
  id: string
  kind: TranslationKind
  nameEn: string
  nameAr: string
  descriptionStatus: TranslationStatus
  completeness: number
}
