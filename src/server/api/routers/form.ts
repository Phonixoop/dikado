import { createWriteStream } from "fs";
import path from "path";
import { z } from "zod";
import { generateUUID } from "~/lib/utils";
import { writeFileToDisk } from "~/lib/write-file-to-disk";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { createFormSchema } from "~/server/validations/form.validation";

export const formRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createFormSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.form.create({
        data: {
          file_path: input.file_url,
          appendices: JSON.stringify(input.appendices),
          audit: input.audit,
          considerations: input.considerations,
          description: input.description,
          financialProcessing: input.financial_Processing,
          form_number: input.form_number,
          rules: input.rules,
          time: input.time,
          title: input.title,
          accountingDocuments: {
            create: input.accounting_document_table.map((doc) => ({
              group: doc.group,
              total: doc.total,
              moeen: doc.moeen,
              level_4: doc.level_4,
              level_5: doc.level_5,
              level_6: doc.level_6,
              description: doc.description,
              debtor: doc.debtor,
              creditor: doc.creditor,
            })),
          },
        },
      });
      // simulate a slow db call

      //await new Promise((resolve) => setTimeout(resolve, 1000));
    }),
});
