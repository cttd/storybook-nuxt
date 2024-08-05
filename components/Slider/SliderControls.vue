<template>
  <div class="swiper-button-wrap" :class="[{ autohide }, direction]">
    <button
      type="button"
      class="swiper-button swiper-button--next"
      :class="{
        'swiper-button--large': size === 'large',
        'swiper-button--xsmall': size === 'xsmall',
        'swiper-button-disabled': nextDisabled,
        'no-rotate': direction === 'vertical' && $slots.iconNext,
      }"
      :disabled="nextDisabled"
      aria-label="다음보기"
      @click="next"
    >
      <slot name="iconNext">
        <SvgIcon class="icon" :name="getIconName('next')" />
      </slot>
    </button>
    <button
      type="button"
      class="swiper-button swiper-button--prev"
      :class="{
        'swiper-button--large': size === 'large',
        'swiper-button--xsmall': size === 'xsmall',
        'swiper-button-disabled': prevDisabled,
        'no-rotate': direction === 'vertical' && $slots.iconPrev,
      }"
      :disabled="prevDisabled"
      aria-label="이전보기"
      @click="prev"
    >
      <slot name="iconPrev">
        <SvgIcon class="icon" :name="getIconName('prev')" />
      </slot>
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  swiper: {
    type: Object,
    required: true,
  },
  size: {
    type: String,
    default: "small",
    validator: (value) => ["large", "small", "xsmall"].includes(value),
  },
  autohide: {
    type: Boolean,
    default: false,
  },
  direction: {
    type: String,
    default: "horizontal",
    validator: (value) => ["horizontal", "vertical"].includes(value),
  },
  iconNext: {
    type: String,
    default: "right_large",
  },
  iconPrev: {
    type: String,
    default: "left_large",
  },
  slideNext: {
    type: Function,
    default: (swiper) => {
      swiper.slideNext();
    },
  },
  slidePrev: {
    type: Function,
    default: (swiper) => {
      swiper.slidePrev();
    },
  },
});

const nextDisabled = ref(false);
const prevDisabled = ref(false);

const prev = () => {
  props.swiper?.slidePrev?.();
  if (props.swiper) {
    props.slidePrev(props.swiper);
  }
};
const next = () => {
  if (props.swiper) {
    props.slideNext(props.swiper);
  }
};
const updateButtonStates = (swiper) => {
  if (!swiper) return;

  const loop = swiper.params.loop;

  prevDisabled.value = !loop && swiper.isBeginning;
  nextDisabled.value = !loop && swiper.isEnd;
};
const getIconName = (type) => {
  const size = props.size || "small";
  if (type === "next") {
    return size === "large"
      ? "right_large"
      : size === "xsmall"
        ? "right_small"
        : "right_large";
  } else if (type === "prev") {
    return size === "large"
      ? "left_large"
      : size === "xsmall"
        ? "left_small"
        : "left_large";
  }
};

onMounted(() => {
  const swiper = props.swiper;
  if (!swiper) return;

  updateButtonStates(swiper);
  swiper.on("slideChange", () => {
    updateButtonStates(swiper);
  });
});
</script>

<style lang="scss" scoped>
.swiper-button-wrap {
  width: 100%;
  height: 100%;

  &:where(.autohide) {
    --swiper-button-default-opacity: 0;
  }

  &:where(.horizontal) {
    --swiper-button-default-top: 50%;
    --swiper-button-y: -50%;
    --swiper-button-prev-left: var(
      --slides-offset-before,
      var(--slides-offset, 0)
    );
    --swiper-button-next-right: var(
      --slides-offset-after,
      var(--slides-offset, 0)
    );
  }

  &:where(.vertical) {
    --swiper-button-left: 50%;
    --swiper-button-x: -50%;
    --swiper-button-rotate: 90deg;
    --swiper-button-prev-top: 0;
    --swiper-button-next-bottom: 0;
  }
}

.swiper-button {
  position: absolute;
  opacity: var(--swiper-button-opacity, var(--swiper-button-default-opacity));
  top: var(--swiper-button-top, var(--swiper-button-default-top, 50%));
  width: var(--swiper-button-size, 48px);
  height: var(--swiper-button-size, 48px);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--swiper-button-color, #fff);
  background-color: var(--swiper-button-bg, rgb(0 0 0 / 20%));
  z-index: var(--swiper-button-z, 5);
  transition: opacity 0.3s linear;

  .icon,
  :slotted(svg) {
    width: var(--swiper-button-icon-width, 12px);
  }

  &--next {
    inset: var(
        --swiper-button-next-top,
        var(--swiper-button-top, var(--swiper-button-default-top))
      )
      var(--swiper-button-next-right, var(--swiper-button-right))
      var(--swiper-button-next-bottom, var(--swiper-button-bottom))
      var(--swiper-button-next-left, var(--swiper-button-left));
    transform: translate3d(
        var(--swiper-button-next-x, var(--swiper-button-x, 0)),
        var(--swiper-button-next-y, var(--swiper-button-y, 0)),
        0
      )
      rotate(var(--swiper-button-next-rotate, var(--swiper-button-rotate, 0)));
  }

  &--prev {
    inset: var(
        --swiper-button-prev-top,
        var(--swiper-button-top, var(--swiper-button-default-top))
      )
      var(--swiper-button-prev-right, var(--swiper-button-right))
      var(--swiper-button-prev-bottom, var(--swiper-button-bottom))
      var(--swiper-button-prev-left, var(--swiper-button-left));
    transform: translate3d(
        var(--swiper-button-prev-x, var(--swiper-button-x, 0)),
        var(--swiper-button-prev-y, var(--swiper-button-y, 0)),
        0
      )
      rotate(var(--swiper-button-prev-rotate, var(--swiper-button-rotate, 0)));
  }

  &--large {
    --swiper-button-size: 72px;
    --swiper-button-icon-width: 20px;
  }

  &--xsmall {
    --swiper-button-size: 32px;
    --swiper-button-icon-width: 100%;

    .icon {
      :deep(path) {
        stroke: #fff;
      }
    }
  }

  &.no-rotate {
    --swiper-button-rotate: 0;
  }

  &.swiper-button-disabled {
    --swiper-button-color: var(--swiper-button-disabled-color);

    pointer-events: auto;

    .icon,
    :slotted(svg) {
      opacity: var(--swiper-button-disabled-opacity, 0.5);
    }
  }
}
</style>
