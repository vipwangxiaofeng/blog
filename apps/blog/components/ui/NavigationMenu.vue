<script setup lang="ts">
import { cn } from '~/lib/utils'
import { type HTMLAttributes } from 'vue'

interface Props extends /* @vue-ignore */ HTMLAttributes {}

const props = defineProps<Props>()
</script>

<template>
  <nav :class="cn('flex items-center space-x-4 lg:space-x-6', props.class)">
    <slot />
  </nav>
</template>
