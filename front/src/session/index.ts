export const setSession = (key: string, value: string) => {
  if (typeof window !== "undefined" && value) {
    localStorage.setItem(key, value);
  }
};

export const getSession = (key: string) => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(key);
  }
  return null;
};

export const removeSession = (key: string) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
};

export const clearSession = () => {
  if (typeof window !== "undefined") {
    localStorage.clear();
  }
};
