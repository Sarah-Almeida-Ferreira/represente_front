import InputComponent from '@/form/components/InputComponent.vue';
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

const inputDataTest = '[data-test="input-field"]';
const toggleVisbilityDataTest = '[data-test="toggle-visibility-button"]';
const visbilityIconDataTest = '[data-test="visibility-icon"]';

describe('Input Component', () => {
  it('renders input field correctly', async () => {
    const wrapper = mount(InputComponent);
    const input = wrapper.find(inputDataTest);
    const inputClasses = input.classes();

    expect(input.exists()).toBe(true);

    expect(inputClasses).toContain('rounded');
    expect(inputClasses).toContain('border-secondary');
    expect(inputClasses).toContain('border');
    expect(inputClasses).toContain('bg-dark');
    expect(inputClasses).toContain('h-10');
    expect(inputClasses).toContain('w-full');
    expect(inputClasses).toContain('px-3');
    expect(inputClasses).toContain('focus:outline-none');
    expect(inputClasses).toContain('focus:border-primary');

    expect(input.attributes('type')).toBe('text');
    expect(input.attributes('placeholder')).toBe('');
    expect(input.attributes('required')).toBeUndefined();
    expect(input.attributes('autocomplete')).toBe('false');
    expect(input.attributes('maxLength')).toBeUndefined();
  });

  it('calls handleInput when input value is changed', async () => {
    const wrapper = mount(InputComponent, {
      props: {
        type: 'email',
        modelValue: 'testemail@example'
      }
    });
    const input = wrapper.find(inputDataTest);
    const handleInput = vi.spyOn(wrapper.vm, 'handleInput');

    expect(wrapper.vm.model).toBe('testemail@example');

    await input.setValue('testemail@example.com');

    expect(wrapper.vm.model).toBe('testemail@example.com');
    expect(handleInput).toHaveBeenCalledTimes(1);
  });

  describe('Password', () => {
    it('toggles password visibility when type is password', async () => {
      const wrapper = mount(InputComponent, {
        props: {
          type: 'password'
        }
      });
      const visibilityIcon = wrapper.find(visbilityIconDataTest);
      const visibilityButton = wrapper.find(toggleVisbilityDataTest);
      const input = wrapper.find(inputDataTest);

      expect(visibilityIcon.classes()).toContain('fa-eye');

      await visibilityButton.trigger('click');

      expect(input.attributes('type')).toBe('text');
      expect(visibilityIcon.classes()).toContain('fa-eye-slash');

      await visibilityButton.trigger('click');

      expect(input.attributes('type')).toBe('password');
      expect(visibilityIcon.classes()).toContain('fa-eye');
    });
  });
});
