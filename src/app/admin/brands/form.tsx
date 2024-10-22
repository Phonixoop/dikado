"use client";

import React, { useEffect, useState } from "react";

//UI

import InputError from "~/ui/forms/input-error";
import withLabel from "~/ui/forms/with-label";
import { api } from "~/trpc/react";
import { useFormik } from "formik";
import { toast } from "sonner";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { createBrandSchema } from "~/server/validations/brand.validation";
import Button from "~/ui/buttons";

import { BrandWithCategory, useBrand } from "~/context/brand.context";
import FileUpload from "~/features/file-upload";
import TextField from "~/ui/forms/text-field";
import { GalleryView } from "~/features/gallery-view";
import Modal from "~/ui/modals";

import { cn } from "~/lib/utils";
import Image from "next/image";
import { SelectControlled } from "~/features/select-control";
import { Category } from "@prisma/client";

const TextFieldWithLable = withLabel(TextField);

type BrandType = {
  id?: string;
  file: any;
  name: string;
  image_url: string;
  categoryIds: string[];
  categories: Category[];
};
/*{
  onCreateSuccess = (brand: Brand) => {},
  onClearBrand = () => {},
}: {
  onCreateSuccess?: (brand: Brand) => any;
  onClearBrand?: () => any;
})*/
export default function BrandForm() {
  const { selectedRowBrand, setSelectedRowBrand } = useBrand();
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const utils = api.useUtils();

  const categories = api.category.getAll.useQuery();

  const createBrand = api.brand.create.useMutation({
    onSuccess: async () => {
      await utils.brand.getBrands.invalidate();
    },
  });
  const updateBrand = api.brand.update.useMutation({
    onSuccess: async () => {
      await utils.brand.getBrands.invalidate();
    },
  });

  const formik = useFormik<BrandType>({
    initialValues: {
      id: selectedRowBrand?.id ?? "",
      name: selectedRowBrand?.name ?? "",
      image_url: selectedRowBrand?.image_url ?? "",
      categoryIds: selectedRowBrand?.categories.map((a) => a.id) ?? [],
      categories: selectedRowBrand?.categories ?? [],
      file: undefined,
    },
    validationSchema: toFormikValidationSchema(createBrandSchema),
    onSubmit: async (values) => {
      if (!selectedRowBrand)
        return createBrand.mutate({
          image_url: values.image_url,
          name: values.name,
          categoryIds: values.categoryIds,
        });

      return updateBrand.mutate({
        id: selectedRowBrand.id,
        image_url: values.image_url,
        name: values.name,
        categoryIds: values.categoryIds,
      });
    },
  });
  useEffect(() => {
    formik.setValues((a) => {
      return {
        id: selectedRowBrand?.id ?? "",
        name: selectedRowBrand?.name ?? "",
        image_url: selectedRowBrand?.image_url ?? "",
        categoryIds: selectedRowBrand?.categories.map((a) => a.id) ?? [],
        categories: selectedRowBrand?.categories ?? [],
        file: undefined,
      };
    });
  }, [selectedRowBrand]);
  return (
    <div className="flex w-full flex-col gap-4">
      <form
        onSubmit={formik.handleSubmit}
        dir="rtl"
        className="relative flex flex-col items-center justify-center gap-8"
      >
        {selectedRowBrand && (
          <Button
            onClick={() => {
              setSelectedRowBrand(undefined);
            }}
            className="absolute -top-10 border border-accent/10 bg-primary text-secondary transition-all hover:bg-accent/20 hover:text-accent"
          >
            ساخت برند جدید +
          </Button>
        )}

        <h3 className="w-full pb-2 text-accent">
          {selectedRowBrand ? "ویرایش برند" : "ساخت برند"}
        </h3>
        <div className="flex w-full flex-col items-center justify-between gap-10 text-primary">
          <div className="w-full">
            <TextFieldWithLable
              label={"نام برند"}
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
              انتخاب عکس
            </Button>
            {formik.values.image_url && (
              <Image
                src={formik.values.image_url}
                width={50}
                height={50}
                alt={formik.values.name}
              />
            )}
          </div>
          <div className="z-30 flex w-full flex-col items-start justify-start gap-5">
            {!categories.isPending && (
              <>
                <SelectControlled
                  className="min-w-80"
                  title={"جستجو دسته بندی"}
                  list={categories.data.map((category) => ({
                    label: category.name,
                    value: category.id,
                  }))}
                  values={formik.values.categoryIds}
                  onChange={(values: { label: string; value: string }[]) => {
                    console.log(values);
                    formik.setFieldValue(
                      "categoryIds",
                      values.map((item) => item.value) ?? [""],
                    );
                  }}
                />
              </>
            )}
            <InputError message={formik.errors.name} />
          </div>
          <Button
            type="submit"
            isLoading={createBrand.isPending || updateBrand.isPending}
            className="w-full bg-accent/10 text-primary"
          >
            {selectedRowBrand ? "ویرایش" : "ثبت"}
          </Button>
        </div>
      </form>
      <Modal
        title="انتخاب عکس"
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
              formik.setFieldValue("image_url", file.url);
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
