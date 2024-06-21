import ButtonComponent from '@components/ButtonComponent.vue';
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

const buttonDataTest = '[data-test="button-component"]';
const spinnerDataTest = '[data-test="button-component-spinner-gif"]';

describe('Button Component', () => {
  it('renders button correctly', async () => {
    const wrapper = mount(ButtonComponent, {
      props: {
        type: 'button',
        title: 'Submit',
        isFull: false,
        colorType: 'primary',
        loading: false,
        disabled: false
      }
    });
    const button = wrapper.find(buttonDataTest);

    expect(button.exists()).toBe(true);
    expect(button.text()).toBe('Submit');
  });

  it('enables button when not loading', async () => {
    const wrapper = mount(ButtonComponent, {
      props: {
        type: 'button',
        title: 'Submit',
        isFull: false,
        colorType: 'primary',
        loading: false,
        disabled: false
      }
    });
    const button = wrapper.find(buttonDataTest);

    expect(button.attributes('disabled')).toBeUndefined();
  });

  it('disables button when loading', async () => {
    const wrapper = mount(ButtonComponent, {
      props: {
        type: 'button',
        title: 'Submit',
        isFull: false,
        colorType: 'primary',
        loading: true,
        disabled: false
      }
    });
    const button = wrapper.find(buttonDataTest);

    expect(button.attributes('disabled')).toBeDefined();
  });

  it('shows loading spinner when loading and has spinnerGif', async () => {
    const wrapper = mount(ButtonComponent, {
      props: {
        type: 'button',
        title: 'Submit',
        isFull: false,
        colorType: 'secondary',
        loading: true,
        disabled: false
      }
    });
    const img = wrapper.find(spinnerDataTest);

    expect(img.exists()).toBe(true);
    expect(img.attributes('alt')).toBe('Gif carregando');
  });

  it('doesn\'t show loading spinner when loading and hasn\'t spinnerGif', async () => {
    const wrapper = mount(ButtonComponent, {
      props: {
        type: 'button',
        title: 'Submit',
        isFull: false,
        colorType: 'success',
        loading: true,
        disabled: false
      }
    });
    const img = wrapper.find(spinnerDataTest);

    expect(img.exists()).toBe(false);
  });
});
