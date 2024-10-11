import { z } from "zod";
import { zfd } from "zod-form-data";
// Define the schema for FormAccountingDocumentTableType
export const FormAccountingDocumentTableTypeSchema = z.object({
  group: z.string({ required_error: "این فیلد اجباری است" }),
  total: z.string({ required_error: "این فیلد اجباری است" }),
  moeen: z.string({ required_error: "این فیلد اجباری است" }),
  level_4: z.string({ required_error: "این فیلد اجباری است" }),
  level_5: z.string({ required_error: "این فیلد اجباری است" }),
  level_6: z.string({ required_error: "این فیلد اجباری است" }),
  description: z.string({ required_error: "این فیلد اجباری است" }),
  debtor: z.string({ required_error: "این فیلد اجباری است" }),
  creditor: z.string({ required_error: "این فیلد اجباری است" }),
});

// Define the schema for FormType
export const createFormSchema = z.object({
  file_url: z.string().nullish().optional(),
  title: z.string({ required_error: "این فیلد اجباری است" }),
  form_number: z.string({ required_error: "این فیلد اجباری است" }),
  description: z.string({ required_error: "این فیلد اجباری است" }),
  accounting_document_table: z.array(FormAccountingDocumentTableTypeSchema),
  appendices: z.union([
    z.string({ required_error: "این فیلد اجباری است" }),
    z.array(z.string({ required_error: "این فیلد اجباری است" })),
  ]),
  rules: z.string({ required_error: "این فیلد اجباری است" }),
  considerations: z.string({ required_error: "این فیلد اجباری است" }),
  time: z.string({ required_error: "این فیلد اجباری است" }),
  financial_Processing: z.string({ required_error: "این فیلد اجباری است" }),
  audit: z.string({ required_error: "این فیلد اجباری است" }),
});
