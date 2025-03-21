import fs from "fs/promises";
import path from "path";
import type { Shortcut } from "~~/types/shortcut";

const filePath = path.resolve("server/db/shortcuts.json");

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.log(body);

  const data = JSON.parse(await fs.readFile(filePath, "utf-8"));

  const index = data.findIndex(
    (shortcut: Shortcut) =>
      shortcut.name === body.name && shortcut.url === body.url
  );

  if (index !== -1) {
    data.splice(index, 1);
    console.log(data);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));

    return { status: "success" };
  } else {
    return { status: "fail" };
  }
});
