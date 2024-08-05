<template>
  <div class="horizontal-slider" :class="classes" :style="styles">
    <swiper-container
      ref="swiperContainer"
      :slides-per-view="slidesPerView ? slidesPerView : 'auto'"
      :slides-per-group="slidesPerGroup ? slidesPerGroup : '1'"
      :slides-offset-before="offsetBefore || offset"
      :slides-offset-after="offsetAfter || offset"
      :space-between="spaceBetween"
      init="false"
      v-bind="attrs"
      @swiperslidechange="
        (event) => {
          $emit('slidechange', event.detail[0]);
        }
      "
    >
      <slot></slot>
    </swiper-container>
    <ClientOnly>
      <SliderControls
        v-if="hasControls"
        :swiper="swiperContainer.swiper"
        :autohide="autoHideControls"
        :size="controlsSize"
        class="controls"
      />
      <ProgressPagination
        v-if="hasPagination"
        :swiper="swiperContainer.swiper"
        class="progressbar"
      />
      <FractionPagination
        v-if="displayPageCount"
        :swiper="swiperContainer.swiper"
        :has-more-button="displayMoreButton"
        class="fraction"
        @show-more="$emit('showMore')"
      />
    </ClientOnly>
  </div>
</template>

<script setup>
useSwiper();

defineOptions({
  inheritAttrs: false,
});
defineEmits(["slidechange", "showMore"]);

const { class: rootClass, style: rootStyle, ...attrs } = useAttrs();
const swiperContainer = ref();
const props = defineProps({
  slidesPerView: {
    type: [Number, String],
    default: undefined,
  },
  slidesPerGroup: {
    type: Number,
    default: undefined,
  },
  pagination: {
    type: Boolean,
    default: false,
  },
  slideWidth: {
    type: [Number, String],
    default: undefined,
  },
  spaceBetween: {
    type: Number,
    default: 6,
  },
  offsetBefore: {
    type: Number,
    default: undefined,
  },
  offsetAfter: {
    type: Number,
    default: undefined,
  },
  offset: {
    type: Number,
    default: undefined,
  },
  displayPageCount: {
    type: Boolean,
    default: false,
  },
  isOverflowVisible: {
    type: Boolean,
    default: false,
  },
  displayMoreButton: {
    type: Boolean,
    default: false,
  },
  displayControls: {
    type: Boolean,
    default: true,
  },
  controlsSize: {
    type: String,
    default: "small",
    validator: (value) => ["large", "small", "xsmall"].includes(value),
  },
  controlsTop: {
    type: [Number, String],
    default: undefined,
  },
  autoHideControls: {
    type: Boolean,
    default: false,
  },
});

const styles = computed(() => {
  const result = {
    ...rootStyle,
  };

  result["--slide-width"] = pxIfNumber(props.slideWidth);

  ["offset", "offsetBefore", "offsetAfter"].forEach((key) => {
    if (props[key]) {
      result[`--slides-${toKebabCase(key)}`] = pxIfNumber(props[key]);
    }
  });

  if (props.controlsTop) {
    result["--swiper-button-top"] = pxIfNumber(props.controlsTop);
    result["--swiper-button-y"] = "translateY(-50%)";
  }

  return result;
});
const classes = computed(() => [
  rootClass,
  {
    "auto-hide-controls": props.autoHideControls,
    "has-pagination": hasPagination.value,
    "has-controls": hasControls.value,
  },
]);

const params = computed(() => {
  const result = {
    injectStyles: [],
  };

  if (props.isOverflowVisible) {
    result.injectStyles.push(
      `
        .swiper {
          overflow: visible;
        }
      `,
    );
  }

  return result;
});

const isSlidesEnough = computed(() => {
  if (!swiperContainer.value?.swiper) return false;

  const swiper = swiperContainer.value.swiper;
  return swiper.slides.length > swiper.slidesPerViewDynamic();
});
const hasControls = computed(
  () => props.displayControls && isSlidesEnough.value,
);

const hasPagination = computed(() => props.pagination && isSlidesEnough.value);

onMounted(() => {
  if (swiperContainer.value) {
    Object.assign(swiperContainer.value, params.value);
    swiperContainer.value.initialize();
  }
});

defineExpose({
  swiper: computed(() => swiperContainer.value?.swiper),
});
</script>

<style lang="scss" scoped>
:slotted(swiper-slide) {
  width: var(--slide-width);
}

.horizontal-slider,
swiper-container {
  width: 100%;
  position: relative;
}

.auto-hide-controls:hover {
  --swiper-button-opacity: 1;
}

:where(.has-controls) {
  --swiper-button-top: 50%;
}

:where(.has-pagination) {
  --swiper-button-top: calc(
    50% -
      (var(--pagination-track-height, 2px) + var(--pagination-margin-top, 24px)) /
      2
  );
}

.fraction {
  --pagination-r: 0;
  --pagination-pad-x: var(--pagination-padding, 12px);

  position: var(--pagination-position, absolute);
  inset: var(--pagination-inset-top, auto)
    var(--pagination-inset-right, calc(660 / 1920 * 100%))
    var(--pagination-inset-bottom, 20px) var(--pagination-inset-left, auto);
  z-index: var(--pagination-zindex, 10);
  margin: var(--pagination-margin, 0);
}
</style>
