"use client";
import React, {
  useState,
  FC,
  ReactNode,
  ChangeEvent,
  ComponentPropsWithoutRef,
} from "react";
import { cn } from "~/lib/utils";

interface WithLabelProps {
  children?: ReactNode;
  value?: string;
  label?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onValueChange?: (value: string) => void;
  [key: string]: any;
}

function withLabel<T>(Component: FC<T>) {
  const WrappedComponent: FC<T & WithLabelProps> = ({
    children = <></>,
    value = "",
    label = "",
    onChange = (value) => {},
    onValueChange = (value = "") => {},
    ...rest
  }) => {
    const [focused, setFocused] = useState(false);

    return (
      <div className="relative flex flex-row-reverse">
        <Component
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            onChange(e); // Ensure this passes the event to PhoneField
          }}
          onValueChange={(parsedValue) => {
            onValueChange(parsedValue); // Ensure this handles numeric value change
          }}
          focused={focused}
          onBlur={() => setFocused(false)}
          {...(rest as T)}
        >
          {children}
        </Component>

        <label
          onClick={() => setFocused(true)}
          className={cn(
            "absolute right-2.5 top-4 z-10 origin-top-right -translate-y-2 scale-75 transform select-none text-sm text-primary duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-2 peer-focus:scale-75 peer-focus:text-accent",
          )}
        >
          {label}
        </label>
      </div>
    );
  };

  return WrappedComponent;
}

export default withLabel;
function isEmpty(value) {
  return !Number.isInteger(value);
}
