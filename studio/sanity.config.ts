import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemaTypes";
import { projectId, dataset } from "./project";

export default defineConfig({
  name: "default",
  title: "Sewmaistic Products",
  projectId,
  dataset,
  plugins: [structureTool()],
  schema: { types: schemaTypes },
});
