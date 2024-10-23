import { ChangeEvent, useEffect, useState } from "react";
import TextField from "~/ui/forms/text-field";
import { commify } from "~/utils/util";

export function PriceField({
  value,
  onChange = (e) => {},
  onValueChange = (e) => {},
  ...rest
}) {
  const [_value, setValue] = useState<string>(commify(value));
  console.log(value);
  // Synchronize _value with the value prop when it changes
  useEffect(() => {
    setValue(commify(value));
  }, [value]);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const inputValue =
      e.target.value === ""
        ? ""
        : e.target.value.replace(/[^\d.]/g, "").replace(/^0/, "");

    // Update local state with the commified value or set to "" if invalid
    if (inputValue === "" || isNaN(Number(inputValue))) {
      setValue(""); // Set to empty string if input is invalid
    } else {
      setValue(commify(inputValue)); // Otherwise, set to formatted value
    }

    onChange(e);
    // Pass the plain numeric value to the external onValueChange handler if provided
    if (onValueChange) {
      onValueChange(inputValue);
    }
  }

  return (
    <TextField {...rest} isRtl={false} value={_value} onChange={handleChange} />
  );
}
