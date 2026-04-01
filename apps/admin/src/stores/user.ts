import { ref } from "vue";
import { defineStore } from "pinia";
import type { UserInfo, UserQueryParams, UserFormData } from "@/types/api";
import userApi from "@/api/modules/user";

export const useUserStore = defineStore("user", () => {
  const userList = ref<UserInfo[]>([]);
  const total = ref(0);
  const loading = ref(false);
  const currentUser = ref<UserInfo | null>(null);

  // Fetch user list
  async function fetchUserList(params: UserQueryParams = {}) {
    loading.value = true;
    try {
      const response = await userApi.getList(params);
      userList.value = response.data.list;
      total.value = response.data.total;
      return response.data;
    } catch (error) {
      console.error("Fetch user list error:", error);
      throw error;
    } finally {
      loading.value = false;
    }
  }

  // Fetch user by id
  async function fetchUserById(id: number) {
    try {
      const response = await userApi.getById(id);
      currentUser.value = response.data;
      return response.data;
    } catch (error) {
      console.error("Fetch user error:", error);
      throw error;
    }
  }

  // Create user
  async function createUser(data: UserFormData) {
    try {
      const response = await userApi.create(data);
      return response.data;
    } catch (error) {
      console.error("Create user error:", error);
      throw error;
    }
  }

  // Update user
  async function updateUser(id: number, data: UserFormData) {
    try {
      const response = await userApi.update(id, data);
      return response.data;
    } catch (error) {
      console.error("Update user error:", error);
      throw error;
    }
  }

  // Delete user
  async function deleteUser(id: number) {
    try {
      await userApi.delete(id);
      userList.value = userList.value.filter((u) => u.id !== id);
    } catch (error) {
      console.error("Delete user error:", error);
      throw error;
    }
  }

  // Batch delete users
  async function batchDeleteUsers(ids: number[]) {
    try {
      await userApi.batchDelete(ids);
      userList.value = userList.value.filter((u) => !ids.includes(u.id));
    } catch (error) {
      console.error("Batch delete users error:", error);
      throw error;
    }
  }

  return {
    userList,
    total,
    loading,
    currentUser,
    fetchUserList,
    fetchUserById,
    createUser,
    updateUser,
    deleteUser,
    batchDeleteUsers,
  };
});
