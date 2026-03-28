<script setup lang="ts">
const props = defineProps<{
  code?: string;
  language?: string;
  filename?: string;
}>();

const copied = ref(false);

async function copyCode() {
  const pre = document.querySelector(".code-block pre");
  const text = pre?.textContent || props.code || "";
  await navigator.clipboard.writeText(text);
  copied.value = true;
  setTimeout(() => {
    copied.value = false;
  }, 2000);
}
</script>

<template>
  <div
    class="code-block group my-6 rounded-lg overflow-hidden border border-slate-700/50 bg-[#161b22]"
  >
    <div
      class="flex items-center justify-between px-4 py-2 border-b border-slate-700/50 bg-[#1c2128]"
    >
      <span v-if="language" class="text-xs text-slate-400 font-mono">{{
        language
      }}</span>
      <span v-else class="text-xs text-slate-500">plaintext</span>
      <button
        class="flex items-center gap-1.5 px-2 py-1 rounded text-xs text-slate-400 hover:text-slate-200 hover:bg-slate-700/50 transition-all"
        @click="copyCode"
      >
        <svg
          v-if="!copied"
          xmlns="http://www.w3.org/2000/svg"
          class="h-3.5 w-3.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="h-3.5 w-3.5 text-emerald-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
        {{ copied ? "已复制" : "复制" }}
      </button>
    </div>
    <div class="overflow-x-auto">
      <slot />
    </div>
  </div>
</template>

<style>
.code-block pre {
  margin: 0 !important;
  padding: 1rem 1.25rem !important;
  background: #161b22 !important;
  border-radius: 0 !important;
  font-size: 0.875rem !important;
  line-height: 1.7 !important;
}

.code-block pre code {
  background: transparent !important;
  border: none !important;
  padding: 0 !important;
  font-size: inherit !important;
}
</style>
