"use client";
import { useState } from "react";
import { api as server } from "~/trpc/server";

import {
  CheckCheckIcon,
  Gift,
  KeySquareIcon,
  Loader2Icon,
  ShieldAlertIcon,
  FileSignatureIcon,
  BanknoteIcon,
  ClipboardSignatureIcon,
  SignatureIcon,
  UserPlusIcon,
  UserPlus2Icon,
} from "lucide-react";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import withLabel from "~/ui/forms/with-label";
import IntegerField from "~/ui/forms/integer-field";
import Button from "~/ui/buttons";
import Image from "next/image";
import { cn } from "~/lib/utils";
import DikadoLogo from "~/ui/icons/dikado";
import { commify } from "~/utils/util";
import { ChoosePrice } from "~/app/brands/[name]/choose-price";
import MultiStep from "~/features/multi-step";
import ChooseRecipient from "~/app/brands/[name]/choose-recipient";

const IntegerFieldWithLable = withLabel(IntegerField);
const icons = [
  <BanknoteIcon key={1} className="stroke-inherit" />,
  <UserPlus2Icon key={3} className="translate-x-[1.75px] stroke-inherit" />,
  <SignatureIcon key={2} className="stroke-inherit" />,
  <Loader2Icon key={4} className="stroke-inherit" />,
  <ShieldAlertIcon key={5} className="stroke-red-500" />,
  <CheckCheckIcon key={6} className="stroke-inherit" />,
];
export default function DigitalGiftCard({
  brand,
}: {
  brand: Awaited<ReturnType<typeof server.brand.getBrandByName>>;
}) {
  return (
    <>
      <div dir="rtl" className="min-h-screen p-4 md:p-8">
        <Card className="mx-auto overflow-hidden border border-primary">
          <div className="w-full md:flex">
            <BrandDetailds brand={brand} />
            <MultiStep className="gap-0 py-5" icons={icons}>
              <ChoosePrice />
              <ChooseRecipient />
              <ChoosePrice />
              <ChoosePrice />
            </MultiStep>
          </div>
        </Card>
      </div>
    </>
  );
}

function BrandDetailds({
  brand,
}: {
  brand: Awaited<ReturnType<typeof server.brand.getBrandByName>>;
}) {
  const sanitizedImageUrl = brand.image_url.startsWith("./")
    ? brand.image_url.substring(1)
    : brand.image_url;

  return (
    <div className="flex flex-col justify-between border-b border-accent p-6 text-primary md:w-1/2 md:border-b-0 md:border-l md:p-8">
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
        <DikadoLogo className="mx-auto h-24 w-24" />
      </div>
    </div>
  );
}
