import React from "react";

import { Container } from "~/ui/containers";

import { CategoryProvider, useCategory } from "~/context/category.context";

import FileUpload from "~/features/file-upload";

import { GalleryView } from "~/features/gallery-view";

export default async function FilesPage() {
  return (
    <Container className="flex flex-col-reverse items-stretch gap-10 py-10 2xl:flex-row">
      <div className="sticky top-5 h-fit rounded-lg 2xl:w-4/12">
        <FileUpload />
      </div>

      <div className="h-fit max-h-[42rem] w-full overflow-hidden overflow-y-auto rounded-lg border border-accent/30 bg-secondary 2xl:w-7/12 2xl:p-5">
        <GalleryView />
      </div>
    </Container>
  );
}
