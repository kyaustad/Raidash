import fs from "fs/promises";
import path from "path";

const filePath = path.resolve("public/db/shortcuts.json");

export default defineEventHandler(async () => {
  try {
    try {
      await fs.access(filePath);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      console.log("No shortcuts file found. Creating now...");

      await fs.writeFile(filePath, JSON.stringify([]));
    }

    const shortcuts = JSON.parse(await fs.readFile(filePath, "utf-8"));

    if (!shortcuts)
      return { ok: false, data: undefined, message: "No shortcuts found!" };
    else
      return {
        ok: true,
        data: shortcuts,
        message: "Successfully loaded shortcuts",
      };
  } catch (error) {
    console.error(error);
    return { ok: false, data: undefined, message: "Error Getting Shortcuts" };
  }
});
