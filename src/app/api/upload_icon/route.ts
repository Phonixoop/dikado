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

    const fileName = `${generateUUID()}-${file.name}`;
    const fileUrl = `./icons/${fileName}`;
    await fs.writeFile(fileUrl, buffer);

    revalidatePath("/");

    return NextResponse.json({ status: "success", fileUrl });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ status: "fail", error: e });
  }
}
