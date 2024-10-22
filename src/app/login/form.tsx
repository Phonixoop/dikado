"use client";

import { useFormik } from "formik";
import {
  CheckCheckIcon,
  FormInputIcon,
  KeySquareIcon,
  Loader2Icon,
  ShieldAlertIcon,
  UserIcon,
} from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { toFormikValidationSchema } from "zod-formik-adapter";
import ValidationCodeForm from "~/app/login/code.form";
import PhonenumberForm from "~/app/login/phonenumber.form";
import { useMultiStep } from "~/context/multiform.context";
import MultiStep from "~/features/multi-step";
import { userLoginSchema } from "~/server/validations/user.validation";
import { api } from "~/trpc/react";
import Button from "~/ui/buttons";
import InputError from "~/ui/forms/input-error";
import PasswordField from "~/ui/forms/password-field";
import PhoneField from "~/ui/forms/phone-field";

import TextField from "~/ui/forms/text-field";
import withLabel from "~/ui/forms/with-label";
import { delay } from "~/utils/util";

const TextFieldWithLable = withLabel(TextField);
const PhoneWithLabel = withLabel(PhoneField);

const icons = [
  <UserIcon key={1} className="stroke-inherit" />,
  <Loader2Icon key={2} className="stroke-inherit" />,
  <KeySquareIcon key={3} className="stroke-inherit" />,
  <Loader2Icon key={4} className="stroke-inherit" />,
  <ShieldAlertIcon key={5} className="stroke-red-500" />,
  <CheckCheckIcon key={6} className="stroke-inherit" />,
];

type StepNames =
  | "phonenumber"
  | "wait_sendcode"
  | "entercode"
  | "wait_validatecode"
  | "error"
  | "welcome";

export const initialValues = {
  phonenumber: "",
  code: "",
};
export default function CreateAccountForm() {
  const {
    currentStepName,
    currentStepIndex,
    previousStep,
    nextStep,
    goToStep,
    isValid,
    setIsValid,
    formik,
  } = useMultiStep<typeof initialValues>();

  const [code, setCode] = useState();
  useEffect(() => {
    if (currentStepName === "welcome" && !formik.isValid) previousStep();
    if (currentStepName === "welcome" && !isValid) previousStep();
    if (currentStepName === "welcome" && formik.isValid && isValid) {
      delay(1000).then(() => {
        signIn();
      });
    }

    if (currentStepName === "wait_sendcode") {
      sendCode({ sendCodeMutate, phonenumber: formik.values.phonenumber })
        .then(([value, error]) => {
          setCode(value.code);
          if (!error) nextStep();
          else previousStep();
        })
        .catch(() => {
          previousStep();
        });
    } else if (currentStepName === "wait_validatecode") {
      validateCode({
        phonenumber: formik.values.phonenumber,
        code: formik.values.code,
      })
        .then(([value, error]) => {
          if (!error) {
            setIsValid(true);
            goToStep("welcome");
          } else goToStep("error");
        })
        .catch(() => {
          previousStep();
        });
    }
  }, [currentStepIndex]);

  const sendCodeMutate = api.user.generateCode.useMutation({
    onSuccess: (value) => {
      toast.success(value.code);
    },
  });

  // Set the beforeStepChange function

  return (
    <div className="h-[500px] w-full rounded-3xl bg-secbuttn px-5 py-10">
      <div className="flex flex-col items-center justify-center">
        <FormInputIcon className="animate-pulse stroke-primary" />
        <h2 className="w-full text-center text-accent">ورود</h2>
        {code}
      </div>
      <MultiStep
        loadingSteps={[1, 3]}
        isLoading={sendCodeMutate.isPending}
        icons={icons}
      >
        <PhonenumberForm />
        <ViewSendingCode />
        <ValidationCodeForm />
        <ViewCheckingCode />
        <Error />
        <Welcome />
      </MultiStep>
    </div>
  );
}

async function sendCode({ sendCodeMutate, phonenumber }) {
  try {
    const result = await sendCodeMutate.mutateAsync({
      phonenumber,
    });

    return [result, undefined];
  } catch (error) {
    return [undefined, error];
  }
}
async function validateCode({ phonenumber, code }) {
  try {
    const result = await signIn("credentials", {
      phonenumber,
      verificationCode: code,
      callbackUrl: `${window.location.origin}/`,
      redirect: false,
    });
    if (result?.error) {
      return [undefined, result.error];
    }

    return [result, undefined];
  } catch (error) {
    return [undefined, error];
  }
}

function ViewSendingCode() {
  return <span className="pb-10 text-primary">در حال فرستادن کد تایید</span>;
}
function ViewCheckingCode() {
  return <span className="pb-10 text-primary">در حال بررسی</span>;
}
function Error() {
  const { goToStep } = useMultiStep<typeof initialValues>();
  return (
    <>
      <span className="pb-10 text-primary">کد تایید اشتباه وارد شده است</span>
      <Button
        className="rounded-full border border-primary"
        onClick={() => goToStep("entercode")}
      >
        دوباره وارد کنید
      </Button>
    </>
  );
}
function Welcome() {
  return <span className="pb-10 text-primary">خوش آمدید</span>;
}

// steps={[
//   <>
//     <form
//       key={0}
//       onSubmit={(e) => {
//         e.preventDefault();
//         goTo(step + 1);
//       }}
//       className="relative flex w-full flex-col items-center justify-center gap-5"
//     >
//       <PhoneWithLabel
//         label={"شماره موبایل"}
//         value={formik.getFieldProps("phonenumber").value}
//         onChange={(e: any) => {
//           formik.setFieldValue("phonenumber", e.target.value);
//         }}
//         onKeyDown={(e: any) => Enter(e)}
//       />

//       <InputError message={formik.dirty && formik.errors.phonenumber} />

//       <Button
//         disabled={!!formik.errors.phonenumber}
//         className="rounded-full border border-primary px-5"
//         onClick={() => {
//           goTo(step + 1);
//         }}
//       >
//         بعدی
//       </Button>
//     </form>
//   </>,
//   <span key={1} className="pb-10 text-primary">
//     در حال فرستادن کد تایید
//   </span>,
//   <>
//     <div
//       key={2}
//       className="relative flex w-full flex-col items-center justify-center gap-5"
//     >
//       <TextFieldWithLable
//         label={"کد تایید"}
//         value={formik.getFieldProps("verificationCode").value}
//         onChange={(value: any) => {
//           formik.setFieldValue("verificationCode", value.target.value);
//         }}
//         type="verificationCode"
//         ref={verificationCodeFieldRef}
//         onKeyDown={(e: any) => Enter(e)}
//       />

//       <InputError
//         message={
//           formik.getFieldMeta("code").initialTouched &&
//           formik.errors.code
//         }
//       />
//       <Button
//         disabled={!!formik.errors.code}
//         className="rounded-full border border-primary px-5"
//         onClick={() => {
//           goTo(step + 1);
//         }}
//       >
//         بعدی
//       </Button>
//     </div>
//   </>,
//   <span key={3} className="pb-10 text-primary">
//     در حال بررسی
//   </span>,
//   <div
//     key={4}
//     className="flex flex-col items-center justify-center gap-4"
//   >
//     <span className="text-red-500">
//       رمز عبور یا نام کاربری اشتباه است
//     </span>
//     <Button
//       className="rounded-full border border-primary px-5"
//       onClick={() => {
//         setStep(0);
//       }}
//     >
//       بازگشت
//     </Button>
//   </div>,
//   <span key={5} className="text-primary">
//     خوش آمدید
//   </span>,
// ]}
