// Local Storage utility
export const storage = {
  get<T>(key: string, defaultValue?: T): T | null {
    try {
      const value = localStorage.getItem(key);
      if (value === null) return defaultValue ?? null;
      return JSON.parse(value);
    } catch {
      return defaultValue ?? null;
    }
  },

  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Storage set error:", error);
    }
  },

  remove(key: string): void {
    localStorage.removeItem(key);
  },

  clear(): void {
    localStorage.clear();
  },
};

// Session Storage utility
export const sessionStorage = {
  get<T>(key: string, defaultValue?: T): T | null {
    try {
      const value = window.sessionStorage.getItem(key);
      if (value === null) return defaultValue ?? null;
      return JSON.parse(value);
    } catch {
      return defaultValue ?? null;
    }
  },

  set<T>(key: string, value: T): void {
    try {
      window.sessionStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("SessionStorage set error:", error);
    }
  },

  remove(key: string): void {
    window.sessionStorage.removeItem(key);
  },

  clear(): void {
    window.sessionStorage.clear();
  },
};

// Token storage keys
export const TOKEN_KEY = "access_token";
export const REFRESH_TOKEN_KEY = "refresh_token";
export const USER_INFO_KEY = "user_info";

// Token helpers
export const tokenStorage = {
  getAccessToken: () => storage.get<string>(TOKEN_KEY),
  setAccessToken: (token: string) => storage.set(TOKEN_KEY, token),
  removeAccessToken: () => storage.remove(TOKEN_KEY),

  getRefreshToken: () => storage.get<string>(REFRESH_TOKEN_KEY),
  setRefreshToken: (token: string) => storage.set(REFRESH_TOKEN_KEY, token),
  removeRefreshToken: () => storage.remove(REFRESH_TOKEN_KEY),

  clearAll: () => {
    storage.remove(TOKEN_KEY);
    storage.remove(REFRESH_TOKEN_KEY);
    storage.remove(USER_INFO_KEY);
  },
};
