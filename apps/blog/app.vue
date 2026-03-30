<script setup lang="ts">
// 处理 GitHub Pages SPA 路由回退
if (import.meta.client) {
  const redirect = sessionStorage.getItem("gh-pages-redirect");
  if (redirect) {
    sessionStorage.removeItem("gh-pages-redirect");
    navigateTo(redirect);
  }
}
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
