"use client";
import { FormikConfig, FormikHelpers, useFormik } from "formik";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { boolean } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { userLoginSchema } from "~/server/validations/user.validation";

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
  initialStep?: number;
  initialValues: T;
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
  initialStep = 0,
  initialValues,

  onSubmit,
}: MultiStepProviderProps<T>) {
  const [currentStepIndex, setCurrentStepIndex] = useState(initialStep);
  const [isValid, setIsValid] = useState<boolean>(false);
  const currentStepName = stepNames[currentStepIndex]; // Get the current step name from the steps array

  // Initialize formik dynamically with the given schema and initial values
  const formik = useFormik<T>({
    initialValues,
    validateOnMount: true,
    validateOnBlur: true,
    validationSchema: toFormikValidationSchema(userLoginSchema),
    onSubmit,
  });

  const goToStep = (
    step: string | number,
    onValidate = ({ stepName, stepIndex }) => true,
  ) => {
    let stepIndex = typeof step === "number" ? step : stepNames.indexOf(step);
    if (stepIndex < 0 || stepIndex >= stepNames.length) return;

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
      }}
    >
      {children}
    </MultiStepContext.Provider>
  );
}
