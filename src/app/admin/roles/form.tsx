"use client";
import React, { useEffect, useState } from "react";

import { PERMISSIONS } from "~/constants/permission";
import PermissionPanel from "~/features/permission";

import Button from "~/ui/buttons";
import TextField from "~/ui/forms/text-field";
import withLabel from "~/ui/forms/with-label";
import { useFormik } from "formik";
import { Role } from "@prisma/client";
import { createRoleSchema } from "~/server/validations/role.validation";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { api } from "~/trpc/react";
import InputError from "~/ui/forms/input-error";
import { cn } from "~/lib/utils";
import { Container } from "~/ui/containers";
import withConfirmation from "~/ui/with-confirmation";
import { toast } from "~/components/shadcn/toast/use-toast";
import { Trash2Icon } from "lucide-react";
import { updateDynamicPermissions } from "~/utils/util";
const TextWithLabel = withLabel(TextField);

const ButtonConfirm = withConfirmation(Button);

export function RoleForm({
  selectedRole = undefined,
  onClear = () => {},
}: {
  selectedRole: Role;
  onClear?: () => void;
}) {
  const utils = api.useUtils();
  const createRole = api.role.create.useMutation({
    onSuccess: () => {
      utils.role.getAll.invalidate();
    },
  });

  const updateRole = api.role.update.useMutation({
    onSuccess: () => {
      utils.role.getAll.invalidate();
    },
  });

  const deleteRole = api.role.delete.useMutation({
    onSuccess: () => {
      utils.role.getAll.invalidate();
    },
  });

  useEffect(() => {
    formik.setValues(() => {
      return {
        name: selectedRole?.name ?? "",
        permissions: selectedRole
          ? JSON.stringify(
              updateDynamicPermissions(
                PERMISSIONS,
                JSON.parse(selectedRole?.permissions),
              ),
            )
          : JSON.stringify(PERMISSIONS),
      };
    });
  }, [selectedRole]);

  const formik = useFormik({
    initialValues: {
      name: selectedRole?.name ?? "",
      permissions: JSON.stringify(PERMISSIONS),
    },
    validationSchema: toFormikValidationSchema(createRoleSchema),
    validateOnBlur: true,
    onSubmit: (values: typeof createRoleSchema._type) => {
      if (selectedRole) {
        return updateRole.mutate({
          id: selectedRole.id,
          name: values.name,
          permissions: values.permissions,
        });
      } else
        return createRole.mutate({
          name: values.name,
          permissions: values.permissions,
        });
    },
  });

  const hasFormChanged =
    formik.initialValues.name !== formik.values.name ||
    formik.initialValues.permissions !== formik.values.permissions;

  return (
    <form
      className={cn(
        "relative flex w-full flex-col pb-10",
        !selectedRole ? "overflow-hidden" : "",
      )}
      onSubmit={formik.handleSubmit}
    >
      {/* <pre>{JSON.stringify(formik.values)}</pre> */}
      <div
        className={cn(
          "relative flex w-full flex-col items-center justify-start gap-5 py-5",
          !selectedRole ? "overflow-y-auto" : "",
        )}
        dir="ltr"
      >
        {selectedRole && (
          <>
            <Button
              className="absolute -top-10 border border-accent/10 bg-primary text-secondary transition-all hover:bg-accent/20 hover:text-accent"
              isLoading={deleteRole.isPending}
              onClick={() => onClear()}
            >
              سمت جدید +
            </Button>
          </>
        )}
        <div
          className={cn(
            "flex w-full items-center",
            selectedRole ? "justify-between" : "justify-end",
          )}
        >
          {selectedRole && (
            <ButtonConfirm
              title={`حذف ${selectedRole.name}`}
              isLoading={deleteRole.isPending}
              className="flex items-center justify-center gap-2 border border-dashed border-yellow-600 text-amber-500"
              onConfirm={() => {
                deleteRole
                  .mutateAsync({ id: selectedRole.id })
                  .then(() => {
                    onClear();
                  })
                  .catch(() => {
                    toast({
                      title: "خطای حذف سمت",
                      description: deleteRole.error.message,
                    });
                  });
              }}
            >
              <Trash2Icon className="h-5 w-5" />
              <span>حذف سمت</span>
            </ButtonConfirm>
          )}
          <div className="flex flex-col items-end justify-center">
            <TextWithLabel
              label="نام سمت"
              name="name"
              id="name"
              {...formik.getFieldProps("name")}
            />
            <InputError message={formik.errors.name} />
          </div>
        </div>
        <PermissionPanel
          permissions={JSON.parse(formik.values.permissions)}
          setPermissions={(permissions) => {
            return formik.setFieldValue(
              "permissions",
              JSON.stringify(permissions),
            );
          }}
        />
      </div>

      <Button
        isLoading={createRole.isPending || updateRole.isPending}
        className={cn(
          "absolute bottom-0 left-0 w-full bg-accent/20 text-primary",
        )}
        initialTranslateY={hasFormChanged ? -2 : 96}
        translateY={hasFormChanged ? -2 : 96}
        type="submit"
      >
        {selectedRole ? "ویرایش" : "اضافه کردن"}
      </Button>
    </form>
  );
}
