import { ref, computed, watch } from 'vue';
import { emailMask } from '@/validations/email.validation';

export function useInput(model, props, emit) {
  const inputType = ref(props.type);
  const inputElement = ref<HTMLInputElement>();

  const isEmail = computed(() => props.type === 'email');
  const isPassword = computed(() => props.type === 'password');
  const isInvalid = computed(() => !!props.error?.length);
  const passwordIcon = computed(() =>
    inputType.value === 'password' ? 'fa-eye' : 'fa-eye-slash'
  );

  const toggleVisibility = () => {
    inputType.value = inputType.value === 'password' ? 'text' : 'password';
  };

  const setError = () => {
    if (props.error) {
      inputElement.value?.setCustomValidity(props.error);
      inputElement.value?.reportValidity();
    } else {
      inputElement.value?.setCustomValidity('');
    }
  };

  const sanitizeEmail = () => {
    if (typeof model.value === 'string') model.value = emailMask(model.value);
  };

  const handleInput = () => {
    if (isEmail.value) sanitizeEmail();
    emit('input', model.value);
    setTimeout(setError, 50);
  };

  watch(isInvalid, setError);

  return {
    inputType,
    inputElement,
    isEmail,
    isPassword,
    isInvalid,
    passwordIcon,
    toggleVisibility,
    handleInput,
    setError
  };
}
