import { defineConfig, passthroughImageService } from "astro/config";

export default defineConfig({
  site: "https://ddy314.github.io/myblog/",
  base: "/myblog",
  output: "static",
  image: {
    service: passthroughImageService(),
  },
});
