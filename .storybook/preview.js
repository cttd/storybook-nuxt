import { setup } from "@storybook/vue3";
import { useSlots, computed } from "vue";
// import { components } from "../.nuxt/components";

// 전역 스타일
// import "../src/assets/styles/global.css";

setup((app) => {
  // 필요한 전역 컴포넌트나 플러그인을 등록
  // ex) app.component('MyButton', MyButton)
  // ex) app.use(createPina())
  // Object.entries(components).forEach(([name, component]) => {
  //   app.component(name, component);
  // });
});

/** @type { import('@storybook/vue3').Preview } */
export const parameters = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/i,
    },
  },
};
