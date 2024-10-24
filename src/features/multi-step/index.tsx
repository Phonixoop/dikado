import React, { FC, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { twMerge } from "tailwind-merge";
import Button from "~/ui/buttons";
import { useMultiStep } from "~/context/multiform.context";
import { cn } from "~/lib/utils";

// Define the props interface
interface MultiStepProps {
  children: React.ReactNode;
  className?: string;
  currentStep?: number;
  isLoading?: boolean;
  loadingSteps?: number[];
  onStepClick?: (step: number) => void;
  icons?: React.ReactNode[];
  steps?: React.ReactNode[];
  onNext?: () => void;
  onPrevious?: () => void;
}

// Define the component with props typed
const MultiStep: FC<MultiStepProps> = ({
  children,
  className = "",
  isLoading = false,
  loadingSteps = [],
  onStepClick = (step: number) => {},
  icons = [],
  steps = [],
}) => {
  const {
    currentStepIndex,
    previousStep,
    formik,
    nextStep,
    goToStep,
    validateStep,
    arePreviousStepsValid,
  } = useMultiStep();
  const stepsArray = React.Children.toArray(children);
  const currentStepNode: React.ReactNode = stepsArray[currentStepIndex];
  const [isStepValid, setIsStepValid] = useState<boolean[]>(
    new Array(icons.length).fill(true),
  );

  useEffect(() => {
    // Validate all steps when currentStepIndex changes
    const validityArray = icons.map((_, index) => {
      const isValid = validateStep(index);
      return isValid;
    });

    // Update the validity state with the new array
    setIsStepValid(validityArray);
  }, [currentStepIndex, formik.errors]); // Depend on form values and step index
  return (
    <div
      className={cn(
        "flex w-full flex-col items-center justify-start gap-5",
        className,
      )}
    >
      <div className="relative flex min-h-[150px] w-full items-center justify-center gap-2 overflow-hidden md:w-2/3">
        <div className="absolute z-0 h-[1px] w-11/12 bg-gradient-to-r from-transparent from-0% via-accent via-50% to-transparent to-100%">
          {loadingSteps.includes(currentStepIndex) && (
            <div
              style={{
                left: `${Math.min(currentStepIndex * 10, 100)}%`,
              }}
              className="absolute left-[50.5%] top-0 -z-10 hidden h-[28px] w-[40%] transition-all duration-300 sm:block"
            >
              <svg
                className="translate-x-0 translate-y-0"
                preserveAspectRatio="none"
                height="28px"
                width="100%"
                viewBox="0 0 482 28"
                fill="none"
              >
                <path d="M4 0.5H482" className="stroke-secondary"></path>
                <path
                  d="M16 0.5H466"
                  stroke="url(#kjhsdfg87346kjhs)"
                  strokeDasharray="4 4"
                  className="stroke-primary"
                ></path>
                <path
                  d="M0.5 0.5C29 0.5 20 27.5 49.5 27.5C49.5 27.5 400.5 27.5 433 27.5C465.5 27.5 448.5 0.5 482 0.5"
                  pathLength="1"
                  stroke="url(#klujyhsertd9087645uigh)"
                  className="Onboarding_TrackBranchLine__UTQSQ"
                ></path>
                <defs>
                  <linearGradient
                    id="kjhsdfg87346kjhs"
                    x1="0"
                    y1="0"
                    x2="482"
                    y2="28"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="var(--accent)"></stop>
                    <stop offset="1" stopColor="var(--accent)"></stop>
                  </linearGradient>
                  <linearGradient
                    id="klujyhsertd9087645uigh"
                    x1="0"
                    y1="0"
                    x2="482"
                    y2="28"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0" stopColor="var(--accent)"></stop>
                    <stop offset="0.1" stopColor="var(--bg-purple)"></stop>
                    <stop offset="1" stopColor="var(--bg-primary)"></stop>
                  </linearGradient>
                </defs>
              </svg>
            </div>
          )}
        </div>
        <div className="absolute inset-0 flex w-full items-center justify-between">
          <Button
            disabled={isLoading}
            className={twMerge(
              "group absolute left-1 z-20 rounded-full bg-secondary p-1.5 ring-1 ring-accent transition duration-500 hover:bg-accent/20 hover:ring-secondary",
              currentStepIndex === 0 ? "opacity-0" : "opacity-100",
            )}
            onClick={() => {
              if (currentStepIndex - 1 >= 0) previousStep();
            }}
          >
            <ChevronLeft className="h-5 w-5 stroke-accent group-hover:stroke-accent" />
          </Button>
          <Button
            disabled={isLoading}
            className={twMerge(
              "group absolute right-1 z-20 rounded-full bg-secondary p-1.5 ring-1 ring-accent transition duration-500 hover:bg-accent/20 hover:ring-secondary",
              currentStepIndex === icons.length - 1
                ? "opacity-0"
                : "opacity-100",
            )}
            onClick={() => {
              if (currentStepIndex + 1 <= icons.length - 1) nextStep();
            }}
          >
            <ChevronRight className="h-5 w-5 stroke-accent group-hover:stroke-accent" />
          </Button>
        </div>
        <div className="relative flex h-full w-full items-center justify-center gap-10">
          {icons.map((icon, i) => {
            const offset = currentStepIndex === icons.length ? 25 : 28;
            const currentLeft = offset + i * offset;
            const distance = Math.abs(currentStepIndex - i);
            const scale =
              distance === 1 ? "100%" : distance === 2 ? "70%" : "0%";

            return (
              <button
                disabled={isLoading || !arePreviousStepsValid(i)}
                key={i}
                onClick={() => goToStep(i)}
                className={cn(
                  "z-1 group absolute flex -translate-x-1/2 scale-75 cursor-pointer rounded-full border bg-secondary transition-all duration-200 disabled:cursor-not-allowed",

                  isStepValid[i] &&
                    currentStepIndex === i &&
                    "border-primary bg-primary stroke-secondary text-accent disabled:border-none disabled:bg-slate-700",
                  isStepValid[i] &&
                    currentStepIndex !== i &&
                    "border-accent disabled:border-none",
                  !isStepValid[i] &&
                    "border border-rose-500 bg-rose-950 stroke-rose-500 opacity-0 disabled:border-none disabled:bg-slate-700 sm:opacity-100",

                  loadingSteps.includes(i) ? "sm:bottom-5" : "",
                  "",
                )}
                style={{
                  left:
                    currentStepIndex === i
                      ? `${50}%`
                      : `${Math.min(currentLeft - currentStepIndex * 20, 100)}%`,
                  scale: currentStepIndex === i ? "130%" : scale,
                }}
              >
                <span
                  className={cn(
                    "cursor-pointer rounded-full stroke-inherit p-3 transition-all duration-1000 group-disabled:cursor-not-allowed",

                    isStepValid[i] &&
                      currentStepIndex !== i &&
                      "bg-accent/30 stroke-accent text-accent group-disabled:bg-accent/50 group-disabled:stroke-accent/90",
                    currentStepIndex === i ? "opacity-100" : "opacity-60",
                    currentStepIndex === i && loadingSteps.includes(i)
                      ? "animate-spin"
                      : "",
                  )}
                >
                  {" "}
                  <span className="text-inherit">{icon}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
      {currentStepNode}
    </div>
  );
};

export default MultiStep;
