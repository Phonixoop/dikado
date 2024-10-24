import { Metadata, ResolvingMetadata } from "next";
import React from "react";
import BrandView from "~/app/brands/[name]/brand";
import { api } from "~/trpc/server";

import { Container } from "~/ui/containers";
import { z } from "zod";
// import { createOrderSchema } from "~/server/validations/order.validation";
import { MultiStepProvider } from "~/context/multiform.context";
import { createOrderSchema } from "~/server/validations/order.validation";

const stepNames = [
  "choose_price",
  "choose_recipient",
  "type_message",
  "choose_gift_paint",
  "choose_send_time",
  "error",
  "payed",
];

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params

  const brandName = decodeURIComponent(params.name);
  // fetch data

  return {
    title: `${decodeURIComponent(brandName)} - Buy Gift Cards`,
    description: `Buy ${decodeURIComponent(brandName)} gift cards online. Choose the amount and send it instantly to friends and family.`,
    keywords: `buy gift cards, ${decodeURIComponent(brandName)}, gift vouchers, ${decodeURIComponent(brandName)} cards, e-gift`,
    alternates: {
      canonical: `https://yourwebsite.com/brands/${encodeURIComponent(brandName)}`,
    },
    openGraph: {
      title: `Buy ${decodeURIComponent(brandName)} Gift Cards - Perfect for any Occasion`,
      description: `Send a ${decodeURIComponent(brandName)} gift card via phone number and make someone's day.`,
      url: `https://yourwebsite.com/brands/${encodeURIComponent(brandName)}`,
      images: [
        {
          url: "/path/to/brand-image.jpg",
          alt: `${decodeURIComponent(brandName)} Gift Card`,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `Get ${decodeURIComponent(brandName)} Gift Cards`,
      description: `Shop and send ${decodeURIComponent(brandName)} gift cards easily.`,
      images: [
        {
          url: "/path/to/brand-image.jpg",
          alt: `${decodeURIComponent(brandName)} Gift Card`,
        },
      ],
    },
    robots: "index, follow",
    viewport: "width=device-width, initial-scale=1",
  };
}

type Props = {
  params: { name: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
export type TOrder = z.infer<typeof createOrderSchema>;
const stepFieldMap = [["price"], ["recipients"], ["send_date"]];
// let initialValues: TOrder = generateDefaultObjectFromZod(createOrderSchema);
// initialValues = {
//   ...initialValues,
//   price: 10_00_000,
// };
export default async function SingleBrandPage(props: Props) {
  const brand = await api.brand.getBrandByName({
    name: decodeURIComponent(props.params.name),
  });

  return (
    <Container className="md:w-full">
      <MultiStepProvider<TOrder>
        validationSchema={"createOrder"}
        stepNames={stepNames}
        stepDependencies={[[], [0], [0, 1], [1], [1]]}
        initialValues={{
          price: 10_00_000,
          recipients: [
            {
              value: "",
              type: "MOBILE",
            },
          ],
          brandId: brand.id,
        }}
        stepFieldMap={stepFieldMap}
      >
        <BrandView brand={brand} />
      </MultiStepProvider>
    </Container>
  );
}
