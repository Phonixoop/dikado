import { ContactIcon, MessageCircleHeartIcon } from "lucide-react";
import React from "react";
import { TOrder } from "~/app/brands/[name]/page";
import { useMultiStep } from "~/context/multiform.context";
import { wordifyfa, wordifyRialsInTomans } from "~/lib/wordify/wordifyfa";
import Button from "~/ui/buttons";
import PhoneField from "~/ui/forms/phone-field";
import TextField from "~/ui/forms/text-field";
import TextAreaField from "~/ui/forms/textarea-field";
import withLabel from "~/ui/forms/with-label";
import { commify } from "~/utils/util";

const TextAreaWithLabel = withLabel(TextAreaField);
export default function TypeMessage() {
  const { formik, nextStep, previousStep, goToStep } = useMultiStep<TOrder>();

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <p>
        کارت هدیه به ارزش{" "}
        <span
          className="cursor-pointer font-bold text-accent"
          onClick={() => {
            goToStep(0);
          }}
        >
          {wordifyRialsInTomans(formik.values.price)}
        </span>{" "}
        به شماره{" "}
        <span
          className="cursor-pointer font-bold text-accent"
          onClick={() => {
            previousStep();
          }}
        >
          {formik.values.recipients[0].value}
        </span>
      </p>

      <div className="w-full">
        <TextAreaWithLabel
          className="max-h-96"
          label="پیام"
          value={formik.values.message}
          onValueChange={(value) => {
            formik.setFieldValue("message", value);
          }}
        />
      </div>

      <Button
        disabled={formik.errors?.message?.length > 0}
        onClick={() => {
          nextStep();
        }}
        className="flex h-12 w-full justify-center gap-2 border border-accent text-lg transition-all duration-300 hover:border-accent/30 hover:bg-accent/20"
      >
        <MessageCircleHeartIcon className="mr-2 h-5 w-5" /> ادامه{" "}
      </Button>
    </div>
  );
}
