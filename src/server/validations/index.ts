import { toFormikValidationSchema } from "zod-formik-adapter";
import { createOrderSchema } from "~/server/validations/order.validation";
import { userLoginSchema } from "~/server/validations/user.validation";

export const SCHEMAS = {
  createOrder: toFormikValidationSchema(createOrderSchema),
  userLogin: toFormikValidationSchema(userLoginSchema),
};
