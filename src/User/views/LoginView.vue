<script setup lang="ts">
import ButtonComponent from "@/components/buttons/ButtonComponent.vue";
import ToastComponent from "@/components/toasts/ToastComponent.vue";
import { validateEmail } from "@/validations/email.validation.ts";
import InputComponent from "@/components/form/InputComponent.vue";
import { stages } from "../constants/login.constants.ts";
import { computed, ref, watch, onMounted } from "vue";
import store from "@/store";

const email = ref({
  content: "",
  error: "",
});
const password = ref({
  content: "",
  error: "",
});
const confirmationCode = ref({
  content: "",
  error: "",
});
const loading = ref(false);

const stage = computed(() => store.state.stage);
const errorMessage = computed(() => store.state.error);
const isEmailStage = computed(() => stage.value === stages.EMAIL);
const isLoginStage = computed(() => stage.value === stages.LOGIN);
const isConfirmationStage = computed(
  () => stage.value === stages.CONFIRMATION_CODE
);
const isPasswordStage = computed(
  () => isLoginStage.value || stage.value === stages.REGISTER
);

const toggleLoading = () => {
  loading.value = !loading.value;
};

const previousStage = () => {
  store.commit("setStage", -1);
};

const nextStage = async (e: Event) => {
  e.preventDefault();
  toggleLoading();
  if (isEmailStage.value) await checkUser();
  else if (isPasswordStage.value) await checkPassword();
  else if (isConfirmationStage.value) await checkConfirmationCode();
  toggleLoading();
};

const validateUserEmail = () => {
  try {
    email.value.error = validateEmail(email.value?.content);
  } catch (error: any) {
    email.value.error = error.message;
  }
};

const checkConfirmationCode = async () => {
  if (confirmationCode.value?.content) {
    const user = {
      userEmail: email.value?.content,
      confirmationCode: confirmationCode.value?.content,
    };
    await store.dispatch("confirmUserRegistration", user);
  }
};

const checkPassword = async () => {
  if (password.value?.content) {
    const action = isLoginStage.value ? "login" : "signUp";
    const user = {
      email: email.value?.content,
      password: password.value?.content,
    };
    await store.dispatch(action, user);
  }
};

const checkUser = async () => {
  validateUserEmail();
  await store.dispatch("getUserSituation", email.value?.content);
};

const focusInput = () => {
  setTimeout(() => {
    const id = isConfirmationStage.value
      ? "codeInput"
      : isPasswordStage.value
      ? "passwordInput"
      : "emailInput";
    const input = document.getElementById(id);
    input?.focus();
  }, 50);
};

watch(stage, focusInput);

onMounted(focusInput);
</script>

<template>
  <div class="border border-secondary rounded p-5">
    <img src="@/assets/Logo.png" class="h-20 mb-10" />
    <ToastComponent :message="errorMessage" type="danger" />
    <form class="py-4" @submit="nextStage" id="login">
      <InputComponent
        required
        v-show="isEmailStage"
        v-model="email.content"
        type="email"
        autocomplete="true"
        placeholder="E-mail"
        class="mb-5"
        inputId="emailInput"
        @input="validateUserEmail"
        :error="email.error"
      />
      <InputComponent
        required
        v-if="isPasswordStage"
        v-model="password.content"
        type="password"
        placeholder="Senha"
        class="mb-5"
        inputId="passwordInput"
        :error="password.error"
      />
      <InputComponent
        required
        v-if="isConfirmationStage"
        v-model="confirmationCode.content"
        type="text"
        placeholder="Código de confirmação"
        class="mb-5"
        inputId="codeInput"
        :maxLength="6"
        :error="confirmationCode.error"
      />
    </form>

    <ButtonComponent
      isFull
      title="Continuar"
      colorType="primary"
      form="login"
      type="submit"
      :loading="loading"
    />

    <ButtonComponent
      isFull
      v-if="!isEmailStage"
      title="Voltar"
      colorType="secondary"
      type="button"
      class="my-5"
      @click="previousStage"
    />

    <!-- TODO: continue with Google -->
    <!-- <section id="continue-with-google" v-if="isEmailStage && !loading">
      <p class="w-full text-center my-5">Ou</p>
      <ButtonComponent
        title="Continuar com Google"
        colorType="secondary"
        type="button"
        isFull
      >
        <i class="fa-brands fa-google absolute left-4"></i>
      </ButtonComponent>
    </section> -->
  </div>
</template>
