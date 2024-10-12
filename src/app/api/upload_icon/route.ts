import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import fs from "node:fs/promises";
import path from "node:path";
import { generateUUID } from "~/lib/utils";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    const files = formData.getAll("files") as File[];
    let file_urls = [];
    for (const file of files) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);

      const fileName = `${generateUUID()}-${file.name}`;
      const fileUrl = `./icons/${fileName}`;
      file_urls.push(fileUrl);
      await fs.writeFile(fileUrl, buffer);
    }

    revalidatePath("/");

    return NextResponse.json({ status: "success", file_urls });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ status: "fail", error: e });
  }
}
