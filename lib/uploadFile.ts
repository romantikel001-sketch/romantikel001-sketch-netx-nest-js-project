import { promises as fs } from "fs";
import path from "path";

export async function uploadFile(file: File | null, prefix: string): Promise<string | null> {
  if (!file || file.size === 0 || file.name === "undefined") {
    return null;
  }

  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const safeFilename = file.name.replaceAll(" ", "_");
    const filename = `${prefix}-${Date.now()}-${safeFilename}`;

    const relativePath = `/uploads/${filename}`;
    const absolutePath = path.join(process.cwd(), "public", relativePath);

    await fs.writeFile(absolutePath, buffer);

    console.log(`Файл успешно сохранен: ${absolutePath}`);
    return relativePath;
  } catch (error) {
    console.error("Ошибка при сохранении файла:", error);
    return null;
  }
}