import React, {
  useState,
  FC,
  ReactNode,
  ChangeEvent,
  ComponentPropsWithoutRef,
} from "react";

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
            onChange(e);
            onValueChange(e.target.value);
          }}
          focused={focused}
          onBlur={() => setFocused(false)}
          {...(rest as T)}
        >
          {children}
        </Component>

        <label
          onClick={() => setFocused(true)}
          className="absolute right-2.5 top-4 z-10
          origin-top-right -translate-y-4 scale-75 transform select-none text-sm
          text-primary duration-300 peer-placeholder-shown:translate-y-0
          peer-placeholder-shown:scale-100 peer-focus:-translate-y-4
          peer-focus:scale-75 peer-focus:text-accent"
        >
          {label}
        </label>
      </div>
    );
  };

  return WrappedComponent;
}

export default withLabel;
