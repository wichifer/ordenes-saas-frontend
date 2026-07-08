import { TextField } from "./TextField";

export function EmailField(props: any) {
  return (
    <TextField
      type="email"
      autoComplete="email"
      {...props}
    />
  );
}