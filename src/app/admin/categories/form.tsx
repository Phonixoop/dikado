"use client";

import React, { ReactNode, useEffect } from "react";

//UI
import TextField from "~/ui/forms/text-field";
import InputError from "~/ui/forms/input-error";
import withLabel from "~/ui/forms/with-label";
import { api } from "~/trpc/react";
import { useFormik } from "formik";
import { toast } from "sonner";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { createCategorySchema } from "~/server/validations/category.validation";
import Button from "~/ui/buttons";
import { Category } from "@prisma/client";
import { useCategory } from "~/context/category.context";

const TextFieldWithLable = withLabel(TextField);

type CategoryType = {
  file: any;
  name: string;
  icon_url: string;
};
export default function CategoryForm({
  onCreateSuccess = (category: Category) => {},
  onClearCategory = () => {},
}: {
  onCreateSuccess?: (category: Category) => any;
  onClearCategory?: () => any;
}) {
  const { selectedRowCategory, setSelectedRowCategory } = useCategory();
  const utils = api.useUtils();
  const createCategory = api.category.create.useMutation({
    onSuccess: async () => {
      await utils.category.getCategories.invalidate();
    },
  });
  const updateCategory = api.category.update.useMutation({
    onSuccess: async () => {
      await utils.category.getCategories.invalidate();
    },
  });

  const formik = useFormik<CategoryType>({
    initialValues: {
      file: undefined,
      name: "",
      icon_url: undefined,
    },
    validationSchema: toFormikValidationSchema(createCategorySchema),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("file", values.file);

      const response = await fetch("/api/upload_icon", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data?.fileUrl?.length <= 0) {
        toast("خطا در آپلود فایل");
        return;
      }

      if (!selectedRowCategory)
        return createCategory.mutate({
          icon_url: data.fileUrl,
          name: values.name,
        });

      return updateCategory.mutate({
        id: selectedRowCategory.id,
        icon_url: data.fileUrl,
        name: values.name,
      });
    },
  });

  useEffect(() => {
    formik.setValues((a) => {
      return {
        id: selectedRowCategory?.id ?? "",
        name: selectedRowCategory?.name || "",
        icon_url: selectedRowCategory?.icon_url || "",
        file: undefined,
      };
    });
  }, [selectedRowCategory]);
  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        dir="rtl"
        className="relative flex flex-col items-center justify-center gap-8"
      >
        {selectedRowCategory && (
          <Button
            onClick={() => {
              setSelectedRowCategory(undefined);
            }}
            className="absolute -top-10 border border-accent/10 bg-secondary text-primbuttn hover:bg-accent hover:text-secbuttn"
          >
            ساخت دسته بندی جدید +
          </Button>
        )}

        <h3 className="w-full pb-2 text-accent">
          {selectedRowCategory ? "ویرایش دسته بندی" : "ساخت دسته بندی"}
        </h3>
        <div className="flex w-full flex-col items-center justify-between gap-10 text-primary">
          <div className="w-full">
            <TextFieldWithLable
              label={"نام دسته بندی"}
              name="name"
              id="name"
              {...formik.getFieldProps("name")}
            />
            <InputError message={formik.errors.name} />
          </div>
          <div className="w-full">
            <input
              type="file"
              onChange={(event) => {
                formik.setFieldValue("file", event.currentTarget.files[0]);
              }}
            />
          </div>
          <Button
            type="submit"
            isLoading={createCategory.isPending}
            className="w-full bg-accent/10 text-accent"
          >
            {selectedRowCategory ? "ویرایش" : "ثبت"}
          </Button>
        </div>
      </form>
    </>
  );
}
