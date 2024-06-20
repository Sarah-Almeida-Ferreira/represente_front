import { ref, nextTick } from 'vue';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useInput } from '@/form/composables/input.composable';
import * as emailValidation from '@/validations/email.validation';

describe('useInput composable', () => {
  let model;
  let props;
  let emit;

  beforeEach(() => {
    model = ref('');
    props = {
      type: 'text',
      error: ''
    };
    emit = vi.fn();
  });

  it('should initialize correctly', () => {
    const { inputType, isEmail, isPassword, isInvalid, passwordIcon } =
      useInput(model, props, emit);

    expect(inputType.value).toBe('text');
    expect(isEmail.value).toBe(false);
    expect(isPassword.value).toBe(false);
    expect(isInvalid.value).toBe(false);
    expect(passwordIcon.value).toBe('fa-eye-slash');
  });

  it('should toggle visibility', () => {
    props.type = 'password';
    const { inputType, toggleVisibility, passwordIcon } = useInput(
      model,
      props,
      emit
    );

    expect(inputType.value).toBe('password');
    expect(passwordIcon.value).toBe('fa-eye');

    toggleVisibility();

    expect(inputType.value).toBe('text');
    expect(passwordIcon.value).toBe('fa-eye-slash');

    toggleVisibility();

    expect(inputType.value).toBe('password');
    expect(passwordIcon.value).toBe('fa-eye');
  });

  it('should set and clear error', async () => {
    const { setError, inputElement } = useInput(model, props, emit);
    inputElement.value = document.createElement('input');

    props.error = 'Test Error';
    setError();

    await nextTick();

    expect(inputElement.value.validationMessage).toBe('Test Error');

    props.error = '';
    setError();

    await nextTick();

    expect(inputElement.value.validationMessage).toBe('');
  });

  it('should sanitize email input', () => {
    props.type = 'email';
    model.value = ' TEST@EXAMPLE.COM ';

    const { handleInput } = useInput(model, props, emit);
    const emailMask = vi.spyOn(emailValidation, 'emailMask');

    handleInput();
    
    expect(emailMask).toHaveBeenCalledWith(' TEST@EXAMPLE.COM ');
  });

  it('should not sanitize email input when model.value is not string', () => {
    props.type = 'email';
    model.value = 123;

    const { handleInput } = useInput(model, props, emit);
    const emailMask = vi.spyOn(emailValidation, 'emailMask');

    handleInput();
    
    expect(emailMask).not.toHaveBeenCalled();
  });

  it('should emit input event', () => {
    const { handleInput } = useInput(model, props, emit);
    
    model.value = 'test';
    handleInput();
    
    expect(emit).toHaveBeenCalledWith('input', 'test');
  });

  it('should call setError with delay', () => {
    vi.useFakeTimers();
    
    const { handleInput, setError } = useInput(model, props, emit);
    const setErrorSpy = vi.spyOn(setError, 'apply');

    handleInput();
    vi.advanceTimersByTime(50);

    expect(setErrorSpy).toHaveBeenCalled();
    vi.useRealTimers();
  });
});
