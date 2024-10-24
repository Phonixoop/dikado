import { z } from "zod";

// Define the schema for FormAccountingDocumentTableType

export const updateBrandSchema = z.object({
  id: z.string(),
  image_url: z.string().nullish().optional(),
  name: z
    .string({ required_error: "این فیلد اجباری است" })
    .min(3, "نام دسته بندی نمی تواند کمتر از 3 کاراکتر باشد"),
  categoryIds: z.array(z.string()).nullish().optional(),
});

// Define the schema for FormType
export const createOrderSchema = z.object({
  authority: z.string(),

  price: z.number(),
  recipients: z
    .array(
      z.object({
        value: z.string({ required_error: "این مقدار اجباری است" }).length(11),
        type: z.enum(["MOBILE", "EMAIL"]),
      }),
    )
    .min(1),
  message: z.string().nullish(),
  send_by_system: z.boolean().nullish().default(false),
  send_date: z.date().nullish(),

  brandId: z.string(),

  userId: z.string(),
});

export const brandIdSchema = z.object({
  id: z.string({ required_error: "این فیلد اجباری است" }),
});

export const brandNameSchema = z.object({
  name: z.string({ required_error: "این فیلد اجباری است" }),
});

export const filterBrandsByCategoriesSchema = z.object({
  categoryNames: z
    .array(
      z
        .string({ required_error: "این فیلد اجباری است" })
        .min(3, "نام دسته بندی نمی تواند کمتر از 3 کاراکتر باشد"),
    )
    .optional(),
});
