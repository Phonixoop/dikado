import { ChangeEvent, useState } from "react";
import TextField from "../text-field";

export default function IntegerField({
  value,
  onChange = (e) => {},
  onValueChange = (e) => {},
  ...rest
}) {
  const [_value, setValue] = useState("");

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    // const parsedValue = val.replace(/\D/g, "").replace(/^0+/, "");
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/[^0-9]/g, ""); // Filter out non-numeric characters
    setValue(numericValue);
    onChange(e); // Pass the event to the formik handler
    onValueChange(numericValue); // Pass the processed value
  }

  return (
    <TextField
      value={_value} // Use Formik-controlled value
      isRtl={false}
      type="text"
      inputMode="numeric"
      pattern="[0-9]*"
      onChange={handleChange}
      {...rest}
    />
  );
}
