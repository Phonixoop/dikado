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
export const createBrandSchema = z.object({
  image_url: z.string().nullish().optional(),
  name: z.string({ required_error: "این فیلد اجباری است" }),
  categoryIds: z.array(z.string()).nullish().optional(),
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
