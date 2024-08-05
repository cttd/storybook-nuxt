<template>
  <component :is="icon" class="svg-icon" :class="classes" :style="styles" />
</template>

<script setup>
const props = defineProps({
  name: {
    type: String,
    required: true,
  },

  /**
   * @type {"large" | "medium" | "small" | "xsmall" | number}
   * - "large": 24px
   * - "medium": 20px
   * - "small": 16px
   * - "xsmall": 12px
   */
  size: {
    type: [String, Number],
    default: "medium",
    validator: (value) =>
      (typeof value === "string" &&
        ["large", "medium", "small", "xsmall"].includes(value)) ||
      typeof value === "number",
  },
  width: {
    type: [Number, String],
    default: undefined,
  },
  height: {
    type: [Number, String],
    default: undefined,
  },
  scaleStroke: {
    type: Boolean,
    default: true,
  },
  flipX: {
    type: Boolean,
    default: false,
  },
  flipY: {
    type: Boolean,
    default: false,
  },
});
const icon = computed(() => resolveComponent(`Ic${toPascalCase(props.name)}`));
const classes = computed(() => {
  const value = {
    "flip-x": props.flipX,
    "flip-y": props.flipY,
    "non-scaling-stroke": !props.scaleStroke,
  };

  if (
    typeof props.size === "string" &&
    ["large", "medium", "small", "xsmall"].includes(props.size)
  ) {
    value[`icon_${props.size}`] = true;
  }

  return value;
});
const styles = computed(() => {
  const size = typeof props.size === "number" ? props.size : undefined;
  const width = pxIfNumber(props.width ?? size);
  const height = pxIfNumber(props.height ?? size);

  if (width || height) {
    return {
      width,
      height,
    };
  }
});
</script>

<style lang="scss" scoped>
.svg-icon {
  transform: var(--icon-transform);
  color: var(--icon-color, currentColor);
}

.non-scaling-stroke :deep([stroke]) {
  vector-effect: var(--icon-vector-effect, non-scaling-stroke);
}

.flip-x {
  --icon-transform: scaleX(-1);
}

.flip-y {
  --icon-transform: scaleY(-1);
}
</style>
