export interface LazyVInputProps {
  modelValue?: string | number | boolean;
  type?: string;
  label?: string;
  placeholder?: string;
  name?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  inputClass?: string;
  /** Checkbox type only: 'end' (default) renders the checkbox before the label text; 'start' spreads them with the label on the left and checkbox on the right. */
  labelPosition?: "start" | "end";
}
