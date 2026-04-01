<script setup lang="ts">
import { computed } from "vue";
import { ChevronDown } from "lucide-vue-next";
import { cn } from "@/lib/utils";

interface Option {
  label: string;
  value: string | number;
  disabled?: boolean;
}

interface Props {
  modelValue?: string | number | null;
  options: Option[];
  placeholder?: string;
  disabled?: boolean;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: "请选择",
  disabled: false,
});

const emit = defineEmits<{
  "update:modelValue": [value: string | number | null];
}>();

const classes = computed(() => {
  return cn(
    "flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
    props.class,
  );
});

function handleChange(event: Event) {
  const target = event.target as HTMLSelectElement;
  const value = target.value;
  emit("update:modelValue", value === "" ? null : value);
}
</script>

<template>
  <select
    :value="modelValue ?? ''"
    :disabled="disabled"
    :class="classes"
    @change="handleChange"
  >
    <option value="" disabled>{{ placeholder }}</option>
    <option
      v-for="option in options"
      :key="option.value"
      :value="option.value"
      :disabled="option.disabled"
    >
      {{ option.label }}
    </option>
  </select>
</template>
