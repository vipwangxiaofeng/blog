<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    code?: string
  }>(),
  {
    code: '',
  }
)

const copied = ref(false)
const codeElement = ref<HTMLElement | null>(null)

async function copyCode() {
  const text = codeElement.value?.textContent || props.code
  await navigator.clipboard.writeText(text)
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 2000)
}
</script>

<template>
  <div class="code-block group my-6 rounded-xl overflow-hidden border border-border/50 bg-[#0d1117]">
    <div class="flex items-center justify-end px-4 py-2 border-b border-white/10 bg-white/5">
      <button
        class="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs text-gray-400 hover:text-white hover:bg-white/10 transition-all"
        @click="copyCode"
      >
        <svg v-if="!copied" xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        {{ copied ? '已复制' : '复制' }}
      </button>
    </div>
    <div ref="codeElement" class="overflow-x-auto">
      <slot />
    </div>
  </div>
</template>

<style>
.code-block pre {
  margin: 0 !important;
  padding: 1rem !important;
  background: transparent !important;
  border-radius: 0 !important;
}

.code-block code {
  background: transparent !important;
  border: none !important;
  padding: 0 !important;
}
</style>
