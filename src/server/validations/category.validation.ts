import { z } from "zod";

// Define the schema for FormAccountingDocumentTableType

export const updateCategorySchema = z.object({
  id: z.string(),
  icon_url: z.string().nullish().optional(),
  name: z
    .string({ required_error: "این فیلد اجباری است" })
    .min(3, "نام دسته بندی نمی تواند کمتر از 3 کاراکتر باشد"),
});

// Define the schema for FormType
export const createCategorySchema = z.object({
  icon_url: z.string().nullish().optional(),
  name: z.string({ required_error: "این فیلد اجباری است" }),
});

export const categoryIdSchema = z.object({
  id: z.string({ required_error: "این فیلد اجباری است" }),
});
