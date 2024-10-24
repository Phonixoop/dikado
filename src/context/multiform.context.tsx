"use client";
import { FormikHelpers, useFormik } from "formik";
import React, { ReactNode, createContext, useContext, useState } from "react";

import { SCHEMAS } from "~/server/validations";

type TMultiStepContext<T> = {
  currentStepIndex: number;
  currentStepName: string;
  isValid: boolean;
  setIsValid: (value: boolean) => void;
  goToStep: (
    step: number | string,
    onValidate?: ({ stepName, stepIndex }) => boolean,
  ) => void;
  nextStep: (onValidate?: ({ stepName, stepIndex }) => boolean) => void;
  previousStep: (onValidate?: ({ stepName, stepIndex }) => boolean) => void;
  formik: ReturnType<typeof useFormik<T>>;
  validateStep: (step: number | string) => boolean; // New function
  arePreviousStepsValid(step: number | string): boolean;
  // setBeforeStepChange: (
  //   fn: (nextStepName: string, nextStepIndex: number) => boolean,
  // ) => void;
  // setOnCurrentStep: (
  //   fn: (currentStepName: string, currentStepIndex: number) => void,
  // ) => void; // Step event hook
};

type MultiStepProviderProps<T> = {
  children: ReactNode;
  stepNames: string[];
  stepDependencies?: number[][];
  initialStep?: number;
  initialValues: T;
  validationSchema: keyof typeof SCHEMAS;
  stepFieldMap?: string[][];
  onSubmit?: (values: T, helpers: FormikHelpers<T>) => void;
};
const MultiStepContext = createContext<TMultiStepContext<any> | undefined>(
  undefined,
);

export const useMultiStep = <T extends object>() => {
  const context = useContext(
    MultiStepContext as React.Context<TMultiStepContext<T> | undefined>,
  );
  if (!context) {
    throw new Error(
      "useMultiStepForm must be used within a MultiStepFormContextProvider",
    );
  }
  return context;
};
export function MultiStepProvider<T extends object>({
  children,
  stepNames,
  stepDependencies = [],
  initialStep = 0,
  initialValues,
  validationSchema,
  stepFieldMap,

  onSubmit,
}: MultiStepProviderProps<T>) {
  const [currentStepIndex, setCurrentStepIndex] = useState(initialStep);
  const [isValid, setIsValid] = useState<boolean>(false);
  const currentStepName = stepNames[currentStepIndex]; // Get the current step name from the steps array

  // Initialize formik dynamically with the given schema and initial values
  const formik = useFormik<T>({
    initialValues: initialValues as T,
    validateOnMount: true,
    validateOnBlur: true,
    validateOnChange: true,
    validationSchema: SCHEMAS[validationSchema],
    onSubmit,
  });
  const arePreviousStepsValid = (step: number | string): boolean => {
    let stepIndex = typeof step === "number" ? step : stepNames.indexOf(step);
    if (!stepDependencies[stepIndex]) return true; // If no dependencies, no check required
    return stepDependencies[stepIndex].every((depIndex) =>
      validateStep(depIndex),
    ); // Ensure all dependent steps are valid
  };

  const goToStep = (
    step: string | number,
    onValidate = ({ stepName, stepIndex }) => true,
  ) => {
    let stepIndex = typeof step === "number" ? step : stepNames.indexOf(step);
    if (stepIndex < 0 || stepIndex >= stepNames.length) return;

    if (!arePreviousStepsValid(stepIndex)) {
      console.warn(
        `Cannot access step ${stepIndex} because previous steps are not valid.`,
      );
      return;
    }

    // Check if beforeStepChange exists and call it if set
    if (
      onValidate &&
      !onValidate({ stepName: stepNames[stepIndex], stepIndex })
    )
      return;

    if (stepIndex === stepNames.length - 1 && !formik.isValid) return;

    setCurrentStepIndex(stepIndex);
  };

  const nextStep = (onValidate = ({ stepName, stepIndex }) => true) => {
    goToStep(currentStepIndex + 1, onValidate);
  };

  const previousStep = (onValidate = ({ stepName, stepIndex }) => true) => {
    goToStep(currentStepIndex - 1, onValidate);
  };

  function validateStep(step: string | number): boolean {
    if (!stepFieldMap || stepFieldMap.length <= 0) return true;
    let stepIndex = typeof step === "number" ? step : stepNames.indexOf(step);
    if (stepIndex < 0 || stepIndex >= stepNames.length) return false;

    let isStepValid = true;
    if (stepFieldMap[stepIndex]?.length <= 0) return true;
    // Loop through fields associated with the step and check for errors
    for (let i = 0; i < stepFieldMap[stepIndex]?.length; i++) {
      const fieldName = stepFieldMap[stepIndex][i];
      const fieldError = formik.errors[fieldName];

      // If there's an error in the field and it's touched, step is invalid
      if (fieldError) {
        isStepValid = false;
        break; // Exit loop if any field is invalid
      }
    }

    return isStepValid;
  }

  return (
    <MultiStepContext.Provider
      value={{
        currentStepIndex,
        currentStepName,
        goToStep,
        nextStep,
        previousStep,
        isValid,
        setIsValid,
        formik, // Expose formik instance
        validateStep,
        arePreviousStepsValid,
      }}
    >
      {children}
    </MultiStepContext.Provider>
  );
}
