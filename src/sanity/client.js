import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "x2dgr13b",
  dataset: "production",
  apiVersion: "2023-09-11",
  useCdn: false,
});

export default client;
