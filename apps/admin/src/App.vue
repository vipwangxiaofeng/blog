<script setup lang="ts">
import { RouterView } from "vue-router";
import { ToastContainer } from "@/components/ui";
import { useAppStore } from "@/stores/app";

const appStore = useAppStore();

// Initialize theme
appStore.initTheme();
</script>

<template>
  <RouterView />
  <ToastContainer />
</template>
