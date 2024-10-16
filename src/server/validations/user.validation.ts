import { z } from "zod";

export const createUserSchema = z.object({
  username: z
    .string({ required_error: "این فیلد اجباری است" })
    .min(3, "نام کاربری نمی تواند کمتر از 3 کاراکتر باشد"),
  password: z
    .string({ required_error: "این فیلد اجباری است" })
    .min(6, "پسورد نمیتواند کمتر از 6 کاراکتر باشد."),
  display_name: z.string().nullish().optional(),
  roleId: z.string({ required_error: "این فیلد اجباری است" }),
  brandIds: z.array(z.string()).optional(),
});

export const updateUserSchema = z.object({
  id: z.string(),
  username: z
    .string({ required_error: "این فیلد اجباری است" })
    .min(3, "نام کاربری نمی تواند کمتر از 3 کاراکتر باشد"),
  display_name: z.string().nullable().optional(),
  roleId: z.string({ required_error: "این فیلد اجباری است" }),
  brandIds: z.array(z.string()).optional(),
});

export const updateUserPassword = z.object({
  id: z.string(),
  password: z.string(),
});
export const userIdSchema = z.object({
  id: z.string({ required_error: "این فیلد اجباری است" }),
});

export const userLoginSchema = z.object({
  username: z
    .string({ required_error: "این فیلد اجباری است" })
    .min(3, "نام کاربری نمی تواند کمتر از 3 کاراکتر باشد"),
  password: z
    .string({ required_error: "این فیلد اجباری است" })
    .min(6, "پسورد نمیتواند کمتر از 6 کاراکتر باشد."),
});
