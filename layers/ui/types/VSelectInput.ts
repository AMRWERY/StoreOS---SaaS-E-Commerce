export interface VSelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface LazyVSelectInputProps {
  modelValue?: string | number;
  options: (string | number | VSelectOption)[];
  label?: string;
  placeholder?: string;
  name?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  selectClass?: string;
}
