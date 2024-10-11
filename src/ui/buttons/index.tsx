"use client";

import React, { MouseEvent, FunctionComponent } from "react";
//import Circle  from "ui/icons/loadings/circle";
import ThreeDotsWave from "~/ui/loadings/three-dots-wave";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

type ButtonProps = {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  isLoading?: boolean;
  className?: string;
  initialTranslateY?: number;
  translateY?: number;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
};

export default function Button({
  children,
  type = "button",
  disabled = false,
  isLoading = false,
  className = "",
  initialTranslateY = 0,
  translateY = 0,
  onClick = (e) => {},
  ...rest
}: ButtonProps): JSX.Element {
  const enabledClass = `hover:bg-opacity-95 cursor-pointer`;
  const busyClass = `bg-gray-200 text-gray-500 cursor-not-allowed `;

  return (
    <motion.button
      whileTap={{
        scale: disabled || isLoading ? 1 : 0.95,
        transition: {
          duration: 0,
        },
      }}
      initial={{ y: initialTranslateY }}
      animate={{
        y: translateY,
      }}
      transition={{ duration: 0.2, ease: "linear" }}
      disabled={disabled || isLoading}
      dir="rtl"
      //@ts-ignore
      type={type}
      onClick={onClick}
      className={twMerge(
        "duration-400 relative flex  select-none items-center justify-center rounded-lg p-2  text-primary ",
        className,
        !disabled ? enabledClass : busyClass,
        isLoading ? "bg-opacity-10" : "",
      )}
      {...rest}
    >
      {children}
      <div
        dir="rtl"
        className="absolute top-7 flex  h-fit w-fit items-center justify-start"
      >
        {isLoading && <ThreeDotsWave />}
      </div>
    </motion.button>
  );
}
