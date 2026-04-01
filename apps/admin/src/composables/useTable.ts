import { ref, reactive, computed } from "vue";

export interface TableState<T> {
  list: T[];
  total: number;
  page: number;
  pageSize: number;
  loading: boolean;
  keyword: string;
  filters: Record<string, any>;
}

export interface UseTableOptions<T> {
  fetchFn: (params: any) => Promise<{ data: { list: T[]; total: number } }>;
  immediate?: boolean;
  defaultPageSize?: number;
  defaultFilters?: Record<string, any>;
}

export function useTable<T = any>(options: UseTableOptions<T>) {
  const {
    fetchFn,
    immediate = true,
    defaultPageSize = 10,
    defaultFilters = {},
  } = options;

  const state = reactive<TableState<T>>({
    list: [],
    total: 0,
    page: 1,
    pageSize: defaultPageSize,
    loading: false,
    keyword: "",
    filters: { ...defaultFilters },
  });

  // Selected rows
  const selectedRows = ref<T[]>([]);
  const selectedRowKeys = ref<number[]>([]);

  // Pagination info
  const pagination = computed(() => ({
    page: state.page,
    pageSize: state.pageSize,
    total: state.total,
    totalPages: Math.ceil(state.total / state.pageSize),
  }));

  // Fetch data
  async function fetchData() {
    state.loading = true;

    try {
      const params = {
        page: state.page,
        pageSize: state.pageSize,
        keyword: state.keyword,
        ...state.filters,
      };

      const response = await fetchFn(params);
      state.list = response.data.list;
      state.total = response.data.total;
    } catch (error) {
      console.error("Fetch table data error:", error);
      state.list = [];
      state.total = 0;
    } finally {
      state.loading = false;
    }
  }

  // Page change
  function changePage(page: number) {
    state.page = page;
    fetchData();
  }

  // Page size change
  function changePageSize(pageSize: number) {
    state.pageSize = pageSize;
    state.page = 1;
    fetchData();
  }

  // Search
  function search(keyword: string) {
    state.keyword = keyword;
    state.page = 1;
    fetchData();
  }

  // Reset filters
  function resetFilters() {
    state.keyword = "";
    state.filters = { ...defaultFilters };
    state.page = 1;
    fetchData();
  }

  // Set filters
  function setFilters(filters: Record<string, any>) {
    state.filters = { ...state.filters, ...filters };
    state.page = 1;
    fetchData();
  }

  // Refresh current page
  function refresh() {
    fetchData();
  }

  // Selection handlers
  function handleSelectionChange(rows: T[]) {
    selectedRows.value = rows;
  }

  function handleSelectAll(selected: boolean, rows: T[]) {
    selectedRows.value = selected ? rows : [];
  }

  function clearSelection() {
    selectedRows.value = [];
    selectedRowKeys.value = [];
  }

  // Initial fetch
  if (immediate) {
    fetchData();
  }

  return {
    state,
    pagination,
    selectedRows,
    selectedRowKeys,
    fetchData,
    changePage,
    changePageSize,
    search,
    resetFilters,
    setFilters,
    refresh,
    handleSelectionChange,
    handleSelectAll,
    clearSelection,
  };
}
