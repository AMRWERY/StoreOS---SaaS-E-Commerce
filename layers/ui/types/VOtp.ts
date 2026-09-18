export interface LazyVOtpProps {
  modelValue?: string;
  /** Number of digit boxes. Supports 4–6. Defaults to 6. */
  length?: 4 | 5 | 6;
  label?: string;
  error?: string;
  disabled?: boolean;
  name?: string;
  boxClass?: string;
}
