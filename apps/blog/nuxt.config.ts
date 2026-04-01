import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-01-01",
  devtools: { enabled: true },
  modules: ["@pinia/nuxt", "@nuxt/content"],
  app: {
    baseURL: "/blog/",
    head: {
      title: "我的博客 - 前端开发与AI技术分享",
      htmlAttrs: {
        lang: "zh-CN",
      },
      meta: [
        {
          name: "description",
          content: "分享前端开发、人工智能和技术生活的个人博客",
        },
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },
  content: {
    highlight: {
      theme: "github-dark",
    },
  },
  css: ["~/assets/css/tailwind.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ["/", "/about", "/blog"],
    },
  },
  experimental: {
    payloadExtraction: false,
  },
});
