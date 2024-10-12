import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import fs from "fs";
import path from "path";
import { db } from "~/server/db";

// Disable Next.js' default body parser

// Helper to handle file saving
const saveFile = async (file: formidable.File): Promise<string> => {
  const data = fs.readFileSync(file.filepath);
  const uploadPath = path.join(
    process.cwd(),
    "/uploads",
    file.newFilename || file.originalFilename,
  );
  fs.writeFileSync(uploadPath, data);
  return uploadPath;
};

// Helper to delete a file
const deleteFile = (filePath: string) => {
  fs.unlinkSync(filePath);
};

// API handler
export async function POST(req, res) {
  const form = new formidable.IncomingForm({ multiples: true });

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: "Error parsing the files" });

    const fileList = Array.isArray(files.files) ? files.files : [files.files];

    // Check if each file has a tag provided in the fields
    if (fileList.length !== Object.keys(fields).length - 1) {
      return res
        .status(400)
        .json({ error: "Each file must have a corresponding tag" });
    }

    try {
      const uploadedFilePaths: string[] = []; // Track uploaded file paths for rollback
      const tags = fields.tag || []; // As
      // Loop through each file and its corresponding tag
      for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];
        const tag = tags[i]; // Assuming tag fields are named as tag_0, tag_1, ...

        // Ensure that a tag is provided
        if (!tag) {
          return res.status(400).json({
            error: `Tag is required for file ${file.originalFilename}`,
          });
        }

        const filePath = await saveFile(file);
        uploadedFilePaths.push(filePath); // Store file paths to delete if needed

        try {
          await db.file.create({
            data: {
              tag: tag, // Use the provided tag for each file
              url: `/uploads/${file.newFilename || file.originalFilename}`,
              size: file.size,
              mimetype: file.mimetype,
              uploadPath: filePath,
              originalFilename: file.originalFilename,
              newFilename: file.newFilename || file.originalFilename,
            },
          });
        } catch (dbError) {
          // Rollback: delete the uploaded file if the DB operation fails
          deleteFile(filePath);
          return res
            .status(500)
            .json({ error: "Failed to save file metadata to the database" });
        }
      }

      res.status(200).json({ message: "Files uploaded successfully" });
    } catch (uploadError) {
      res.status(500).json({ error: "Error uploading files" });
    }
  });
}
