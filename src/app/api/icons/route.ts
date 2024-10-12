import type { NextApiRequest, NextApiResponse } from "next";

import fs from "fs";
import path, { join } from "path";
import { createReadStream } from "fs";
import { pipeline } from "stream";
import { NextResponse } from "next/server";

export async function GET(req: any, res: NextApiResponse, context: any) {
  console.log({ req });
  return NextResponse.json({
    hello: "world 1",
  });
  // res.setHeader("Content-Type", "image/png");
  // const filePath = join(process.cwd(), "icons", params.id);
  // console.log(filePath);
  // const imageStream = createReadStream(filePath);
  // pipeline(imageStream, res, (error) => {});
}
