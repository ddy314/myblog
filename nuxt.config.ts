import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

export default defineNuxtConfig({
  compatibilityDate: "2026-03-19",
  modules: ["@nuxt/content", "@nuxtjs/tailwindcss"],
  css: ["~/assets/css/main.css"],
  content: {
    build: {
      markdown: {
        remarkPlugins: {
          "remark-math": remarkMath,
        },
        rehypePlugins: {
          "rehype-katex": rehypeKatex,
        },
      },
    },
  },
  tailwindcss: {
    viewer: false,
  },
  mdc: {
    highlight: {
      // Keep the default bundled languages and add C++ so fenced `cpp` / `c++`
      // blocks do not fall back to plain text.
      preload: ["cpp"],
    },
  },
  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || "/",
  },
  nitro: {
    preset: "static",
  },
});
