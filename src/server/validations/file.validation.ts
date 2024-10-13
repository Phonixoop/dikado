import { z } from "zod";

// Define the schema for FormAccountingDocumentTableType

export const fileIdSchema = z.object({
  id: z.string({ required_error: "این فیلد اجباری است" }),
});

export const deleteFileSchema = z.object({
  id: z.string({ required_error: "این فیلد اجباری است" }),
  fileName: z.string({ required_error: "این فیلد اجباری است" }),
});
export const updateFileSchema = z.object({
  id: z.string({ required_error: "این فیلد اجباری است" }),
  tag: z.string({ required_error: "این فیلد اجباری است" }),
});
