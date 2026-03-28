export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxt/content',
  ],
  app: {
    head: {
      title: 'My Blog',
      meta: [
        { name: 'description', content: 'Personal blog built with Nuxt 3' },
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
})
