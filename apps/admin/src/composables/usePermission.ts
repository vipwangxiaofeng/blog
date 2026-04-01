import { computed } from "vue";
import { useAuthStore } from "@/stores/auth";

export function usePermission() {
  const authStore = useAuthStore();

  const permissions = computed(() => authStore.permissions);
  const roles = computed(() => authStore.roles);

  // Check if user has specific permission
  function hasPermission(permission: string): boolean {
    // Super admin has all permissions
    if (permissions.value.includes("*")) {
      return true;
    }
    return permissions.value.includes(permission);
  }

  // Check if user has any of the permissions
  function hasAnyPermission(permissionList: string[]): boolean {
    if (permissions.value.includes("*")) {
      return true;
    }
    return permissionList.some((p) => permissions.value.includes(p));
  }

  // Check if user has all permissions
  function hasAllPermissions(permissionList: string[]): boolean {
    if (permissions.value.includes("*")) {
      return true;
    }
    return permissionList.every((p) => permissions.value.includes(p));
  }

  // Check if user has specific role
  function hasRole(role: string): boolean {
    return roles.value.includes(role);
  }

  // Check if user has any of the roles
  function hasAnyRole(roleList: string[]): boolean {
    return roleList.some((r) => roles.value.includes(r));
  }

  // Check if user is admin
  const isAdmin = computed(() => {
    return roles.value.includes("admin") || permissions.value.includes("*");
  });

  return {
    permissions,
    roles,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    hasRole,
    hasAnyRole,
    isAdmin,
  };
}
