export interface LazyVRangeInputProps {
  /** number for single mode, [min, max] tuple for multi mode */
  modelValue?: number | [number, number];
  /** Renders two handles over one track instead of a single handle. */
  multi?: boolean;
  label?: string;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  disabled?: boolean;
  name?: string;
  rangeClass?: string;
}
