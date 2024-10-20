"use client";
import { useState } from "react";
import { api as server } from "~/trpc/server";

import { Gift, ShoppingCart } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "~/app/_components/radio-group";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/app/_components/card";
import { Label } from "~/app/_components/label";
import withLabel from "~/ui/forms/with-label";
import IntegerField from "~/ui/forms/integer-field";
import Button from "~/ui/buttons";
import Image from "next/image";
import { cn } from "~/lib/utils";
import DikadoLogo from "~/ui/icons/dikado";
import { commify } from "~/utils/util";
const TextFieldWithLable = withLabel(IntegerField);

export default function DigitalGiftCard({
  brand,
}: {
  brand: Awaited<ReturnType<typeof server.brand.getBrandByName>>;
}) {
  const sanitizedImageUrl = brand.image_url.startsWith("./")
    ? brand.image_url.substring(1)
    : brand.image_url;

  const [selectedAmount, setSelectedAmount] = useState("25");
  const [customAmount, setCustomAmount] = useState("");

  const handleAmountChange = (value: string) => {
    setSelectedAmount(value);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) setSelectedAmount("25");
    setCustomAmount(e.target.value);
    setSelectedAmount("custom");
  };

  const getFinalAmount = () => {
    if (selectedAmount === "custom") {
      return customAmount
        ? `| ${commify(parseFloat(customAmount))} هزار تومان `
        : "";
    }
    return `| ${commify(selectedAmount)} هزار تومان  `;
  };

  return (
    <div dir="rtl" className="min-h-screen p-4 md:p-8">
      <Card className="mx-auto max-w-4xl overflow-hidden shadow-sm shadow-accent">
        <div className="md:flex">
          <div className="flex flex-col justify-between border-l border-accent p-6 text-primary md:w-1/2 md:p-8">
            <div>
              <h1 className="mb-4 bg-gradient-to-tr from-red-600 via-violet-600 to-accent bg-clip-text text-3xl font-bold text-transparent">
                خرید کادو دیجیتال از {brand.name}
              </h1>
              <p className="mb-6 text-primary">
                با کارت هدیه دیجیتالی ما هدیه دلخواه را بدهید. ایده آل برای هر
                مناسبتی!
              </p>
            </div>
            <div className="mt-auto flex w-full items-center justify-center">
              <Image
                src={sanitizedImageUrl}
                height={250}
                width={250}
                alt={brand.name}
                objectFit="cover"
              />
            </div>
            <div className="mt-auto pt-5">
              <DikadoLogo className="mx-auto h-24 w-24 opacity-50" />
            </div>
          </div>
          <div className="p-6 md:w-1/2 md:p-8">
            <CardHeader className="flex flex-col gap-4">
              <CardTitle>انتخاب قیمت (تومان)</CardTitle>
              <CardDescription>
                مقدار از پیش تعریف شده را انتخاب کنید یا مقدار خود را وارد کنید
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={selectedAmount}
                onValueChange={handleAmountChange}
                className="mb-4 flex flex-wrap gap-4"
              >
                {["25", "50", "100", "200"].map((amount) => (
                  <div key={amount}>
                    <RadioGroupItem
                      value={amount}
                      id={`amount-${amount}`}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={`amount-${amount}`}
                      className={cn(
                        "flex h-12 w-20 cursor-pointer items-center justify-center rounded-md border-2 border-primary/60 bg-secondary text-lg hover:bg-accent/10 hover:text-accent",
                        "peer-data-[state=checked]:border-accent peer-data-[state=checked]:bg-accent/40 peer-data-[state=checked]:text-accent",
                        "peer-data-[state=checked]:font-bold",
                      )}
                    >
                      {amount}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              <div className="w-full space-y-2">
                <Label htmlFor="custom-amount">مبلغ دلخواه</Label>
                <div className="flex w-full">
                  <TextFieldWithLable
                    type="number"
                    id="custom-amount"
                    label="مبلغ دلخواه (تومان)"
                    value={customAmount}
                    onChange={handleCustomAmountChange}
                    className="w-full"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-stretch gap-4">
              <Button className="flex h-12 w-full justify-center gap-2 border border-accent text-lg">
                <ShoppingCart className="mr-2 h-5 w-5" /> اضافه کردن{" "}
                <span className="text-accent">{getFinalAmount()}</span>
              </Button>
              <p className="text-muted-foreground text-center text-sm">
                این کارت هدیه دیجیتال از طریق ایمیل تحویل داده می شود و می تواند
                برای هر محصولی در فروشگاه ما استفاده می شود.
              </p>
            </CardFooter>
          </div>
        </div>
      </Card>
    </div>
  );
}
