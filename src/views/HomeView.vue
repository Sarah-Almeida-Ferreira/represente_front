<script setup lang="ts">
import ToastComponent from '@components/ToastComponent.vue';
import { computed } from 'vue';
import store from '@store';

const successMessage = computed(() => store.state.success);

//TODO: HomeView
</script>
<template>
  <ToastComponent
    :message="successMessage"
    type="success"
  />

  This is HomeView
</template>
