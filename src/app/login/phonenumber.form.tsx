import React from "react";
import { useMultiStep } from "~/context/multiform.context";
import { userLoginSchema } from "~/server/validations/user.validation";
import Button from "~/ui/buttons";
import InputError from "~/ui/forms/input-error";
import PhoneField from "~/ui/forms/phone-field";
import withLabel from "~/ui/forms/with-label";

const PhoneWithLabel = withLabel(PhoneField);
const initialValues = {
  phonenumber: "",
  code: "",
};
export default function PhonenumberForm() {
  const { formik, nextStep } = useMultiStep<typeof initialValues>();

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          nextStep();
        }}
        className="relative flex w-full flex-col items-center justify-center gap-5"
      >
        <PhoneWithLabel
          label={"شماره موبایل"}
          value={formik.values.phonenumber}
          onValueChange={(value) => {
            formik.setFieldValue("phonenumber", value);
          }}
          maxLength={11}
        />

        <InputError message={formik.dirty && formik.errors.phonenumber} />

        <Button
          type="submit"
          disabled={!!formik.errors.phonenumber}
          className="rounded-full border border-primary px-5"
        >
          بعدی
        </Button>
      </form>
    </>
  );
}
