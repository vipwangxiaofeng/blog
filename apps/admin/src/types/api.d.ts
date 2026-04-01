import type { AxiosRequestConfig } from "axios";

// API Response Type
export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data: T;
}

// Pagination Response
export interface PaginatedResponse<T> {
  list: T[];
  total: number;
  page: number;
  pageSize: number;
}

// Request Config
export interface RequestConfig extends AxiosRequestConfig {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  data?: any;
  params?: any;
}

// Login Request
export interface LoginRequest {
  username: string;
  password: string;
  remember?: boolean;
}

// Login Response
export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  userInfo: UserInfo;
}

// User Info
export interface UserInfo {
  id: number;
  username: string;
  nickname: string;
  email: string;
  phone?: string;
  avatar?: string;
  roles: string[];
  permissions: string[];
  status: "active" | "inactive" | "banned";
  createdAt: string;
  updatedAt: string;
}

// User Query Params
export interface UserQueryParams {
  page?: number;
  pageSize?: number;
  keyword?: string;
  status?: string;
  roleId?: number;
}

// User Form Data
export interface UserFormData {
  id?: number;
  username: string;
  nickname: string;
  email: string;
  phone?: string;
  password?: string;
  roleIds: number[];
  status: "active" | "inactive";
}

// Role
export interface Role {
  id: number;
  name: string;
  code: string;
  description?: string;
  permissions: string[];
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
}

// Role Form Data
export interface RoleFormData {
  id?: number;
  name: string;
  code: string;
  description?: string;
  permissions: string[];
  status: "active" | "inactive";
}

// Menu
export interface MenuItem {
  id: number;
  parentId: number | null;
  name: string;
  path: string;
  component?: string;
  redirect?: string;
  icon?: string;
  title: string;
  sort: number;
  hidden: boolean;
  keepAlive: boolean;
  children?: MenuItem[];
}

// Menu Form Data
export interface MenuFormData {
  id?: number;
  parentId: number | null;
  name: string;
  path: string;
  component?: string;
  redirect?: string;
  icon?: string;
  title: string;
  sort: number;
  hidden: boolean;
  keepAlive: boolean;
}

// Permission
export interface Permission {
  id: number;
  parentId: number | null;
  name: string;
  code: string;
  type: "menu" | "button" | "api";
  description?: string;
  children?: Permission[];
}

// Dashboard Stats
export interface DashboardStats {
  totalUsers: number;
  totalRoles: number;
  totalMenus: number;
  todayVisits: number;
  userGrowth: number;
  roleGrowth: number;
  menuGrowth: number;
  visitGrowth: number;
}

// Chart Data
export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string;
    tension?: number;
  }[];
}

// Notification
export interface Notification {
  id: number;
  title: string;
  content: string;
  type: "info" | "success" | "warning" | "error";
  read: boolean;
  createdAt: string;
}
