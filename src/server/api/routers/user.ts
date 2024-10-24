import { z } from "zod";
import { getRandomInt } from "~/lib/user.util";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import {
  createUserSchema,
  phonenumberSchema,
  updateUserPassword,
  updateUserSchema,
  userIdSchema,
  userLoginSchema,
} from "~/server/validations/user.validation";
import { hashPassword } from "~/utils/util";

export const userRouter = createTRPCRouter({
  getUser: protectedProcedure.query(({ ctx }) => {
    return ctx.session.user;
  }),

  createUser: protectedProcedure
    .input(createUserSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.user.create({
        data: {
          phonenumber: input.phonenumber,
          username: input.username,
          display_name: input?.display_name,
          password: hashPassword(input.password),
          roleId: input.roleId,
          brands: {
            connect: input.brandIds?.map((brandId) => ({ id: brandId })) || [],
          },
        },
      });
    }),
  updateUser: protectedProcedure
    .input(updateUserSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.user.update({
        where: {
          id: input.id,
        },
        data: {
          phonenumber: input.phonenumber,
          username: input.username,
          roleId: input.roleId,
          display_name: input.display_name,
          brands: {
            set: [],
            connect: input.brandIds?.map((brandId) => ({ id: brandId })) || [],
          },
        },
      });
    }),
  updateUserPassword: protectedProcedure
    .input(updateUserPassword)
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.user.update({
        where: {
          id: input.id,
        },
        data: {
          password: hashPassword(input.password),
        },
      });
    }),
  getUsers: publicProcedure
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
        (await ctx.db.user.findMany({
          take: limit + 1, // get an extra item at the end which we'll use as next cursor
          cursor: cursor ? { id: cursor } : undefined,
          include: {
            role: true,
            brands: true,
          },
          orderBy: {
            created_at: "desc",
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
  getUserById: protectedProcedure
    .input(userIdSchema)
    .query(async ({ input, ctx }) => {
      return await ctx.db.user.findUnique({
        where: {
          id: input.id,
        },
      });
    }),
  deleteUser: protectedProcedure
    .input(userIdSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.user.delete({
        where: {
          id: input.id,
        },
      });
    }),
  generateCode: publicProcedure
    .input(phonenumberSchema)
    .mutation(async ({ input, ctx }) => {
      const code: string = getRandomInt().toString();
      try {
        return await ctx.db.user.upsert({
          where: {
            phonenumber: input.phonenumber,
          },
          create: {
            code,
            phonenumber: input.phonenumber,
            password: code,
          },
          update: {
            code,
          },
        });
      } catch {
        throw new Error("sever error");
      }
    }),
  validateCode: publicProcedure
    .input(userLoginSchema)
    .mutation(async ({ input, ctx }) => {
      const code: string = getRandomInt().toString();
      try {
        const user = await ctx.db.user.findUnique({
          where: {
            phonenumber: input.phonenumber,
            code: input.code,
          },
        });
        if (user) return user;
      } catch {
        throw new Error("sever error");
      }
    }),
});
