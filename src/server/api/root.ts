import { brandRouter } from "~/server/api/routers/brand";
import { categoryRouter } from "~/server/api/routers/category";
import { fileRouter } from "~/server/api/routers/file";
import { roleRouter } from "~/server/api/routers/role";
import { userRouter } from "~/server/api/routers/user";
import { orderRouter } from "~/server/api/routers/order";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  role: roleRouter,
  user: userRouter,
  category: categoryRouter,
  brand: brandRouter,
  file: fileRouter,
  order: orderRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
