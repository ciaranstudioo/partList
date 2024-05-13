import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// build rollupOptions from this stackOverFlow link:
// https://stackoverflow.com/questions/69260715/skipping-larger-chunks-while-running-npm-run-build

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // build: {
  //   rollupOptions: {
  //     output: {
  //       manualChunks(id) {
  //         if (id.includes("node_modules")) {
  //           return id
  //             .toString()
  //             .split("node_modules/")[1]
  //             .split("/")[0]
  //             .toString();
  //         }
  //       },
  //     },
  //   },
  // },
});
