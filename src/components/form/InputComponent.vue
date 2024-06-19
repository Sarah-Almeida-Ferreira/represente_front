<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { emailMask } from "@/validations/email.validation.ts";

const emit = defineEmits(["input"]);
const props = withDefaults(
  defineProps<{
    type?: InputType;
    placeholder?: string;
    error?: string;
    required?: boolean;
    maxLength?: number;
    autocomplete?: string;
    inputId?: string;
  }>(),
  {
    type: "text",
    placeholder: "",
    error: "",
    autocomplete: "false",
  }
);

const model = defineModel<string | number>();
const inputType = ref(props.type);
const inputElement = ref<HTMLInputElement>();

const isEmail = computed(() => props.type === "email");
const isPassword = computed(() => props.type === "password");
const isInvalid = computed(() => !!props.error?.length);
const passwordIcon = computed(() =>
  inputType.value === "password" ? "fa-eye" : "fa-eye-slash"
);

const toggleVisibility = () => {
  if (isPassword.value) {
    inputType.value = inputType.value === "password" ? "text" : "password";
  }
};
const setError = () => {
  if (props.error) {
    inputElement.value?.setCustomValidity(props.error);
    inputElement.value?.reportValidity();
  } else {
    inputElement.value?.setCustomValidity("");
  }
};
const sanitizeEmail = () => {
  if (typeof model.value === "string") model.value = emailMask(model.value);
};
const handleInput = () => {
  if (isEmail.value) sanitizeEmail();
  emit("input");
  setTimeout(setError, 50);
};

watch(isInvalid, setError);
</script>

<template>
  <div class="relative">
    <input
      v-model="model"
      ref="inputElement"
      class="rounded border-secondary border bg-dark h-10 w-full px-3 focus:outline-none focus:border-primary"
      :id="inputId"
      :type="inputType"
      :placeholder="placeholder"
      :required="required"
      :autocomplete="autocomplete"
      :maxLength="maxLength"
      @input="handleInput"
    />
    <button
      v-if="isPassword"
      @click="toggleVisibility"
      class="absolute right-4 top-2 cursor-pointer"
      type="button"
    >
      <i :class="`fa-solid ${passwordIcon}`"></i>
    </button>
  </div>
</template>
