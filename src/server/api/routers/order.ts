import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import {
  brandIdSchema,
  brandNameSchema,
  createBrandSchema,
  filterBrandsByCategoriesSchema,
  updateBrandSchema,
} from "~/server/validations/brand.validation";
import { createOrderSchema } from "~/server/validations/order.validation";

export const orderRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createOrderSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.order.create({
        data: {
          authority: input.authority,
          price: input.price * input.recipients.length,

          recipients: {
            connectOrCreate: input.recipients.map((recipient) => ({
              where: { value: recipient.value, id: "" }, // Check if recipient exists by value
              create: {
                value: recipient.value, // If not found, create a new recipient with value
                type: recipient.type,
              },
            })),
          },
          message: {
            create: {
              text: input.message,
            },
          },
          brand: {
            connect: {
              id: input.brandId,
            },
          },
          user: {
            connect: {
              id: ctx.session.user.id,
            },
          },
        },
      });
    }),

  update: protectedProcedure
    .input(updateBrandSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.brand.update({
        where: { id: input.id },
        data: {
          id: input.id,
          image_url: input.image_url,
          name: input.name,
          categories: {
            set: [], // This will clear all existing categories
            connect:
              input.categoryIds?.map((categoryId) => ({ id: categoryId })) ||
              [],
          },
        },
      });
    }),

  getBrands: publicProcedure
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
        (await ctx.db.brand.findMany({
          take: limit + 1, // get an extra item at the end which we'll use as next cursor
          cursor: cursor ? { id: cursor } : undefined,

          orderBy: {
            created_at: "desc",
          },
          select: {
            id: true,
            name: true,
            image_url: true,
            categories: true,
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
  getBrandById: protectedProcedure
    .input(brandIdSchema)
    .query(async ({ input, ctx }) => {
      return await ctx.db.brand.findUnique({
        where: {
          id: input.id,
        },
      });
    }),
  getBrandByName: publicProcedure
    .input(brandNameSchema)
    .query(async ({ input, ctx }) => {
      return await ctx.db.brand.findUnique({
        where: {
          name: input.name,
        },
        select: {
          name: true,
          categories: {
            select: {
              name: true,
            },
          },
          image_url: true,
        },
      });
    }),
  deleteBrand: protectedProcedure
    .input(brandIdSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.brand.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
