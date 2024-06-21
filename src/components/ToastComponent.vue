<script setup lang="ts">
import { watch, ref, computed } from 'vue';
import { ColorType } from '@types/color.types';

const props = withDefaults(
  defineProps<{
    type: ColorType;
    timeout?: number;
    message: string;
  }>(),
  {
    timeout: 10000
  }
);

const show = ref(false);
const timeoutInstance = ref();

const message = computed(() => props.message);

const close = () => {
  show.value = false;
};

const initialize = (newValue: string) => {
  if (newValue) {
    show.value = true;
    timeoutInstance.value = setTimeout(close, props.timeout);
  } else {
    clearTimeout(timeoutInstance.value);
  }
};

watch(message, initialize);
</script>

<template>
  <Transition>
    <div
      v-if="show && !!message"
      :class="`toast-${type} p-2 rounded opacity-70 flex justify-between`"
    >
      {{ message }}
      <button
        class="ml-2 hover:text-[white]"
        @click="close"
      >
        <i class="fa-solid fa-circle-xmark" />
      </button>
    </div>
  </Transition>
</template>
