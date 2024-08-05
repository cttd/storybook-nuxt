<template>
  <component
    :is="buttonOrLink"
    :type="buttonType"
    :to="to"
    :href="href"
    :disabled="!isLink && disabled"
    :aria-disabled="isLink && disabled ? 'true' : undefined"
    :tabindex="isLink && disabled ? -1 : undefined"
    :aria-pressed="pressedValue"
    ><slot
  /></component>
</template>

<script setup>
const props = defineProps({
  type: {
    type: String,
    default: "button",
  },
  to: {
    type: [String, Object],
    default: undefined,
  },
  href: {
    type: String,
    default: undefined,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  pressed: {
    type: [Boolean, String],
    default: undefined,
    validator: (value) =>
      typeof value === "boolean" ||
      value === undefined ||
      ["true", "false", "mixed"].includes(value),
  },
});
const isLink = computed(() => !!(props.to || props.href));
const buttonOrLink = computed(() =>
  isLink.value ? resolveComponent("NuxtLink") : "button",
);
const buttonType = computed(() => (!isLink.value ? props.type : undefined));
const pressedValue = computed(() => {
  if (typeof props.pressed === "boolean") {
    return props.pressed.toString();
  }
  if (typeof props.pressed === "string") {
    return props.pressed;
  }
});
</script>
