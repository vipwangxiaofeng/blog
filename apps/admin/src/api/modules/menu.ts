import { http } from "../request";
import type { MenuItem, MenuFormData } from "@/types/api";

export const menuApi = {
  // Get menu tree
  getTree() {
    return http.get<MenuItem[]>("/menu/tree");
  },

  // Get menu by id
  getById(id: number) {
    return http.get<MenuItem>(`/menu/${id}`);
  },

  // Create menu
  create(data: MenuFormData) {
    return http.post<MenuItem>("/menu", data);
  },

  // Update menu
  update(id: number, data: MenuFormData) {
    return http.put<MenuItem>(`/menu/${id}`, data);
  },

  // Delete menu
  delete(id: number) {
    return http.delete(`/menu/${id}`);
  },

  // Update menu sort
  updateSort(id: number, sort: number) {
    return http.put(`/menu/${id}/sort`, { sort });
  },
};

export default menuApi;
