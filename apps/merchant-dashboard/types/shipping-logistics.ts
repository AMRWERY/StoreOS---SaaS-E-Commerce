export interface ShippingZone {
  name: string;
  regions: string[];
  extraCount?: number;
  flatPrice: string;
  freeAbove: string | "NOT AVAILABLE";
}
