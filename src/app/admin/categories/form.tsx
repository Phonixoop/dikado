"use client";

import React, { ReactNode, useEffect, useState } from "react";

//UI

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
import FileUpload from "~/features/file-upload";
import TextField from "~/ui/forms/text-field";
import { GalleryView } from "~/features/gallery-view";
import Modal from "~/ui/modals";

import { cn } from "~/lib/utils";
import Image from "next/image";

const TextFieldWithLable = withLabel(TextField);

type CategoryType = {
  file: any;
  name: string;
  icon_url: string;
};
/*{
  onCreateSuccess = (category: Category) => {},
  onClearCategory = () => {},
}: {
  onCreateSuccess?: (category: Category) => any;
  onClearCategory?: () => any;
})*/
export default function CategoryForm() {
  const { selectedRowCategory, setSelectedRowCategory } = useCategory();
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
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
      if (!selectedRowCategory)
        return createCategory.mutate({
          icon_url: values.icon_url,
          name: values.name,
        });

      return updateCategory.mutate({
        id: selectedRowCategory.id,
        icon_url: values.icon_url,
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
    <div className="flex w-full flex-col gap-4">
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

          <div className="flex w-full items-start justify-start gap-2">
            <Button
              onClick={() => {
                setIsGalleryOpen(true);
              }}
              className="w-1/2 bg-accent text-primary"
            >
              انتخاب آیکون
            </Button>
            {formik.values.icon_url && (
              <Image
                src={formik.values.icon_url}
                width={50}
                height={50}
                alt={formik.values.name}
              />
            )}
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

      <Modal
        title="انتخاب آیکون"
        size="md"
        center
        className="bg-secondary/80"
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
      >
        <div className="flex flex-col items-center justify-center p-2">
          <OpenBox
            title="آپلود رسانه"
            closeText="بستن"
            className="border border-dashed text-primary"
          >
            <div className="w-full py-2">
              <FileUpload />
            </div>
          </OpenBox>

          <GalleryView
            className="w-full"
            pickable
            onSelected={(file) => {
              setIsGalleryOpen(false);
              formik.setFieldValue("icon_url", file.url);
            }}
          />
        </div>
      </Modal>
    </div>
  );
}

function OpenBox({ children, className = "", title = "", closeText = "" }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button
        className={cn(className)}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {isOpen ? closeText : title}
      </Button>

      {isOpen && children}
    </>
  );
}
