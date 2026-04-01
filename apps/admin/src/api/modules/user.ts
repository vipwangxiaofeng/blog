import { http } from "../request";
import type {
  UserInfo,
  UserQueryParams,
  UserFormData,
  PaginatedResponse,
} from "@/types/api";

export const userApi = {
  // Get user list with pagination
  getList(params: UserQueryParams) {
    return http.get<PaginatedResponse<UserInfo>>("/user/list", params);
  },

  // Get user by id
  getById(id: number) {
    return http.get<UserInfo>(`/user/${id}`);
  },

  // Create user
  create(data: UserFormData) {
    return http.post<UserInfo>("/user", data);
  },

  // Update user
  update(id: number, data: UserFormData) {
    return http.put<UserInfo>(`/user/${id}`, data);
  },

  // Delete user
  delete(id: number) {
    return http.delete(`/user/${id}`);
  },

  // Batch delete users
  batchDelete(ids: number[]) {
    return http.post("/user/batch-delete", { ids });
  },

  // Update user status
  updateStatus(id: number, status: "active" | "inactive") {
    return http.put(`/user/${id}/status`, { status });
  },

  // Reset password
  resetPassword(id: number) {
    return http.post(`/user/${id}/reset-password`);
  },

  // Assign roles to user
  assignRoles(id: number, roleIds: number[]) {
    return http.post(`/user/${id}/roles`, { roleIds });
  },

  // Export users
  export(params: UserQueryParams) {
    return http.get<Blob>("/user/export", params, {
      responseType: "blob",
    });
  },

  // Import users
  import(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    return http.post("/user/import", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

export default userApi;
