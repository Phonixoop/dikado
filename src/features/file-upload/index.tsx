"use client";
import React, { useState, DragEvent, ChangeEvent } from "react";
import { useFormik } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import withLabel from "~/ui/forms/with-label";
import TextField from "~/ui/forms/text-field";
import InputError from "~/ui/forms/input-error";
import Button from "~/ui/buttons";
import { cn } from "~/lib/utils";
import axios from "axios";
import Image from "next/image";
const TextFieldWithLable = withLabel(TextField);

// Zod schema definition
const FileUploadSchema = z.object({
  tag: z.string().min(3, "حداقل 3 حرف").optional(),
  files: z
    .array(
      z.object({
        file: z.instanceof(File),
        previewUrl: z.string(),
      }),
    )
    .min(1, "At least one file is required"),
});

// FileData type to handle files and their preview
type FileData = {
  file: File;
  previewUrl: string;
};

const FileUpload: React.FC = () => {
  const [isDragOver, setIsDragOver] = useState(false);

  const [files, setFiles] = useState<FileData[]>([]);

  const formik = useFormik({
    initialValues: {
      tag: "",
      files: [] as FileData[],
    },
    validationSchema: toFormikValidationSchema(FileUploadSchema), // Zod schema adapted for Formik
    onSubmit: async (values) => {
      const formData = new FormData();

      values.files.forEach((fileData, index) => {
        formData.append(`file`, fileData.file);
        // Append each file's tag with a unique key
        // formData.append(`tag_${index}`, fileData.tag);
      });
      formData.append(`tag`, values.tag);
      console.log(formData);
      try {
        const response = await axios.post("/api/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log(response.data); // Handle successful upload
      } catch (error) {
        console.error("File upload failed", error); // Handle failure
      }
    },
  });

  // Handle file selection from the file input
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const fileDataArray = selectedFiles.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }));
    const updatedFiles = [...files, ...fileDataArray];
    setFiles(updatedFiles);
    formik.setFieldValue("files", updatedFiles); // Update Formik's file field
  };

  // Handle drag-and-drop file selection
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    const fileDataArray = droppedFiles.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }));
    const updatedFiles = [...files, ...fileDataArray];
    setFiles(updatedFiles);
    formik.setFieldValue("files", updatedFiles); // Update Formik's file field
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleRemoveFile = (fileToRemove: FileData) => {
    const updatedFiles = files.filter((fileData) => fileData !== fileToRemove);
    setFiles(updatedFiles);
    formik.setFieldValue("files", updatedFiles); // Update Formik's file field
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        formik.handleSubmit();
      }}
      className="mx-auto flex w-full flex-col rounded-lg border border-accent/30 bg-accent/10 p-4"
    >
      <h3 className="text-center text-xl font-semibold text-accent">
        آپلود فایل
      </h3>
      <div className="w-full py-5">
        <TextFieldWithLable
          label={"تگ"}
          name="name"
          id="name"
          {...formik.getFieldProps("tag")}
        />
        <InputError message={formik.errors.tag} />
      </div>

      <div
        onDragEnter={() => setIsDragOver(true)}
        onDragLeave={() => setIsDragOver(false)}
        className={cn(
          "mb-4 flex h-40 items-center justify-center rounded-lg border border-dashed border-primary",
          isDragOver ? "border-none bg-accent/20 text-primary" : "bg-secondary",
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <p
          onDragEnter={(e) => e.stopPropagation()}
          onDragLeave={(e) => e.stopPropagation()}
          className="text-primary/80"
        >
          فایل های خود را اینجا رها کنید
        </p>
      </div>

      <input
        type="file"
        multiple
        accept=".png,.jpeg,.jpg,.webp,.ico"
        className="hidden"
        id="file-upload"
        onChange={handleFileChange}
      />
      <label
        htmlFor="file-upload"
        className="mb-4 block cursor-pointer rounded-md bg-accent px-4 py-2 text-center text-white shadow-sm"
      >
        انتخاب فایل
      </label>

      {formik.touched.files && formik.errors.files && (
        <div className="mb-4 text-sm text-red-500">files error</div>
      )}

      {files.length > 0 && (
        <div className="mb-4">
          <ul>
            {files.map((fileData, index) => (
              <li
                key={index}
                className="mb-2 flex items-center justify-between rounded-md bg-secondary px-4 py-2"
              >
                <span>{fileData.file.name}</span>
                <Image
                  src={fileData.previewUrl}
                  alt={fileData.file.name}
                  className="mr-2 h-10 w-10 object-cover"
                  width={100}
                  height={100}
                  objectFit="cover"
                />
                <Button
                  className="text-red-500"
                  onClick={() => handleRemoveFile(fileData)}
                >
                  حذف
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <Button
        type="submit"
        className="w-full rounded-md bg-primbuttn px-4 py-2 text-white shadow-sm"
      >
        آپلود
      </Button>
    </form>
  );
};

export default FileUpload;
