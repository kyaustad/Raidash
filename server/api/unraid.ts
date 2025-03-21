import type { MasterQueryResponse } from "~~/types/masterQuery";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const apiKey = process.env.UNRAID_KEY;
  const url = process.env.UNRAID_URL;
  if (!apiKey) console.log("NO API KEY!");
  if (!url) console.log("NO UNRAID URL!");

  try {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

    const response: MasterQueryResponse = await $fetch(`${url}/graphql`, {
      method: "POST",
      headers: {
        "x-api-key": `${apiKey}`,
        "Content-Type": "application/json",
      },
      body,
    });

    return { data: response, error: null, details: "Success!" };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      error: "Failed to fetch data from Unraid:",
      details: error,
    };
  }
});
