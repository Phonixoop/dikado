import TextField from "../text-field";
import { useCallback, useState } from "react";

export default function PhoneField({
  value,
  onChange = (e) => {},
  onValueChange = (e) => {},
  ...rest
}) {
  const [internalValue, setInternalValue] = useState(value);

  function handleChange(e) {
    const val = e.target.value;
    const parsedValue = val.replace(/\D/g, "");

    setInternalValue(parsedValue);
    onChange(e);
    onValueChange(parsedValue);
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
