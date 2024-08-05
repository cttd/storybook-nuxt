/** @type { import('@storybook/vue3-vite').StorybookConfig } */
import vue from "@vitejs/plugin-vue";
import { mergeConfig } from "vite";
import { resolve } from "path";
import AutoImport from "unplugin-auto-import/vite";
// import Components from "unplugin-vue-components/vite";

const config = {
  stories: ["../stories/**/*.mdx", "../stories/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/vue3-vite",
    options: {},
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      plugins: [
        vue(),
        AutoImport({
          imports: ["vue"],
          // dts: resolve(__dirname, "../auto-imports.d.ts"),
        }),
        // Components({
        //   dirs: ["../components"],
        //   extensions: ["vue"],
        //   dts: resolve(__dirname, "../components.d.ts"),
        //   include: [/\.vue$/, /\.vue\?vue/],
        //   exclude: [
        //     /[\\/]node_modules[\\/]/,
        //     /[\\/]\.git[\\/]/,
        //     /[\\/]\.nuxt[\\/]/,
        //   ],
        // }),
      ],
      resolve: {
        alias: {
          "@": resolve(__dirname, ".."),
          "~": resolve(__dirname, ".."),
          vue: "vue/dist/vue.esm-bundler.js",
          // "#components": resolve(__dirname, "../.nuxt/components"),
        },
      },
    });
  },
  // staticDirs: ["../public"],
};

export default config;
