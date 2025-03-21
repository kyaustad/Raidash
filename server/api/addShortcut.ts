import fs from "fs/promises";
import path from "path";

const filePath = path.resolve("public/db/shortcuts.json");

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    const newEntry = {
      name: body.name,
      url: body.url,
      image: body.image,
      icon: body.icon,
      imageUrl: body.imageUrl,
    };

    try {
      await fs.access(filePath);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      console.log("No shortcuts file found. Creating now...");

      await fs.writeFile(filePath, JSON.stringify([]));
    }

    const data = JSON.parse(await fs.readFile(filePath, "utf-8"));

    data.push(newEntry);

    await fs.writeFile(filePath, JSON.stringify(data, null, 2));

    return {
      status: "success",
      message: "Shortcut added successfully!",
      data: newEntry,
    };
  } catch (error) {
    return {
      status: "error",
      message: "Failed to process the request",
      data: error,
    };
  }
});
