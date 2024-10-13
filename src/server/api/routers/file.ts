import { z } from "zod";
import fs from "fs";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import {
  deleteFileSchema,
  fileIdSchema,
  updateFileSchema,
} from "~/server/validations/file.validation";
import { TRPCError } from "@trpc/server";
import path from "path";
import { ADMIN_UPLOADS } from "~/constants";

export const fileRouter = createTRPCRouter({
  getFiles: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish().default(10),
        cursor: z.string().nullish(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const limit = input.limit ?? 50;
      const { cursor } = input;
      const items =
        (await ctx.db.file.findMany({
          take: limit + 1, // get an extra item at the end which we'll use as next cursor
          cursor: cursor ? { id: cursor } : undefined,

          orderBy: {
            created_at: "desc",
          },
          select: {
            id: true,
            newFilename: true,
            tag: true,
            mimetype: true,
            url: true,
          },
        })) || [];
      let nextCursor: typeof cursor | undefined = undefined;
      if (items.length > limit) {
        const nextItem = items.pop();
        nextCursor = nextItem!.id;
      }

      return {
        items,
        nextCursor,
      };
    }),
  getFileById: protectedProcedure
    .input(fileIdSchema)
    .query(async ({ input, ctx }) => {
      return await ctx.db.file.findUnique({
        where: {
          id: input.id,
        },
      });
    }),
  updateFile: protectedProcedure
    .input(updateFileSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        return await ctx.db.file.update({
          where: {
            id: input.id,
          },
          data: {
            tag: input.tag,
          },
        });
      } catch (err) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    }),
  deleteFile: protectedProcedure
    .input(deleteFileSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        await fs.promises.unlink(path.join(ADMIN_UPLOADS, input.fileName));
        return await ctx.db.file.delete({
          where: {
            id: input.id,
          },
        });
      } catch (err) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    }),
});
