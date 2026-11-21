export interface VOtpProps {
  modelValue?: string;
  /** Number of digit boxes. Supports 4–6. Defaults to 6. */
  length?: 4 | 5 | 6;
  label?: string;
  error?: string;
  disabled?: boolean;
  name?: string;
  boxClass?: string;
  /** Stretch the boxes to fill the available width. */
  fullWidth?: boolean;
}
