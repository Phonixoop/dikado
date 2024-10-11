import { cn } from "~/lib/utils";

export function Container({ children, className = "", rtl = false, ...rest }) {
  return (
    <div
      className={cn("w-full p-1 sm:w-11/12 ", className)}
      dir={rtl ? "rtl" : ""}
      {...rest}
    >
      {children}
    </div>
  );
}

export function ContainerBottomBorder({
  children,
  className = "",
  rtl = false,
}) {
  return (
    <div
      className={cn(
        " flex w-full items-center justify-center border-b border-b-primary/10",
        className,
      )}
      dir={rtl ? "rtl" : ""}
    >
      {children}
    </div>
  );
}
