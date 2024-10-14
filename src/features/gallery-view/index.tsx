"use client";
import { File } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { useFormik } from "formik";
import Image from "next/image";
import path from "path";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { toFormikValidationSchema } from "zod-formik-adapter";

import DynamicList from "~/features/dynamic-list";
import { cn } from "~/lib/utils";
import { updateFileSchema } from "~/server/validations/file.validation";
import { api } from "~/trpc/react";
import Button from "~/ui/buttons";
import InputError from "~/ui/forms/input-error";
import TextField from "~/ui/forms/text-field";
import withLabel from "~/ui/forms/with-label";
import Modal from "~/ui/modals";
import withConfirmation from "~/ui/with-confirmation";
const ButtonWithConfirmation = withConfirmation(Button);
const TextFieldWithLable = withLabel(TextField);

type TFile = {
  id: string;
  newFilename: string;
  tag: string;
  mimetype: string;
  url: string;
};

export function GalleryView({
  className = "",
  pickable = false,
  onSelected = (file: TFile) => {},
}) {
  const [selectedFile, setSelectedFile] = useState<TFile>(undefined);
  const files = api.file.getFiles.useInfiniteQuery(
    { limit: 8 },
    { getNextPageParam: (lastPage) => lastPage.nextCursor },
  );

  return (
    <>
      <div className={cn("container mx-auto px-4 py-8", className)}>
        <h2 className="mb-6 text-center text-3xl font-semibold">رسانه ها</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {(files.data?.pages.flatMap((page) => page.items) || []).map(
            (file: TFile, index) => {
              const sanitizedIconUrl = file.url.startsWith("./")
                ? file.url.substring(1)
                : file.url;

              const url = path.join(
                process.env.NEXT_PUBLIC_BASE_URL,
                "api",

                sanitizedIconUrl,
              );
              return (
                <>
                  <div
                    key={index}
                    className="relative cursor-pointer"
                    onClick={() => {
                      const sanitizedIconUrl = file.url.startsWith("./")
                        ? file.url.substring(1)
                        : file.url;

                      const url = path.join(
                        process.env.NEXT_PUBLIC_BASE_URL,
                        "api",

                        sanitizedIconUrl,
                      );

                      if (pickable)
                        onSelected({
                          ...file,
                          url,
                        });
                      else
                        setSelectedFile({
                          ...file,
                          url,
                        });
                    }}
                  >
                    <Image
                      src={url}
                      height={100}
                      width={100}
                      alt={file.newFilename}
                      quality={100}
                      className="h-52 w-52 transform rounded-lg bg-accent/5 object-contain shadow-md transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                </>
              );
            },
          )}
        </div>
        <div className="flex items-center justify-center gap-5 py-5">
          <Button
            disabled={files.isLoading || !files.hasNextPage}
            isLoading={files.isLoading}
            onClick={() => files.fetchNextPage()}
            className="w-fit cursor-pointer rounded-full bg-secbuttn px-4 py-2 text-primbuttn"
          >
            {files.hasNextPage ? "بیشتر" : files.isLoading ? "..." : "تمام"}
          </Button>
        </div>
      </div>

      <Modal
        center
        isOpen={!!selectedFile}
        onClose={() => {
          setSelectedFile(undefined);
        }}
      >
        <div className="flex flex-col items-center justify-center gap-5">
          <Image
            src={selectedFile?.url}
            height={100}
            width={100}
            alt={selectedFile?.newFilename}
            quality={100}
            className="h-96 w-96 transform rounded-lg object-contain transition-transform duration-300"
          />
          <Form
            file={selectedFile}
            onDeleted={() => {
              setSelectedFile(undefined);
            }}
          />
        </div>
      </Modal>
    </>
  );
}

function Form({
  file,
  onDeleted = () => {},
}: {
  file: TFile;
  onDeleted: () => void;
}) {
  const utils = api.useUtils();
  const deleteFile = api.file.deleteFile.useMutation({
    onSuccess: async () => {
      await utils.file.getFiles.invalidate();
    },
  });

  const updateFile = api.file.updateFile.useMutation({
    onSuccess: async () => {
      await utils.file.getFiles.invalidate();
    },
  });

  const formik = useFormik({
    initialValues: {
      id: file.id,
      tag: file.tag,
    },
    validationSchema: toFormikValidationSchema(updateFileSchema),
    onSubmit: async (values) => {
      updateFile.mutate({
        id: file.id,
        tag: values.tag,
      });
    },
  });
  return (
    <>
      <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
        <div className="w-full pb-2">
          <TextFieldWithLable
            label={"تگ"}
            name="tag"
            id="tag"
            {...formik.getFieldProps("tag")}
          />
          <InputError message={formik.errors.tag as string} />
        </div>{" "}
        <Button
          type="submit"
          isLoading={updateFile.isPending}
          className="w-full bg-accent/10 text-accent"
        >
          ویرایش
        </Button>
        <ButtonWithConfirmation
          isLoading={deleteFile.isPending}
          className="flex w-full items-center justify-center gap-2 border border-dashed border-yellow-600 text-amber-500"
          onConfirm={async () => {
            try {
              await deleteFile.mutateAsync({
                id: file?.id,
                fileName: file?.newFilename,
              });
              onDeleted();
            } catch (error) {
              toast(`فایل پاک نشد \n${error}`);
            }
          }}
          title="حذف  فایل"
        >
          حذف
        </ButtonWithConfirmation>
      </form>
    </>
  );
}
