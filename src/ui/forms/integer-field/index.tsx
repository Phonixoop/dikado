import TextField from "../text-field";
import { useState } from "react";

export default function IntegerField({
  value,
  onChange = (e) => {},
  onValueChange = (e) => {},
  ...rest
}) {
  const [internalValue, setInternalValue] = useState(value);

  function handleChange(e) {
    const val = e.target.value;
    const parsedValue = val.replace(/[^0-9]/g, ""); // Remove non-numeric characters

    setInternalValue(parsedValue);
    onChange(e); // Pass the event upwards if needed
    onValueChange(parsedValue); // Notify parent with numeric value
  }

  return (
    <TextField
      value={internalValue}
      isRtl={false}
      type="text"
      inputMode="numeric"
      pattern="[0-9]*"
      onChange={handleChange}
      {...rest}
    />
  );
}
