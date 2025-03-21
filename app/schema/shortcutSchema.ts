import * as v from "valibot";

export const shortcutSchema = v.object({
  name: v.pipe(
    v.string(),
    v.minLength(3, "Name must be at least 3 characters")
  ),
  url: v.pipe(v.string(), v.url("Invalid URL - Need 'http://' or 'https://'")),
  image: v.boolean(),
  icon: v.optional(v.string()),
  imageUrl: v.optional(v.string()),
});
