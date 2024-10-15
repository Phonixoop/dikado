import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import {
  categoryIdSchema,
  createCategorySchema,
  updateCategorySchema,
} from "~/server/validations/category.validation";

export const categoryRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx, input }) => {
    return await ctx.db.category.findMany();
  }),
  getAllWithBrands: publicProcedure.query(async ({ ctx, input }) => {
    return await ctx.db.category.findMany({
      select: {
        id: true,
        name: true,
        icon_url: true,
        brands: true,
      },
    });
  }),
  create: protectedProcedure
    .input(createCategorySchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.category.create({
        data: {
          icon_url: input.icon_url,
          name: input.name,
        },
      });
    }),

  update: protectedProcedure
    .input(updateCategorySchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.category.update({
        where: { id: input.id },
        data: {
          id: input.id,
          icon_url: input.icon_url,
          name: input.name,
        },
      });
    }),

  getCategories: publicProcedure
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
        (await ctx.db.category.findMany({
          take: limit + 1, // get an extra item at the end which we'll use as next cursor
          cursor: cursor ? { id: cursor } : undefined,

          orderBy: {
            created_at: "desc",
          },
          select: {
            id: true,
            name: true,
            icon_url: true,
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
  getCategoryById: protectedProcedure
    .input(categoryIdSchema)
    .query(async ({ input, ctx }) => {
      return await ctx.db.category.findUnique({
        where: {
          id: input.id,
        },
      });
    }),
  deleteCategory: protectedProcedure
    .input(categoryIdSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.category.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
