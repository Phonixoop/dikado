"use client";
import { useFormik } from "formik";
import { FormInputIcon } from "lucide-react";
import React from "react";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import ChooseRecipient from "~/app/brands/[name]/choose-recipient";
import InputError from "~/ui/forms/input-error";
import PhoneField from "~/ui/forms/phone-field";

const createOrderSchema = z.object({
  phonenumber: z.string({ required_error: "این مقدار اجباری است" }).length(11),
});

export default function pageTest() {
  const formik = useFormik({
    initialValues: {
      phonenumber: "",
    },
    validateOnMount: true,
    validateOnBlur: true,

    validationSchema: toFormikValidationSchema(createOrderSchema),
    onSubmit: () => {},
  });
  return (
    <div>
      <PhoneField
        value={formik.values.phonenumber}
        onValueChange={(value) => formik.setFieldValue("phonenumber", value)}
      />
      <InputError message={formik.errors.phonenumber} />
    </div>
  );
}
