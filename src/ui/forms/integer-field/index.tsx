import { ChangeEvent } from "react";
import TextField from "../text-field";

export default function IntegerField({
  value,
  onChange = (e) => {},
  onValueChange = (e) => {},
  ...rest
}) {
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    const parsedValue = val.replace(/\D/g, "").replace(/^0+/, "");

    onChange(e); // Pass the event to the formik handler
    onValueChange(parsedValue); // Pass the processed value
  }

  return (
    <TextField
      value={value} // Use Formik-controlled value
      isRtl={false}
      type="text"
      inputMode="numeric"
      pattern="[0-9]*"
      onChange={handleChange} // Call handleChange
      {...rest}
    />
  );
}
