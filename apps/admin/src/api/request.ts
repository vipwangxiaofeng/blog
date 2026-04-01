import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import type { ApiResponse, RequestConfig } from "@/types/api";

// Environment configuration
const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

// Create axios instance
const instance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Get token from storage
    const token = localStorage.getItem("access_token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error) => {
    const { response } = error;

    if (response) {
      switch (response.status) {
        case 401:
          // Token expired, try to refresh
          localStorage.removeItem("access_token");
          window.location.href = "/login";
          break;
        case 403:
          console.error("Access denied");
          break;
        case 404:
          console.error("Resource not found");
          break;
        case 500:
          console.error("Server error");
          break;
        default:
          console.error("Unknown error");
      }
    }

    return Promise.reject(error);
  },
);

// Mock request handler
async function mockRequest<T>(config: RequestConfig): Promise<ApiResponse<T>> {
  const { url, method = "GET", data, params } = config;

  // Simulate network delay
  await new Promise((resolve) =>
    setTimeout(resolve, 300 + Math.random() * 500),
  );

  // Mock data mappings
  const mockMappings: Record<string, () => Promise<any>> = {
    "/auth/login": async () => {
      const { default: authMock } = await import("./mock/auth.ts");
      return authMock;
    },
    "/user/list": async () => {
      const { getUserList } = await import("./mock/user.ts");
      return getUserList(params);
    },
    "/role/list": async () => {
      const { getRoleList } = await import("./mock/role.ts");
      return getRoleList(params);
    },
    "/menu/tree": async () => {
      const { getMenuTree } = await import("./mock/menu.ts");
      return getMenuTree();
    },
    "/dashboard/stats": async () => {
      const { dashboardStats } = await import("./mock/dashboard.ts");
      return dashboardStats;
    },
    "/dashboard/activities": async () => {
      const { recentActivities } = await import("./mock/dashboard.ts");
      return recentActivities;
    },
  };

  // Find matching mock handler
  const mockHandler = mockMappings[url];

  if (mockHandler) {
    try {
      const mockData = await mockHandler();

      // Handle different HTTP methods
      if (method === "POST" || method === "PUT") {
        return {
          code: 200,
          message: "success",
          data: { ...data, ...mockData, id: Date.now() } as T,
        };
      }

      return {
        code: 200,
        message: "success",
        data: mockData as T,
      };
    } catch (error) {
      console.error(`Mock handler error for ${url}:`, error);
    }
  }

  // Default response
  return {
    code: 200,
    message: "success",
    data: null as T,
  };
}

// Request wrapper
export async function request<T = any>(
  config: RequestConfig,
): Promise<ApiResponse<T>> {
  // Use mock if enabled
  if (USE_MOCK) {
    return mockRequest<T>(config);
  }

  // Use real API
  try {
    const response = await instance.request<ApiResponse<T>>({
      url: config.url,
      method: config.method || "GET",
      data: config.data,
      params: config.params,
      headers: config.headers,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Convenience methods
export const http = {
  get<T = any>(
    url: string,
    params?: any,
    config?: RequestConfig,
  ): Promise<ApiResponse<T>> {
    return request<T>({ url, method: "GET", params, ...config });
  },

  post<T = any>(
    url: string,
    data?: any,
    config?: RequestConfig,
  ): Promise<ApiResponse<T>> {
    return request<T>({ url, method: "POST", data, ...config });
  },

  put<T = any>(
    url: string,
    data?: any,
    config?: RequestConfig,
  ): Promise<ApiResponse<T>> {
    return request<T>({ url, method: "PUT", data, ...config });
  },

  delete<T = any>(
    url: string,
    config?: RequestConfig,
  ): Promise<ApiResponse<T>> {
    return request<T>({ url, method: "DELETE", ...config });
  },
};

export default http;
