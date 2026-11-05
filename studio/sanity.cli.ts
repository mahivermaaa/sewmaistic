import { defineCliConfig } from "sanity/cli";
import { projectId, dataset } from "./project";

export default defineCliConfig({
  api: { projectId, dataset },
  // Gives the dashboard a friendly address: https://sewmaistic.sanity.studio
  studioHost: "sewmaistic",
});
