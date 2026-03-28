export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  future: {
    compatibilityVersion: 3,
  },
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxt/content',
  ],
  app: {
    head: {
      title: '我的博客 - 前端开发与AI技术分享',
      htmlAttrs: {
        lang: 'zh-CN',
      },
      meta: [
        { name: 'description', content: '分享前端开发、人工智能和技术生活的个人博客' },
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
  },
  content: {
    highlight: {
      theme: 'github-dark',
    },
  },
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
  },
  experimental: {
    payloadExtraction: true,
  },
  nitro: {
    prerender: {
      routes: ['/'],
    },
  },
})
