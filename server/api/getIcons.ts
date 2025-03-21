import { readdir } from "fs/promises";
import { join } from "path";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default defineEventHandler(async (event) => {
  const iconsDir = join(process.cwd(), "public/icons/svg");

  try {
    const files = await readdir(iconsDir);
    return files.filter((file) => file.endsWith(".svg"));
  } catch (error) {
    console.error(error);
    return [];
  }
});
