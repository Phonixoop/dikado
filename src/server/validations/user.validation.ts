import { z } from "zod";

export const createUserSchema = z.object({
  username: z
    .string()
    .min(3, "نام کاربری نمی تواند کمتر از 3 کاراکتر باشد")
    .optional(),
  password: z
    .string({ required_error: "این فیلد اجباری است" })
    .min(6, "پسورد نمیتواند کمتر از 6 کاراکتر باشد."),
  display_name: z.string().nullish().optional(),
  phonenumber: z
    .string({ required_error: "این فیلد اجباری است" })
    .startsWith("09", "باید با 09 شروع شود")
    .length(11, "باید 11 رقم باشد"),
  roleId: z.string({ required_error: "این فیلد اجباری است" }),
  brandIds: z.array(z.string()).optional(),
});

export const updateUserSchema = z.object({
  id: z.string(),
  username: z
    .string()
    .min(3, "نام کاربری نمی تواند کمتر از 3 کاراکتر باشد")
    .optional(),
  phonenumber: z
    .string({ required_error: "این فیلد اجباری است" })
    .startsWith("09", "باید با 09 شروع شود")
    .length(11, "باید 11 رقم باشد"),
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
  phonenumber: z
    .string({ required_error: "این فیلد اجباری است" })
    .startsWith("09", "باید با 09 شروع شود")
    .length(11, "باید 11 رقم باشد"),
  code: z
    .string({ required_error: "این فیلد اجباری است" })
    .length(4, "کد باید 4 رقم باشد"),
});

export const phonenumberSchema = z.object({
  phonenumber: z
    .string({ required_error: "این فیلد اجباری است" })
    .startsWith("09", "باید با 09 شروع شود")
    .length(11, "باید 11 رقم باشد"),
});

export const codeSchema = z.object({
  code: z
    .string({ required_error: "این فیلد اجباری است" })
    .length(4, "کد باید 4 رقم باشد"),
});
