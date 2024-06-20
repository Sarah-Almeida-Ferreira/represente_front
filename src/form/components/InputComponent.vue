<script setup lang="ts">
import { withDefaults } from 'vue';
import { useInput } from '../composables/input.composable.ts';

const model = defineModel();
const emit = defineEmits(['input']);
const props = withDefaults(
  defineProps<{
    type?: string;
    placeholder?: string;
    error?: string;
    required?: boolean;
    maxLength?: number;
    autocomplete?: string;
    inputId?: string;
  }>(),
  {
    type: 'text',
    placeholder: '',
    error: '',
    autocomplete: 'false',
  }
);

const {
  inputType,
  inputElement,
  isEmail,
  isPassword,
  isInvalid,
  passwordIcon,
  toggleVisibility,
  handleInput,
} = useInput(model, props, emit);
</script>

<template>
  <div class="relative">
    <input
      v-model="model"
      ref="inputElement"
      data-test="input-field"
      class="rounded border-secondary border bg-dark h-10 w-full px-3 focus:outline-none focus:border-primary"
      :id="inputId"
      :type="inputType"
      :placeholder="placeholder"
      :required="required"
      :autocomplete="autocomplete"
      :maxLength="maxLength"
      @input="() => handleInput()"
    />
    <button
      v-if="isPassword"
      @click="toggleVisibility"
      data-test="toggle-visibility-button"
      class="absolute right-4 top-2 cursor-pointer"
      type="button"
    >
      <i :class="`fa-solid ${passwordIcon}`" data-test="visibility-icon"></i>
    </button>
  </div>
</template>
