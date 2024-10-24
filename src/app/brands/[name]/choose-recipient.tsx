import { ContactIcon } from "lucide-react";
import React from "react";
import { TOrder } from "~/app/brands/[name]/page";
import { useMultiStep } from "~/context/multiform.context";
import { wordifyRialsInTomans } from "~/lib/wordify/wordifyfa";
import Button from "~/ui/buttons";
import PhoneField from "~/ui/forms/phone-field";
import withLabel from "~/ui/forms/with-label";

const PhoneWithLabel = withLabel(PhoneField);
export default function ChooseRecipient() {
  const { formik, nextStep, previousStep } = useMultiStep<TOrder>();

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <p>
        کارت هدیه به ارزش{" "}
        <span
          className="cursor-pointer font-bold text-accent"
          onClick={() => {
            previousStep();
          }}
        >
          {wordifyRialsInTomans(formik.values.price)}
        </span>{" "}
      </p>

      <div className="w-full">
        <PhoneWithLabel
          maxLength={11}
          label="مخاطب"
          value={formik.values?.recipients?.[0]?.value ?? ""}
          onValueChange={(value) => {
            console.log({ value });
            formik.setFieldValue("recipients[0].value", value);
          }}
        />
      </div>
      <Button
        disabled={formik.errors?.recipients?.length > 0}
        onClick={() => {
          nextStep();
        }}
        className="flex h-12 w-full justify-center gap-2 border border-accent text-lg transition-all duration-300 hover:border-accent/30 hover:bg-accent/20"
      >
        <ContactIcon className="mr-2 h-5 w-5" /> ادامه{" "}
      </Button>
    </div>
  );
}
