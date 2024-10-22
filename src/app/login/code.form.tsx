import { EditIcon } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { useMultiStep } from "~/context/multiform.context";
import Button from "~/ui/buttons";
import InputError from "~/ui/forms/input-error";
import IntegerField from "~/ui/forms/integer-field";
import PhoneField from "~/ui/forms/phone-field";
import withLabel from "~/ui/forms/with-label";

const IntegerWithLabel = withLabel(IntegerField);

const initialValues = {
  phonenumber: "",
  code: "",
};
export default function ValidationCodeForm() {
  const { formik, nextStep, goToStep } = useMultiStep<typeof initialValues>();

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          nextStep();
        }}
        className="relative flex w-full flex-col items-center justify-center gap-5"
      >
        <IntegerWithLabel
          focused
          label={"کد تایید"}
          value={formik.getFieldProps("code").value}
          onChange={(e: any) => {
            formik.setFieldValue("code", e.target.value);
          }}
          maxLength={4}
        />

        <InputError message={formik.dirty && formik.errors.code} />

        <Button
          type="submit"
          disabled={!!formik.errors.code}
          className="rounded-full border border-primary px-5"
        >
          بعدی
        </Button>
        <Button
          onClick={() => {
            goToStep("phonenumber");
          }}
          className="rounded-full border border-primary bg-transparent px-5"
        >
          <EditIcon />
          تغییر شماره
        </Button>
      </form>
    </>
  );
}
