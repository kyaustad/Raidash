import fs from "fs/promises";
import path from "path";

const filePath = path.resolve("server/db/shortcuts.json");

export default defineEventHandler(async () => {
  const shortcuts = JSON.parse(await fs.readFile(filePath, "utf-8"));

  if (!shortcuts)
    return { ok: false, data: undefined, message: "No shortcuts found!" };
  else
    return {
      ok: true,
      data: shortcuts,
      message: "Successfully loaded shortcuts",
    };
});
