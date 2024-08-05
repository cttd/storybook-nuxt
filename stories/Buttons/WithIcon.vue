<template>
  <MaybeLink
    :aria-label="label"
    class="button"
    :class="classes"
    :style="styles"
  >
    <span v-if="$slots.default" class="button__label">
      <slot></slot>
    </span>
    <slot name="icon">
      <SvgIcon
        v-if="icon"
        :name="icon"
        :size="iconSize"
        :flip-x="flipX"
        :flip-y="flipY"
        class="button__icon"
      />
    </slot>
    <template v-if="hasBadge">
      <span v-if="badgeText" class="badge badge--text">{{ badgeText }}</span>
      <span v-else class="badge badge--dot"></span>
    </template>
  </MaybeLink>
</template>

<script setup>
import { pxIfNumber } from "../../utils/pxIfNumber";

const slots = useSlots();
const props = defineProps({
  icon: {
    type: String,
    default: undefined,
  },
  iconSize: {
    type: [String, Number],
    default: undefined,
  },
  iconGap: {
    type: [String, Number],
    default: undefined,
  },
  size: {
    type: [String, Number],
    default: undefined,
  },
  width: {
    type: [String, Number],
    default: undefined,
  },
  height: {
    type: [String, Number],
    default: undefined,
  },
  label: {
    type: String,
    default: undefined,
  },
  st: {
    type: String,
    default: undefined,
    validator: (value) => ["grey", "gray"].includes(value),
  },
  wrap: {
    type: Boolean,
    default: false,
  },
  badge: {
    type: [Boolean, Number, String],
    default: undefined,
  },
  pressed: {
    type: Boolean,
    default: false,
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

const is = props.to ? resolveComponent("NuxtLink") : "button";
const hasBadge = computed(() => {
  if (typeof props.badge === "boolean") {
    return props.badge;
  }
  return props.badge !== undefined && props.badge !== 0;
});
const badgeText = computed(() => {
  if (!hasBadge.value) {
    return;
  }

  if (typeof props.badge === "string" || typeof props.badge === "number") {
    return props.badge.toString();
  }
});
const classes = computed(() => {
  const classesOptional = {};
  if (props.st) {
    classesOptional[`button_style_${props.st}`] = true;
  }
  return {
    "has-text-label": slots.default,
    "has-icon": props.icon || slots.icon,
    "has-badge": hasBadge.value,
    "has-badge-text": hasBadge.value && badgeText.value,
    "is-pressed": props.pressed,
    "is-disabled": is !== "button" && props.disabled,
    wrap: props.wrap,

    ...classesOptional,
  };
});
const styles = computed(() => {
  const value = {};

  if (typeof props.size === "number" || typeof props.size === "string") {
    value["--button-size"] = pxIfNumber(props.size);
  }

  if (typeof props.width === "number" || typeof props.width === "string") {
    value["--button-width"] = pxIfNumber(props.width);
  }

  if (typeof props.height === "number" || typeof props.height === "string") {
    value["--button-height"] = pxIfNumber(props.height);
  }

  if (typeof props.iconGap === "number" || typeof props.iconGap === "string") {
    value["--icon-gap"] = pxIfNumber(props.iconGap);
  }

  return value;
});
</script>

<style lang="scss" scoped>
.has-icon {
  display: var(--button-display, inline-flex);
  align-items: center;
  justify-content: center;
  gap: var(--icon-gap, 0);
}

.has-icon:not(.has-text-label) {
  min-width: var(--button-width, var(--button-size, auto));
  min-height: var(--button-height, var(--button-size, auto));
}

.has-badge {
  position: relative;

  .badge {
    position: absolute;
    inset: var(--badge-top) var(--badge-right) var(--badge-bottom)
      var(--badge-left);
    min-width: var(--badge-size);
    height: var(--badge-size);
    border-radius: calc(var(--badge-size, 0) / 2);
    background: var(--badge-color, #f34a3f);
    color: var(--badge-text-color, #fff);
  }

  .badge--dot {
    --badge-top: var(--badge-dot-top, 1px);
    --badge-right: 0;
    --badge-size: var(--badge-dot-size, 4px);
  }

  .badge--text {
    --badge-top: 0;
    --badge-left: 50%;
    --badge-size: var(--badge-text-size, 18px);

    transform: translateX(2px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding-inline: 1px;
    font-weight: 600;
    font-size: 11px;
    line-height: 1;
    letter-spacing: -0.01em;
  }
}

.button__label {
  white-space: var(--button-label-wrap, nowrap);
  color: var(--button-label-color, currentColor);
}

.button__icon {
  display: var(--icon-display);
  vertical-align: middle;
  width: var(--icon-width, var(--icon-size, auto));
  height: var(--icon-height, var(--icon-size, 1em));
  color: var(--icon-color, currentColor);
  transform: var(--icon-transform, none);
}

.wrap {
  --button-display: inline-block;
  --button-label-wrap: normal;
  --icon-display: inline-block;

  text-align: start;
}

.button_style_grey,
.button_style_gray {
  --button-label-color: #777;
  --icon-color: #959595;
}
</style>
