import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import ToastComponent from '@components/ToastComponent.vue';

const toastContainerDataTest = '[data-test="toast-component-container"]';

const mountToastComponent = async (props) => {
  const wrapper = mount(ToastComponent, {
    props,
  });

  wrapper.vm.show = true;
  await wrapper.vm.$nextTick();
  return wrapper;
};

describe('ToastComponent', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  it('renders the message when it is provided', async () => {
    const wrapper = await mountToastComponent({
      type: 'success',
      message: 'Test message',
    });

    expect(wrapper.text()).toContain('Test message');
    expect(wrapper.find(toastContainerDataTest).isVisible()).toBe(true);
  });

  it('closes the toast after the specified timeout', async () => {
    const wrapper = await mountToastComponent({
      message: '',
      type: 'success',
      timeout: 5000,
    });

    wrapper.setProps({ message: 'New message' });
    await wrapper.vm.$nextTick();

    expect(wrapper.find(toastContainerDataTest).isVisible()).toBe(true);

    await vi.advanceTimersByTime(5000);
    await wrapper.vm.$nextTick();

    expect(wrapper.find(toastContainerDataTest).exists()).toBe(false);
  });

  it('closes the toast when the close button is clicked', async () => {
    const wrapper = await mountToastComponent({
      type: 'success',
      message: 'Test message',
    });

    expect(wrapper.find(toastContainerDataTest).isVisible()).toBe(true);

    await wrapper.find('[data-test="toast-component-close-button"]').trigger('click');

    expect(wrapper.find(toastContainerDataTest).exists()).toBe(false);
  });

  it('reopens the toast when the message changes', async () => {
    const wrapper = await mountToastComponent({
      type: 'success',
      message: 'Initial message',
    });

    expect(wrapper.find(toastContainerDataTest).isVisible()).toBe(true);

    await wrapper.find('[data-test="toast-component-close-button"]').trigger('click');

    expect(wrapper.find(toastContainerDataTest).exists()).toBe(false);

    await wrapper.setProps({ message: 'New message' });

    expect(wrapper.find(toastContainerDataTest).isVisible()).toBe(true);
    expect(wrapper.text()).toContain('New message');
  });

  it('clears the timeout when the message is empty', async () => {
    const wrapper = await mountToastComponent({
      type: 'success',
      message: 'Test message',
      timeout: 5000,
    });

    expect(wrapper.find(toastContainerDataTest).isVisible()).toBe(true);

    await wrapper.setProps({ message: '' });

    vi.advanceTimersByTime(5000);

    expect(wrapper.find(toastContainerDataTest).exists()).toBe(false);
  });
});
