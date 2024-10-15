"use client";
import React, { useState } from "react";
import { cn } from "~/lib/utils";

interface CheckboxProps {
  className?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  id?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  className = "",
  checked = false,
  onChange,
  label,
  id = "checkbox",
}) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleCheckboxChange = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    if (onChange) {
      onChange(newCheckedState);
    }
  };

  return (
    <div className={cn("inline-flex w-full items-center")}>
      <label
        className={cn(
          "relative flex w-full cursor-pointer items-center justify-between gap-2",
          className,
        )}
      >
        {" "}
        {label && (
          <span className="ml-2 select-none text-primary">{label}</span>
        )}
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-primary shadow transition-all checked:border-accent checked:bg-accent/50 hover:shadow-md"
          id={id}
        />
        <span className="pointer-events-none absolute top-1/2 -translate-x-[0.15rem] -translate-y-1/2 transform text-primary opacity-0 peer-checked:opacity-100">
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5"
            viewBox="0 0 20 20"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg> */}
        </span>
      </label>
    </div>
  );
};

export default Checkbox;
