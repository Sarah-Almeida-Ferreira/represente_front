<script setup lang="ts">
import { withDefaults } from 'vue';
import { useInput } from '../composables/input.composable.ts';

const model = defineModel<string | number>();
const emit = defineEmits(['input']);
const props = withDefaults(
  defineProps<{
    type?: string;
    placeholder?: string;
    error?: string;
    required?: boolean;
    maxLength?: number | undefined;
    autocomplete?: string;
    inputId?: string;
  }>(),
  {
    type: 'text',
    placeholder: '',
    error: '',
    autocomplete: 'false',
    maxLength: undefined,
    inputId: 'inputComponentId'
  }
);

const {
  inputType,
  inputElement,
  isPassword,
  passwordIcon,
  toggleVisibility,
  handleInput
} = useInput(model, props, emit);
</script>

<template>
  <div class="relative">
    <input
      :id="inputId"
      ref="inputElement"
      v-model="model"
      data-test="input-field"
      class="rounded border-secondary border bg-dark h-10 w-full px-3 focus:outline-none focus:border-primary"
      :type="inputType"
      :placeholder="placeholder"
      :required="required"
      :autocomplete="autocomplete"
      :maxLength="maxLength"
      @input="() => handleInput()"
    >
    <button
      v-if="isPassword"
      data-test="toggle-visibility-button"
      class="absolute right-4 top-2 cursor-pointer"
      type="button"
      @click="toggleVisibility"
    >
      <i
        :class="`fa-solid ${passwordIcon}`"
        data-test="visibility-icon"
      />
    </button>
  </div>
</template>
