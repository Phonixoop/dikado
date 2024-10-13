"use client";
import React, { useState } from "react";
import { toast } from "sonner";
import { GalleryView } from "~/features/gallery-view";

export default function PickImage() {
  const [state, setState] = useState("");
  return (
    <div>
      <GalleryView
        pickable
        onSelected={(file) => {
          setState("hi");
        }}
      />
      {state}
    </div>
  );
}
