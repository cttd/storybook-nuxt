<template>
  <div class="fraction-pagination">
    <span class="pagination-current">{{ currentPage }}</span>
    <span class="pagination-divider">/</span>
    <span class="pagination-total">{{ totalPages }}</span>
    <button
      v-if="hasMoreButton"
      type="button"
      class="pagination-more"
      @click="$emit('showMore')"
    >
      <SvgIcon name="plus_small" size="xsmall" class="icon" />
    </button>
  </div>
</template>

<script setup>
defineEmits(["showMore"]);

const props = defineProps({
  swiper: {
    type: Object,
    required: true,
  },
  format: {
    type: Function,
    default: (num) => num,
  },
  hasMoreButton: {
    type: Boolean,
    default: false,
  },
});
const currentPage = ref(0);
const totalPages = ref(0);

onMounted(() => {
  const swiper = props.swiper;
  const format = props.format || ((num) => num);
  if (!swiper) return;

  currentPage.value = format(swiper.realIndex + 1);
  totalPages.value = format(swiper.slides.length);
  swiper.on("realIndexChange", () => {
    currentPage.value = format(swiper.realIndex + 1);
  });
  swiper.on("slidesLengthChange", () => {
    totalPages.value = format(swiper.slides.length);
  });
});
</script>

<style lang="scss" scoped>
.fraction-pagination {
  display: inline-flex;
  align-items: center;
  gap: var(--pagination-gap, 4px);
  height: var(--pagination-height, em(27, 16));
  padding-inline: var(--pagination-pad-x, 16px);
  border-radius: var(--pagination-r, 100vh);
  background: var(--pagination-bg, rgb(0 0 0 / 20%));
  color: var(--pagination-text-color, #fff);
  font-variant-numeric: tabular-nums;
  font-size: var(--pagination-font-size);

  > * {
    opacity: var(--pagination-part-opacity, 0.5);
    letter-spacing: em(-0.4, 16);
  }
}

.pagination-current {
  --pagination-part-opacity: var(
    --pagination-current-opacity,
    var(--pagination-part-default-opacity, 1)
  );
}

.pagination-divider {
  --pagination-part-opacity: var(
    --pagination-divider-opacity,
    var(--pagination-part-default-opacity)
  );
}

.pagination-total {
  --pagination-part-opacity: var(
    --pagination-total-opacity,
    var(--pagination-part-default-opacity)
  );
}

.pagination-more {
  --pagination-part-opacity: var(
    --pagination-more-opacity,
    var(--pagination-part-default-opacity)
  );
}
</style>
