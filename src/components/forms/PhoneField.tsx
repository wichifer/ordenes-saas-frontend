import { TextField } from "./TextField";

export function PhoneField(props: any) {
  return (
    <TextField
      type="tel"
      autoComplete="tel"
      {...props}
    />
  );
}