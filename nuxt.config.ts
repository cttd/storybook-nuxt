// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["nuxt-svgo"],

  devtools: { enabled: true },

  components: [
    // https://nuxt.com/docs/guide/directory-structure/components#component-names
    {
      path: "@/components",
      pathPrefix: false,
    },
    // {
    //   path: "@/views",
    //   pathPrefix: false,
    // },
  ],

  svgo: {
    // https://github.com/cpsoinos/nuxt-svgo
    defaultImport: "component",
    componentPrefix: "Ic",
  },

  vite: {
    // https://nuxt.com/docs/api/configuration/nuxt-config#vite
    vue: {
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith("swiper-"),
        },
      },
    },
  },
  // https://nuxt.com/blog/v3-8#app-manifest
  // experimental: { appManifest: false },
});
