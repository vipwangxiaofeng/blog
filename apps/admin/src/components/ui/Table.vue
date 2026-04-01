<script setup lang="ts">
import { cn } from "@/lib/utils";

interface Column {
  key: string;
  title: string;
  width?: string | number;
  align?: "left" | "center" | "right";
  sortable?: boolean;
}

interface Props {
  columns: Column[];
  data: any[];
  loading?: boolean;
  bordered?: boolean;
  striped?: boolean;
  hoverable?: boolean;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  bordered: false,
  striped: false,
  hoverable: true,
});

const emit = defineEmits<{
  rowClick: [row: any, index: number];
}>();

function handleRowClick(row: any, index: number) {
  emit("rowClick", row, index);
}
</script>

<template>
  <div :class="cn('relative w-full overflow-auto', props.class)">
    <table class="w-full caption-bottom text-sm">
      <!-- Header -->
      <thead class="[&_tr]:border-b">
        <tr class="border-b transition-colors hover:bg-muted/50">
          <th
            v-for="column in columns"
            :key="column.key"
            :class="
              cn(
                'h-10 px-4 text-left align-middle font-medium text-muted-foreground',
                column.align === 'center' && 'text-center',
                column.align === 'right' && 'text-right',
                bordered && 'border',
              )
            "
            :style="
              column.width
                ? {
                    width:
                      typeof column.width === 'number'
                        ? `${column.width}px`
                        : column.width,
                  }
                : {}
            "
          >
            {{ column.title }}
          </th>
        </tr>
      </thead>

      <!-- Body -->
      <tbody class="[&_tr:last-child]:border-0">
        <!-- Loading state -->
        <tr v-if="loading">
          <td
            :colspan="columns.length"
            class="h-24 text-center text-muted-foreground"
          >
            <div class="flex items-center justify-center gap-2">
              <svg
                class="h-5 w-5 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                />
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              加载中...
            </div>
          </td>
        </tr>

        <!-- Empty state -->
        <tr v-else-if="data.length === 0">
          <td
            :colspan="columns.length"
            class="h-24 text-center text-muted-foreground"
          >
            暂无数据
          </td>
        </tr>

        <!-- Data rows -->
        <tr
          v-else
          v-for="(row, index) in data"
          :key="index"
          :class="
            cn(
              'border-b transition-colors',
              hoverable && 'hover:bg-muted/50',
              striped && index % 2 === 1 && 'bg-muted/50',
              bordered && 'border',
            )
          "
          @click="handleRowClick(row, index)"
        >
          <td
            v-for="column in columns"
            :key="column.key"
            :class="
              cn(
                'p-4 align-middle',
                column.align === 'center' && 'text-center',
                column.align === 'right' && 'text-right',
                bordered && 'border',
              )
            "
          >
            <slot :name="column.key" :row="row" :index="index">
              {{ row[column.key] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
