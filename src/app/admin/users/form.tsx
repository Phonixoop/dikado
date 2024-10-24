"use client";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";

import { toFormikValidationSchema } from "zod-formik-adapter";
import {
  createUserSchema,
  updateUserSchema,
} from "~/server/validations/user.validation";

import TextField from "~/ui/forms/text-field";

import withLabel from "~/ui/forms/with-label";
import Button from "~/ui/buttons";
import PasswordField from "~/ui/forms/password-field";

import InputError from "~/ui/forms/input-error";

import { useUser } from "~/context/user.context";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { reloadSession } from "~/utils/util";
import { User } from "~/types";
import withConfirmation from "~/ui/with-confirmation";
import withModal from "~/ui/modals";
import withModalState from "~/ui/modals/with-modal-state";
import { SquareAsteriskIcon } from "lucide-react";
import { api } from "~/trpc/react";
import { SelectControlled } from "~/features/select-control";
import PhoneField from "~/ui/forms/phone-field";
import IntegerField from "~/ui/forms/integer-field";

const TextFieldWithLable = withLabel(TextField);

const PhoneWithLabel = withLabel(PhoneField);
// const TextAreaWithLable = withLabel(TextAreaField);

function ButtonForChangePasswordModal({ children, ...rest }) {
  return (
    <>
      <Button
        {...rest}
        className="flex min-w-fit items-center justify-center gap-1 bg-secondary px-3 text-primary"
      >
        <SquareAsteriskIcon className="stroke-primary" />
        {children}
      </Button>
    </>
  );
}
const PasswordFieldWithModal = withModalState(ButtonForChangePasswordModal);

