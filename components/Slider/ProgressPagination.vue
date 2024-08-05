<template>
  <div ref="progressbar" class="progress-pagination">
    <div class="track">
      <div class="fill"></div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  swiper: {
    type: Object,
    required: true,
  },
});
const progressbar = ref(null);
const getProgress = () => {
  const swiper = props.swiper;
  if (!swiper) return 0;

  let value = (swiper.realIndex + 1) / swiper.slides.length;

  if (!swiper.params.loop) {
    if (swiper.passedParams.slidesPerView === "auto") {
      const min = 1 / swiper.slides.length;
      value = min + (1 - min) * swiper.progress;
    } else {
      const slidesPerView = swiper.slidesPerViewDynamic();
      value = (swiper.realIndex + slidesPerView) / swiper.slides.length;
    }
  }

  return value;
};
const updateProgressbar = (progress) => {
  if (!progressbar.value) return;

  progressbar.value.style.setProperty("--pagination-progress", progress);
};

onMounted(() => {
  if (!props.swiper) return;

  updateProgressbar(getProgress());
  props.swiper.on("realIndexChange", () => {
    updateProgressbar(getProgress());
  });
});
</script>

<style lang="scss" scoped>
.progress-pagination {
  --pagination-offset-default-before: var(
    --slides-offset-before,
    var(--slides-offset, 0px)
  );
  --pagination-offset-default-after: var(
    --slides-offset-after,
    var(--slides-offset, 0px)
  );

  width: var(--pagination-width, 100%);
  margin: var(--pagination-margin, var(--pagination-margin-top, 24px) auto 0);
  padding-inline: calc(
      var(--pagination-pad-inline, 0) +
        var(--pagination-offset, var(--pagination-offset-default-before))
    )
    calc(
      var(--pagination-pad-inline, 0) +
        var(--pagination-offset, var(--pagination-offset-default-after))
    );
}

.track {
  position: relative;
  width: 100%;
  height: var(--pagination-track-height, 2px);
  background: var(--pagination-track-color, #d4d4d3);
}

.fill {
  width: 100%;
  height: 100%;
  background: var(--pagination-fill-color, #000);
  transform-origin: top left;
  transform: translate3d(0, 0, 0) scaleX(var(--pagination-progress, 0))
    scaleY(1);
  transition: transform 0.3s;
}
</style>
