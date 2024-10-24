"use client";
import { useState } from "react";

import { BanknoteIcon } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "~/components/shadcn/radio-group";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/shadcn/card";
import { Label } from "~/components/shadcn/label";
import withLabel from "~/ui/forms/with-label";
import Button from "~/ui/buttons";
import { cn } from "~/lib/utils";
import { wordifyRialsInTomans } from "~/lib/wordify/wordifyfa";
import { PriceField } from "~/ui/forms/price-field";
import { useMultiStep } from "~/context/multiform.context";
import { TOrder } from "~/app/brands/[name]/page";

const PriceFieldWithLabel = withLabel(PriceField);
const PRICES = [
  {
    label: 100,
    value: 10_00_000,
  },
  {
    label: 200,
    value: 20_00_000,
  },
  {
    label: 300,
    value: 30_00_000,
  },
  {
    label: 500,
    value: 50_00_000,
  },
];

export function ChoosePrice() {
  const { formik, nextStep } = useMultiStep<TOrder>();

  const [selectedAmount, setSelectedAmount] = useState(
    formik.values.price || "custom",
  );
  const [customAmount, setCustomAmount] = useState(undefined);

  const handleAmountChange = (value: string) => {
    setSelectedAmount(parseInt(value));
    setCustomAmount(undefined);
    formik.setFieldValue("price", parseInt(value));
  };

  const handleCustomAmountChange = (value: string) => {
    if (value.length > 0) {
      setCustomAmount(parseInt(value));
      formik.setFieldValue("price", parseInt(value));
      setSelectedAmount("custom");
    } else {
      setCustomAmount(undefined);
      setSelectedAmount(PRICES[0].value);
      formik.setFieldValue("price", PRICES[0].value);
    }
  };

  const getFinalAmount = () => {
    if (selectedAmount === "custom") {
      return customAmount && customAmount > 0
        ? `| ${wordifyRialsInTomans(customAmount)}  `
        : "";
    }
    return `| ${wordifyRialsInTomans(selectedAmount)}  `;
  };
  function isAmountValid() {
    if (selectedAmount === "custom")
      if (!customAmount || customAmount < 0) return false;

    if (!selectedAmount) return false;
  }

  return (
    <>
      <div className="rounded-lg text-center md:w-1/2">
        <CardHeader className="flex flex-col gap-4">
          <CardTitle>انتخاب قیمت (تومان)</CardTitle>
          <CardDescription>
            مقدار از پیش تعریف شده را انتخاب کنید یا مقدار خود را وارد کنید
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={selectedAmount.toString()}
            onValueChange={handleAmountChange}
            className="mb-4 flex flex-wrap justify-center gap-4 md:justify-center"
          >
            {PRICES.map((amount) => (
              <div key={amount.label}>
                <RadioGroupItem
                  value={amount.value.toString()}
                  id={`amount-${amount.label}`}
                  className="peer sr-only"
                />
                <Label
                  htmlFor={`amount-${amount.label}`}
                  className={cn(
                    "flex h-12 w-20 cursor-pointer items-center justify-center rounded-md border-2 border-primary/60 bg-secondary text-lg hover:bg-accent/10 hover:text-accent",
                    "peer-data-[state=checked]:border-accent peer-data-[state=checked]:bg-accent/40 peer-data-[state=checked]:text-accent",
                    "peer-data-[state=checked]:font-bold",
                  )}
                >
                  {amount.label}
                </Label>
              </div>
            ))}{" "}
            <div>
              <PriceFieldWithLabel
                maxLength={10}
                label="مبلغ دلخواه (تومان)"
                value={customAmount}
                onValueChange={handleCustomAmountChange}
                className={cn(
                  "w-full rounded-lg border border-accent",
                  selectedAmount === "custom"
                    ? "bg-accent/10"
                    : "rounded-none border-l-0 border-r-0 border-t-0 border-b-accent bg-transparent",
                )}
              />
            </div>
          </RadioGroup>
        </CardContent>

        <CardFooter className="flex flex-col items-stretch gap-4">
          <Button
            disabled={
              isAmountValid() === false && formik.errors.price?.length <= 0
            }
            onClick={() => {
              nextStep();
            }}
            className="flex h-12 w-full max-w-xs justify-center gap-2 border border-accent text-lg transition-all duration-300 hover:border-accent/30 hover:bg-accent/20 sm:max-w-lg"
          >
            <BanknoteIcon className="mr-2 h-5 w-5" /> ادامه{" "}
            <span className="truncate text-accent">{getFinalAmount()}</span>
          </Button>
          <p className="text-muted-foreground text-center text-sm">
            این کارت هدیه دیجیتال از طریق ایمیل تحویل داده می شود و می تواند
            برای هر محصولی در فروشگاه ما استفاده می شود.
          </p>
        </CardFooter>
      </div>
    </>
  );
}
