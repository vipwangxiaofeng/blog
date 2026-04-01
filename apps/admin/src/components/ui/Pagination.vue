<script setup lang="ts">
import { computed } from "vue";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-vue-next";
import { cn } from "@/lib/utils";
import Button from "./Button.vue";

interface Props {
  page: number;
  pageSize: number;
  total: number;
  showSizeChanger?: boolean;
  pageSizeOptions?: number[];
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  showSizeChanger: false,
  pageSizeOptions: () => [10, 20, 50, 100],
});

const emit = defineEmits<{
  "update:page": [page: number];
  "update:pageSize": [pageSize: number];
}>();

const totalPages = computed(() => Math.ceil(props.total / props.pageSize));

const visiblePages = computed(() => {
  const pages: (number | string)[] = [];
  const current = props.page;
  const total = totalPages.value;

  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
  } else {
    if (current <= 3) {
      pages.push(1, 2, 3, 4, "...", total);
    } else if (current >= total - 2) {
      pages.push(1, "...", total - 3, total - 2, total - 1, total);
    } else {
      pages.push(1, "...", current - 1, current, current + 1, "...", total);
    }
  }

  return pages;
});

function changePage(page: number) {
  if (page >= 1 && page <= totalPages.value && page !== props.page) {
    emit("update:page", page);
  }
}

function changePageSize(event: Event) {
  const target = event.target as HTMLSelectElement;
  emit("update:pageSize", Number(target.value));
  emit("update:page", 1);
}
</script>

<template>
  <div :class="cn('flex items-center justify-between px-2', props.class)">
    <!-- Info -->
    <div class="text-sm text-muted-foreground">
      共 <span class="font-medium">{{ total }}</span> 条
    </div>

    <!-- Pagination -->
    <div class="flex items-center gap-1">
      <!-- First page -->
      <Button
        variant="outline"
        size="icon"
        class="h-8 w-8"
        :disabled="page <= 1"
        @click="changePage(1)"
      >
        <ChevronsLeft class="h-4 w-4" />
      </Button>

      <!-- Previous page -->
      <Button
        variant="outline"
        size="icon"
        class="h-8 w-8"
        :disabled="page <= 1"
        @click="changePage(page - 1)"
      >
        <ChevronLeft class="h-4 w-4" />
      </Button>

      <!-- Page numbers -->
      <template v-for="(p, index) in visiblePages" :key="index">
        <span v-if="p === '...'" class="px-2 text-muted-foreground"> ... </span>
        <Button
          v-else
          variant="outline"
          size="icon"
          class="h-8 w-8"
          :class="{ 'bg-primary text-primary-foreground': p === page }"
          @click="changePage(p as number)"
        >
          {{ p }}
        </Button>
      </template>

      <!-- Next page -->
      <Button
        variant="outline"
        size="icon"
        class="h-8 w-8"
        :disabled="page >= totalPages"
        @click="changePage(page + 1)"
      >
        <ChevronRight class="h-4 w-4" />
      </Button>

      <!-- Last page -->
      <Button
        variant="outline"
        size="icon"
        class="h-8 w-8"
        :disabled="page >= totalPages"
        @click="changePage(totalPages)"
      >
        <ChevronsRight class="h-4 w-4" />
      </Button>

      <!-- Page size selector -->
      <select
        v-if="showSizeChanger"
        :value="pageSize"
        class="ml-2 h-8 rounded-md border border-input bg-background px-2 text-sm"
        @change="changePageSize"
      >
        <option v-for="size in pageSizeOptions" :key="size" :value="size">
          {{ size }} 条/页
        </option>
      </select>
    </div>
  </div>
</template>