export function UserForm() {
  const getRole = api.role.getAll.useQuery();
  const getBrands = api.brand.getAll.useQuery({});
  const { selectedRowUser, setSelectedRowUser } = useUser();
  const utils = api.useUtils();

  const createUser = api.user.createUser.useMutation({
    onSettled() {
      // Sync with server once mutation has settled
      // refetchUsers();
    },
  });

  const updateUser = api.user.updateUser.useMutation({
    onSuccess: async (data) => {
      reloadSession();
      await utils.user.getUsers.invalidate();
    },
  });

  const updateUserPassword = api.user.updateUserPassword.useMutation({
    onSuccess: async (data) => {
      reloadSession();
      await utils.user.getUsers.invalidate();
    },
  });

  const formik = useFormik({
    initialValues: {
      username: selectedRowUser?.username,
      phonenumber: selectedRowUser?.phonenumber,
      // i know its bad to return password from server even hashed password
      password: selectedRowUser?.password,
      display_name: selectedRowUser?.display_name,
      roleId: selectedRowUser?.roleId,
      brandIds: selectedRowUser?.brands.map((a) => a.id) ?? [],
    },

    validationSchema: toFormikValidationSchema(
      selectedRowUser ? updateUserSchema : createUserSchema,
    ),
    validateOnBlur: true,
    onSubmit: (values: typeof createUserSchema._type) => {
      if (!selectedRowUser)
        return createUser.mutate({
          username: values?.username,
          phonenumber: values?.phonenumber,
          password: values?.password,
          display_name: values?.display_name,
          roleId: values.roleId,
          brandIds: values?.brandIds ?? [],
        });

      return updateUser.mutate({
        id: selectedRowUser.id,
        username: values?.username,
        phonenumber: values?.phonenumber,
        display_name: values?.display_name,
        roleId: values.roleId,
        brandIds: values?.brandIds ?? [],
      });
    },
  });

  useEffect(() => {
    formik.setValues((a) => {
      return {
        id: selectedRowUser?.id ?? "",
        username: selectedRowUser?.username,
        phonenumber: selectedRowUser?.phonenumber ?? "",
        password: "",
        display_name: selectedRowUser?.display_name ?? "",
        roleId: selectedRowUser?.roleId ?? "",
        brandIds: selectedRowUser?.brands.map((a) => a.id) ?? [],
      };
    });
  }, [selectedRowUser]);

  return (
    <>
      <form
        key={selectedRowUser ? "1" : "0"}
        onSubmit={(e) => {
          formik.handleSubmit(e);
        }}
        className="relative flex flex-col items-center justify-center gap-8"
      >
        {selectedRowUser && (
          <Button
            onClick={() => {
              setSelectedRowUser(undefined);
            }}
            className="absolute -top-10 border border-accent/10 bg-primary text-secondary transition-all hover:bg-accent/20 hover:text-accent"
          >
            ساخت کاربر جدید +
          </Button>
        )}
        <h3 className="w-full pb-2 text-accent">
          {selectedRowUser ? "ویرایش کاربر" : "ساخت کاربر"}
        </h3>
        <div className="flex w-full items-center justify-between gap-10 text-primary">
          <div className="w-full">
            <TextFieldWithLable
              label={"نام کاربری"}
              name="username"
              id="username"
              {...formik.getFieldProps("username")}
            />
            <InputError message={formik.errors.username} />
          </div>
          {selectedRowUser ? (
            <PasswordFieldWithModal
              title="تغییر رمز عبور"
              size={"sm"}
              center
              render={(closeModal) => {
                return (
                  <form
                    className="mx-auto flex w-fit flex-col items-center justify-center gap-5 px-2 py-5"
                    dir="rtl"
                    onSubmit={() => {
                      return updateUserPassword.mutate({
                        id: selectedRowUser.id,
                        password: formik.values.password,
                      });
                    }}
                  >
                    <PasswordFieldView
                      fieldProps={formik.getFieldProps("password")}
                      errors={formik.errors.password}
                    />
                    <div className="flex w-full items-center justify-between gap-4">
                      <Button
                        type="submit"
                        isLoading={updateUserPassword.isPending}
                        className="w-24 bg-emerald-800 text-emerald-200"
                      >
                        ویرایش
                      </Button>
                      <Button
                        onClick={() => closeModal()}
                        className="w-24 border border-primary text-amber-600"
                      >
                        لغو
                      </Button>
                    </div>
                  </form>
                );
              }}
            >
              تغییر رمز عبور
            </PasswordFieldWithModal>
          ) : (
            <PasswordFieldView
              fieldProps={formik.getFieldProps("password")}
              errors={formik.errors.password}
            />
          )}
        </div>
        <div className="w-full">
          <PhoneWithLabel
            label={"شماره تلفن"}
            name="phonenumber"
            id="phonenumber"
            value={formik.values.phonenumber}
            onValueChange={(value) => {
              formik.setFieldValue("phonenumber", value);
            }}
            maxLength={11}
          />
          <InputError message={formik.errors.phonenumber} />
        </div>
        <div className="w-full">
          <TextFieldWithLable
            label={"نام نمایشی"}
            name="display_name"
            id="display_name"
            {...formik.getFieldProps("display_name")}
            maxLength={100}
          />
          <InputError message={formik.errors.display_name} />
        </div>

        <div className="z-30 flex w-full flex-col items-start justify-start gap-5">
          <h3 className="text-primary">نقش</h3>
          {!getRole.isPending && getRole.data && (
            <>
              <SelectControlled
                singleSelect
                className="min-w-80"
                title={"جستجو نقش"}
                list={getRole.data.map((role) => ({
                  label: role.name,
                  value: role.id,
                }))}
                values={[formik.values.roleId]}
                onChange={(values: { label: string; value: string }[]) => {
                  formik.setFieldValue("roleId", values[0]?.value ?? undefined);
                }}
              />
            </>
          )}
          <InputError message={formik.errors.roleId} />
        </div>
        <div className="z-20 flex w-full flex-col items-start justify-start gap-5">
          <h3 className="text-primary">برند</h3>
          {!getBrands.isPending && getBrands.data && (
            <>
              <SelectControlled
                singleSelect
                className="min-w-80"
                title={"جستجو برند"}
                list={getBrands.data.map((brand) => ({
                  label: brand.name,
                  value: brand.id,
                }))}
                values={formik.values.brandIds ?? []}
                onChange={(values: { label: string; value: string }[]) => {
                  const [firstValue] = values;
                  formik.setFieldValue(
                    "brandIds",
                    firstValue?.value ? [firstValue.value] : [],
                  );
                }}
              />
            </>
          )}
          {/* <InputError message={formik.errors?.brandIds[0]} /> */}
        </div>
        <Button
          disabled={!formik.isValid}
          isLoading={createUser.isPending || updateUser.isPending}
          type="submit"
          className="w-full rounded-xl bg-primbuttn text-primary"
        >
          {selectedRowUser ? "ویرایش" : "ثبت"}
        </Button>
      </form>
    </>
  );
}

export default function MultiSelectBox({
  className = "bg-green-700 text-white shadow-2xl shadow-green-700",
  values = [],
  list = [],
  onChange = (value) => {},
}) {
  const [selectedKeys, setSelectedKeys] = useState(values);
  const isSelected = (key) => selectedKeys.includes(key);

  useEffect(() => {
    onChange(selectedKeys);
  }, [selectedKeys]);
  return (
    <>
      <div className="flex gap-2">
        {list.map((item) => {
          return (
            <span
              className={`${
                isSelected(item.key) ? className : "ring-1 ring-gray-300"
              } w-auto cursor-pointer select-none rounded-full px-3 py-2 text-primary hover:shadow-md`}
              key={item.key}
              onClick={() => {
                setSelectedKeys((prev) => {
                  return prev.includes(item.key)
                    ? [...prev.filter((i) => i !== item.key)]
                    : [...prev, item.key];
                });
              }}
            >
              {item.value}
            </span>
          );
        })}
      </div>
    </>
  );
}

function PasswordFieldView({ fieldProps, errors }) {
  return (
    <div className="relative w-full">
      <PasswordField
        label={"رمز عبور"}
        name="password"
        id="password"
        type="password"
        {...fieldProps}
      />

      <InputError message={errors} />
    </div>
  );
}
