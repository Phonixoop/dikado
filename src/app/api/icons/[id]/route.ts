import type { NextApiRequest, NextApiResponse } from "next";

import fs from "fs";
import path, { join } from "path";
import { createReadStream } from "fs";
import { pipeline } from "stream";
import { NextResponse } from "next/server";
import { ServerResponse } from "http";

export async function GET(req: any, res: any, context: any) {
  const filePath = join(process.cwd(), "icons", res.params.id);
  console.log({ res });
  // Path to image directory outside the public folder

  try {
    const imageBuffer = await fs.readFileSync(filePath);

    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        "Content-Type": "image/jpeg",
      },
    });
  } catch (error) {
    return new NextResponse("Image not found", { status: 404 });
  }

  // join(
  //   process.cwd(),
  //   "icons",
  //   "ec8f2fd1-28fb-4215-ba3c-76071f2cc72a-glowing-lamp.png",
  // );
  // const imageStream = createReadStream(filePath);
  // res.setHeader("Content-Type", "image/png");
  // pipeline(imageStream, res, (error) => {});
  // console.log(filePath);

  // res.setHeader("Content-Type", "image/png");
  // const filePath = join(process.cwd(), "icons", params.id);
  // console.log(filePath);
  // const imageStream = createReadStream(filePath);
  // pipeline(imageStream, res, (error) => {});
}
