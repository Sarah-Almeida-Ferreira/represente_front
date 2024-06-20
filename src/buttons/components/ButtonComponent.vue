<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  type: ButtonType;
  title: string;
  isFull: boolean;
  colorType: ColorType;
  loading?: boolean;
  disabled?: boolean;
}>();

const classes = {
  primary: "bg-primary",
  secondary: "border border-primary text-primary bg-transparent",
  danger: 'bg-danger',
  warning: 'bg-warning',
  info: 'bg-info',
  success: 'bg-success',
};

const spinnerGif = computed(() => {
  const BASE_SRC = "src/assets/";
  switch (props.colorType) {
    case "primary":
      return BASE_SRC + "secondarySpinner.gif";
    case "secondary":
      return BASE_SRC + "spinner.gif";
    default:
      return "";
  }
});
const buttonTitle = computed(() =>
  props.loading ? "Carregando" : props.title
);
</script>

<template>
  <button
    :type="type"
    :title="title"
    :class="{
      [`btn ${classes[colorType]}`]: true,
      'w-full': isFull,
    }"
    :disabled="disabled || loading"
    data-test="button-component"
  >
    <slot></slot>
    <img
      class="absolute left-4 h-10"
      :src="spinnerGif"
      alt="Gif carregando"
      data-test="button-component-spinner-gif"
      v-if="loading && !!spinnerGif"
    />
    {{ buttonTitle }}
  </button>
</template>
