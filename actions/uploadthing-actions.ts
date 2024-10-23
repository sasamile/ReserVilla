"use server";

import { UploadFileResponse } from "@/types";
import { utapi } from "./uploadthing";
import { formatImageUrl } from "@/lib/format-url";
import { FileEsque } from "uploadthing/types";

export async function uploadFiles(formData: FormData) {
  try {
    const file = formData.get("file") as FileEsque;

    if (file instanceof File) {
      const response: UploadFileResponse = await utapi.uploadFiles(file);

      if (response.data) {
        return { success: true, data: response.data };
      }

      return { success: false, message: "Something went wrong" };
    } else {
      // throw new Error("Invalid file");
      return { success: false, message: "No files found for upload" };
    }
  } catch (error: any) {
    return { sucess: false, message: "" };
  }
}

export async function deleteImageFile(imageUrl: string) {
  try {
    const newImageUrl = formatImageUrl(imageUrl);
    const response = await utapi.deleteFiles(newImageUrl);

    return { success: response.success };
  } catch (error) {
    console.log(error);
  }
}
