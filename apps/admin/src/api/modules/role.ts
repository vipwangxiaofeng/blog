import { http } from "../request";
import type { Role, RoleFormData, PaginatedResponse } from "@/types/api";

export interface RoleQueryParams {
  page?: number;
  pageSize?: number;
  keyword?: string;
  status?: string;
}

export const roleApi = {
  // Get role list with pagination
  getList(params: RoleQueryParams) {
    return http.get<PaginatedResponse<Role>>("/role/list", params);
  },

  // Get all roles (no pagination)
  getAll() {
    return http.get<Role[]>("/role/all");
  },

  // Get role by id
  getById(id: number) {
    return http.get<Role>(`/role/${id}`);
  },

  // Create role
  create(data: RoleFormData) {
    return http.post<Role>("/role", data);
  },

  // Update role
  update(id: number, data: RoleFormData) {
    return http.put<Role>(`/role/${id}`, data);
  },

  // Delete role
  delete(id: number) {
    return http.delete(`/role/${id}`);
  },

  // Update role permissions
  updatePermissions(id: number, permissions: string[]) {
    return http.put(`/role/${id}/permissions`, { permissions });
  },
};

export default roleApi;
