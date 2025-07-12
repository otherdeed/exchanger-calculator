// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  devtools: { enabled: true },
  css: ['@/assets/scss/global.scss'],
  app: {
    head: {
      title: 'Crypto Exchanger',
      htmlAttrs: {
        lang: 'ru'
      },
    }
  },
  nitro: {
    preset: 'node-server',
    minify: true,
    sourceMap: false,
    compressPublicAssets: true,
    prerender: {
      routes: ['/'],
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use '@/assets/scss/_vars.scss' as *;
            @use '@/assets/scss/_mixins.scss' as *;
            @use '@/assets/scss/_animations.scss' as *;
          `,
        },
      },
    },
  },
  modules: ['nuxt-icons', '@pinia/nuxt'],
  router: {
    options: {
      scrollBehaviorType: 'smooth'
    }
  },

  runtimeConfig:{
    public:{
      apiUrl: process.env.BASE_URL
    }
  }
})
