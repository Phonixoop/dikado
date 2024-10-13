import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import fs from "fs";
import path from "path";
import { db } from "~/server/db";
import { generateUUID } from "~/lib/utils";
import { NextResponse } from "next/server";
import { ADMIN_UPLOADS } from "~/constants";

// Disable Next.js' default body parser

// API handler
export async function POST(req, res) {
  const formData = await req.formData();

  const tag = formData.get("tag");
  const files = formData.getAll("file") as File[];

  try {
    const uploadedFilePaths: string[] = []; // Track uploaded file paths for rollback

    // Loop through each file and its corresponding tag
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Ensure that a tag is provided

      const newFilename = generateUUID() + "-" + file.name;
      const [filePath, error] = await saveFile(file, newFilename);
      if (error)
        return NextResponse.next({
          status: 500,
          statusText:
            "File could not be saved due to an internal server error.",
        });

      uploadedFilePaths.push(filePath); // Store file paths to delete if needed

      try {
        await db.file.create({
          data: {
            tag: tag, // Use the provided tag for each file
            url: `/uploads/${newFilename}`,
            size: file.size,
            mimetype: file.type,
            uploadPath: filePath,
            originalFilename: file.name,
            newFilename: newFilename,
          },
        });
      } catch (dbError) {
        // Rollback: delete the uploaded file if the DB operation fails
        const [_, error] = await deleteFile(filePath);
        if (error)
          return NextResponse.next({
            status: 500,
            statusText:
              "File could not be deleted, image details could not be saved to the database",
          });

        return Response.json({ error: "Error uploading files", dbError });
      }
    }
    return Response.json({ message: "Files uploaded successfully" });
  } catch (uploadError) {
    return Response.json({ error: "Error uploading files", uploadError });
  }
}

// Helper to handle file saving

async function saveFile(file: File, filename: string) {
  const uploadPath = path.join(ADMIN_UPLOADS, filename);

  try {
    const bb = await file.arrayBuffer();
    const buffer = Buffer.from(bb);
    await fs.promises.writeFile(uploadPath, buffer);
    return [uploadPath, undefined];
  } catch (error) {
    return [undefined, error];
  }
}
// Helper to delete a file
const deleteFile = async (filePath: string) => {
  try {
    await fs.promises.unlink(filePath);
    return [true, undefined];
  } catch (error) {
    return [undefined, error];
  }
};

function convertFormDataArrayToObject(formDataArray) {
  const formDataObject = {};

  formDataArray.forEach((entry) => {
    // Ensure the entry is an array with exactly two elements: [key, value]
    if (Array.isArray(entry) && entry.length === 2) {
      const [key, value] = entry;

      // If the key already exists, append the value to an array
      if (formDataObject[key]) {
        if (Array.isArray(formDataObject[key])) {
          formDataObject[key].push(value);
        } else {
          formDataObject[key] = [formDataObject[key], value];
        }
      } else {
        // If the key doesn't exist, assign the value directly
        formDataObject[key] = value;
      }
    } else {
      console.error(`Invalid entry: ${entry}`);
    }
  });

  return formDataObject;
}
